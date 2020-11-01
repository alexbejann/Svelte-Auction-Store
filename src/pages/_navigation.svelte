<script>
  import { authStore } from '../auth'
  import SearchBar from '../components/SearchBar.svelte'
  import { scale } from 'svelte/transition'
  import { isActive, params } from "@sveltech/routify";
  import { redirect } from '@sveltech/routify'
  import {onDestroy} from "svelte";
  // navigation links
  const links = [
    ['/index', 'home'],
    ['/books', 'Books'],
    ['/bids', 'Bids'],
    ['/admin', 'Admin'],
    ['/users', 'Users'],
  ]

  const { user, signout } = authStore

  let role;

  const unsubscribeAuth = user.subscribe(value => {
    if (value)
    {
      //get role from token payload
      role = (JSON.parse(atob(value.split('.')[1]))).roles[0]
    }
  })

  onDestroy( ()=> {
    unsubscribeAuth()
  })

  // logout function
  function logout()
  {
    signout();
    $redirect('/')
  }
</script>

<nav class="header">

  <a href="/index" class:active={$isActive("/index")} >Home</a>

  <a href="/books" class:active={$isActive("/books")} >Books</a>

  {#if $user  }
    <a href="/bids" class:active={$isActive("/bids")} >My Bids</a>
      {#if role === 'admin'}
        <a href="/admin" class:active={$isActive("/admin")} >Admin</a>
        <a href="/users" class:active={$isActive("/users")} >Users</a>
      {/if}
  {/if}

  {#if $user }
    <a href="#signout" on:click={logout} >logout</a>
  {:else}
    <a href="/login" class:active={$isActive("/login")} >login</a>
  {/if}

  {#if !$params.id }
    <div class="search-container">
      <SearchBar/>
    </div>
  {/if}
</nav>

<style>
  nav a
  {
    margin: 0 25px;
  }
  .search-container
  {
    float: right;
    margin-right: 16px;
    font-size: 17px;
    border: none;
    cursor: pointer;
  }
</style>