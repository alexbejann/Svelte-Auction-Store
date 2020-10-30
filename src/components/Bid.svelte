<script>
    import {authStore } from "../auth.js"
    import { books,userBids } from "../auctStore";
    const { user } = authStore;
    export let bookID;
    export let bidID;
    export let title;
    export let price;
    export let time;

    async function removeItem() {

       console.log("Removing", bookID, bidID)

        //do delete request
       const response = await fetch(`http://localhost:3000/books/${bookID}/bids?id=${bidID}` , {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$user}`
            },
        })
        .then(response => response.json())

        .catch(err => alert(err));

        if (!response.Error)
        {
            // update user bids by fetching again
            $userBids = await fetch('http://localhost:3000/books/bids', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$user}`
                },
            })
                .then(response => response.json())

                .catch(err => alert(err));

            console.log($userBids)
        }
        else
        {
            alert(response.Error)
        }
    }
</script>

<tr>
    <td>{title}</td>
    <td>{price}</td>
    <td>{time}</td>
    <td>
        <i on:click|preventDefault ={removeItem} class="fa fa-trash"></i>
    </td>
</tr>