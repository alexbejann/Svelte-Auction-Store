<script>
    import {authStore} from "../auth.js";
    import { books } from "../auctStore"
    const {user} = authStore;

    let name = '';
    let author = '';
    let year = '';
    let price = '';
    let time = '';
    let country = '';
    let error = '';
    let valid = false;

    const handleSubmit = async () => {
        valid = true;

        // validate all fields
        if (name.length <= 0 && author.length <= 0 &&  year.length <= 0
            && price.length <= 0 && time.length <= 0 && country.length <= 0 )
        {
            valid = false;
            error = 'All fields are mandatory!';
        }
        else
        {
            error = '';
        }

        //valid === true do request
        if (valid)
        {
            //create body for request
            const body = {
                name: name,
                author: author,
                year: year,
                price: price,
                time: time,
                country: country
            }

            const response = await fetch('http://localhost:3000/books', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$user}`
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())

                .catch(err => alert(err));

            //response has an error message
            if (!response.Error)
            {
                $books = await fetch('http://localhost:3000/books', {
                    method: "GET",
                })
                    .then(response => response.json())

                    .catch(err => alert(err));
                console.log($books);

                // reset form
                const form = document.getElementById('addBook')
                form.reset();
            }
            else
            {
                error = ''+response.Error;
            }
        }
    };
</script>

<form on:submit|preventDefault = {handleSubmit} id="addBook">
    <input type="text" placeholder='Name*' bind:value={name}>
    <input type="text" placeholder='Author*' bind:value={author}>
    <input type="number" placeholder='Year*' bind:value={year}>
    <input type="number" placeholder='Price*' bind:value={price}>
    <input type="time" placeholder='Time*' bind:value={time}>
    <input type="text" placeholder='Country*' bind:value={country}>
    <button>Add Book</button>
    <span>All fields with * are mandatory</span>
    <br>
    <span class="error">{error}</span>
</form>

<style>
    .error
    {
        color: red;
    }
</style>