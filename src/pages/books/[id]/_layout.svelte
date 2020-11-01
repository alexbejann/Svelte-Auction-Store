<script>
    import {url, isActive} from "@sveltech/routify";
    import {params} from "@sveltech/routify";
    import {authStore} from "../../../auth.js"
    import Card from "../../../components/Card.svelte";



    const {user} = authStore;

    $: id = $params.id;

    let book;

    async function fetchBook(id) {
        book = await fetch(`http://localhost:3000/books/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$user}`
            },
        })
            .then(response => response.json())

            .catch(err => alert(err))
    }

    $: if (id) fetchBook(id);
</script>

{#if book}
    <Card>
        <slot scoped={{ book }}>Loading...</slot>
    </Card>
{/if}
