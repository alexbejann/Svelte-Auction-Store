<script>
    import Card from "../../components/Card.svelte";
    import {authStore} from "../../auth";
    const {user} = authStore;
</script>
{#if $user}
    <Card>
        <h1>Administration</h1>
        <slot />
    </Card>
{/if}