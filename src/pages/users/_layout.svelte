<script>
    import Card from "../../components/Card.svelte";
    import {authStore} from "../../auth";
    const {user} = authStore;
</script>

{#if $user}
    <Card>
        <h1>Users</h1>
        <slot />
    </Card>
{/if}