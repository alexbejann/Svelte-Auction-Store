<script>
    import Select from 'svelte-select';
    import {onMount} from "svelte";
    import { redirect, url, params } from '@sveltech/routify'
    import { books } from "../auctStore";
    const API_URL = 'http://localhost:3000/books';
    const items = [];

    let selectedValue;
    onMount( async () => {
        $books = await fetch(API_URL, {
            method: "GET"
        })
            .then(response => response.json())

            .catch(err => alert(err));

        //books is not null/undefined
        if ($books)
        {
            for (let i = 0; i < $books.length; i++)
            {
                let book = $books[i];
                //fill up dropdown
                items.push({value: ''+book.id, label: '' + book.title});
            }
        }
        else
        {
            // something went wrong with server
            alert($books)
        }
    })

    const clickedItem = (selectedValue) => {
        // redirect user to this link
        $redirect(`../books/${selectedValue.value}`)
    }

    $: if (selectedValue) clickedItem(selectedValue)

</script>

<Select items={items} bind:selectedValue placeholder="Search..."/>


