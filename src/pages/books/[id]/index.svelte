<script>
    import {authStore} from "../../../auth.js"
    import {onDestroy} from "svelte";
    import { fade } from 'svelte/transition';
    import Card from "../../../components/Card.svelte";
    import { books } from "../../../auctStore"

    const {user} = authStore;
    export let scoped;
    export let book = scoped.book.book;
    export let bids = book.bids

    let error = {amount: ''};
    let isValid = false;
    let amountAdded = '';
    let name;

    console.log("book value ", book)
    //Subscribe to user writable
    const unsubscribeToken = user.subscribe(value => {
        if (value)
        {
            //get username from token payload
            name = (JSON.parse(atob(value.split('.')[1]))).username
        }
    })

    //Unsubscribe
    onDestroy(() => {
        unsubscribeToken()
    })

    async function formSubmitted() {
        isValid = true;
        //validate amount field
        if (amountAdded.length <= 0) {
            isValid = false;
            error.amount = 'The amount shouldn\'t be empty!';
        } else {
            error.amount = '';
        }

        if (isValid) {
            console.log('Creating post request...', amountAdded)

            const body = {
                username: name,
                amount: amountAdded
            }

            const response = await fetch(`http://localhost:3000/books/${book.id}/bids`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$user}`
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())

                .catch(err => alert(err))


            if (response)
            {
                // put response server
                bids = response
                // clear input
                const input = document.querySelector('input');
                input.value= ''
            }
            else
            {
                alert(response)
            }
        }
    }
</script>

<div id="detail-column">
    <h1 class="auction_title">{book.title}</h1>
    <p class="auction_description">Book author: {book.author}</p>
    <p class="auction_description">Published in {book.year}, {book.country}</p>
    <p class="auction_description">The book has {book.pages} pages</p>
    <hr>
    {#if $user}
        <form on:submit|preventDefault = {formSubmitted}>
            <input bind:value={amountAdded} class="auction_bid_amount" type="number" placeholder="Amount">
            <div class="error">{ error.amount }</div>
            <button type="submit">Add</button>
        </form>
    {/if}
    <div id="bids-container" class="auction_detail_bid_list">
        <h2>Bids</h2>
        <ul>
            {#each bids as {id,amount,username, time}}
                <li class="auction_detail_bid" id={id}>
                    <span class="auction_detail_bid_price">{amount}</span>
                    <span class="auction_detail_bid_user">{username}</span>
                    <span class="auction_detail_bid_time">{time}</span>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .error
    {
        color: red;
    }
    .auction_detail_bid_list,
    .auction_detail_bid_list ul {
        width: 100%;
        margin: 0;
    }

    .auction_detail_bid_list h2 {
        padding: 0 1rem;
        font-size: 24px;
    }

    .auction_detail_bid_list {
        display: flex;
        flex-flow: wrap;
        height: auto;
        overflow: auto;
        bottom: 0;
        margin: 0;
    }

    .auction_detail_bid_list .auction_detail_bid {
        display: flex;
        width: 100%;
        height: 2rem;
    }

    .auction_detail_bid_price,
    .auction_detail_bid_user,
    .auction_detail_bid_time {
        flex: 0 0 30%;
        line-height: 2rem;
    }
</style>