<script>
    import { authStore } from '../../auth'
    import { redirect } from '@sveltech/routify'
    import { scale } from 'svelte/transition'
    const { user } = authStore

    /**
     *  We don't want the login page to be visible to logged in user, so we redirect them
     **/
    $: if ($user) $redirect('/')
</script>
<div>
    <slot/>
</div>
