<script>
    import { authStore } from "../auth.js"
    import { books } from "../auctStore";
    import { fade } from 'svelte/transition';
    const { user } = authStore;
    export let id;
    export let title;
    export let author;
    export let year;
    export let price;
    export let time;
    let saveToggle;

    async function saveChanges()
    {
        console.log("Saving changes...",id, title)

        const val = [];

        const bookValues = [title, author, year, price, time]
        console.log(bookValues)
        const container = document.getElementById(id);

        //fill val array with changed values
        for (let index  = 0; index < 5 ; index++)
        {
            let currentChild = container.children[index];
            if (!(currentChild.firstChild.value === bookValues[index]))
            {
                //console.log(`the ${currentChild.id} have been changed: `+currentChild.firstChild.value, bookValues[index]);
                val.push({
                    fieldChanged: currentChild.className,
                    newValue: "" + currentChild.firstChild.value,
                })
            }
        }
        // create body
        const bodyVal = {changes: val};

        //do put request
        const response = await fetch(`http://localhost:3000/books/${id}` , {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$user}`
            },
            body: JSON.stringify(bodyVal)
        })
            .then(response => response.json())

            .catch(err => alert(err));

        saveToggle = !saveToggle;

        if (!response.Error)
        {
            $books = await fetch('http://localhost:3000/books', {
                method: "GET",
            })
                .then(response => response.json())

                .catch(err => alert(err));
            console.log($books);
        }
        else
        {
            alert(response.Error)
        }
    }

    async function removeItem() {

        console.log("Removing",id, title)

        //do request
        const response = await fetch(`http://localhost:3000/books/${id}` , {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$user}`
            },
        })
            .then(response => response.json())

            .catch(err => alert(err));

        //if response has Error message notify user
        if (!response.Error)
        {
            $books = await fetch('http://localhost:3000/books', {
                method: "GET",
            })
                .then(response => response.json())

                .catch(err => alert(err));
            console.log($books);
        }
        else
        {
            alert(response.Error)
        }
    }
</script>


<tr id="{id}" transition:fade>
    {#if saveToggle}
        <td class="title"><input type = 'text' value ={title}/></td>
        <td class="author"><input type = 'text' value ={author}/></td>
        <td class="year"><input type = 'text' value ={year}/></td>
        <td class="price"><input type = 'text' value ={price}/></td>
        <td class="time"><input type = 'text' value ={time}/></td>
    {:else}
        <td class="title">{title}</td>
        <td class="author">{author}</td>
        <td class="year">{year}</td>
        <td class="price">{price}</td>
        <td class="time">{time}</td>
    {/if}
    <td id="buttons">
        <i on:click|preventDefault ={()=>{ saveToggle = !saveToggle }} class="fa fa-pencil"></i>
        {#if saveToggle}
            <i on:click|preventDefault ={saveChanges} class="fa fa-save"></i>
        {:else }
            <i on:click|preventDefault ={removeItem} class="fa fa-trash"></i>
        {/if}
    </td>
</tr>