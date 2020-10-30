<script>
    import {onMount} from "svelte";
    import { books } from "../../auctStore";
    import Select from 'svelte-select';
    import Card from "../../components/Card.svelte";
    const API_URL = 'http://localhost:3000/books';

    let items = [];

    let selectedValue;

    //split into groups
    const groupBy = (item) => item.group;

    // fetch books when page "mounts"
    onMount(async () => {
        $books = await fetch(API_URL, {
            method: "GET"
        })
            .then(response => response.json())

            .catch(err => alert(err));

        for (let i = 0; i < $books.length; i++)
        {
            let book = $books[i];
            //fill up dropdown
            if (!items.find(item => item.value === book.author))
            {
                items.push({value: book.author, label: ''+book.author, group: 'author'});
            }
            if (!items.find(item => item.value === book.year))
            {
                items.push({value: book.year, label: ''+book.year, group: 'year'});
            }
            if (!items.find(item => item.value === book.country))
            {
                items.push({value: book.country, label: ''+book.country, group: 'country'});
            }
        }
    });


    async function filtersBooks(selected)
    {
        //do filter request
        console.log(selected.value,selected.group,selected)
        $books = await fetch(`http://localhost:3000/books/?${selected.group}=${selected.value}` , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())

            .catch(err => alert(err));
    }

    async function resetBooks()
    {
        //fetch again for books
        $books = await fetch(API_URL, {
            method: "GET"
        })
            .then(response => response.json())

            .catch(err => alert(err));
    }

    //reactive 'refresh' if selectedValue != undefined,
    // do filter request else get all books
    $: {
        if(selectedValue)
        {
            filtersBooks(selectedValue)
        }
        else
        {
            resetBooks()
        }
    }
</script>

<h1>Filters</h1>
<Select items={items} isSearchable={true} bind:selectedValue {groupBy}/>

{#each $books as book}
    <Card>
        <a class="title" href="../books/{book.id}">{book.title}</a>
        <p class="auction_description">Author: {book.author}</p>
        <p class="auction_description">Year: {book.year}</p>
        <p class="auction_description">Country: {book.country}</p>
        <div class="auction_bid">
            <span class="auction_bid_price">{book.price}</span>
            <span class="auction_bid_time">{book.time}</span>
        </div>
    </Card>
{/each}
