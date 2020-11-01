<script>
  import {onMount} from "svelte";
  import Modal from "../../components/Modal.svelte";
  import Auction from "../../components/Auction.svelte";
  import AddBook from "../../components/AddBook.svelte";
  import { books } from "../../auctStore";

  //popup behaviour
  let showModal = false;
  let toggleModal = () => {
    showModal = !showModal;
  };

  const API_URL = 'http://localhost:3000/books';

  // fetch books when page "mounts"
  onMount(async () => {

    $books = await fetch(API_URL, {
      method: "GET",
    })
      .then(response => response.json())

      .catch(err => alert(err));
  });
</script>

<Modal {showModal} on:click={toggleModal}>
  <AddBook/>
</Modal>
<div class="add-button fa fa-plus" on:click = {toggleModal}>Add Book</div>

<table>
  <tbody>
  <tr>
    <th>Name</th>
    <th>Author</th>
    <th>Year</th>
    <th>Price</th>
    <th>End time</th>
    <th>Actions</th>
  </tr>
  </tbody>
  {#each $books as auction}
      <Auction {...auction} />
  {/each}
</table>

<style>
  .add-button
  {
    cursor: pointer;
  }
</style>