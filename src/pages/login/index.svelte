<script>
    import { authStore } from '../../auth'
    const { signin } = authStore

    let errors = { username:'', password:'' };
    let valid = false;
    let usernameField = '';
    let passwordField = '';

    function handleLogin()
    {
        valid = true;
        //validate username
        if (usernameField.length <= 0)
        {
            valid = false;
            errors.username = 'This field can\'t be empty!';
        }
        else
        {
            errors.username = '';
        }
        //validate password
        if (passwordField.length <= 0)
        {
            valid = false;
            errors.password = 'This field can\'t be empty!';
        }
        else
        {
            errors.password = '';
        }
        //if valid true sign in
        if (valid)
        {
            signin(usernameField, passwordField);
        }
    }
</script>

<div class="center-all">
    <div class="card">
        <h1 class="auction_title">Login</h1>
        <form on:submit|preventDefault = {handleLogin}>
            <input bind:value={usernameField} type="text" placeholder="Username*"/>
            <div class="error">{errors.username}</div>
            <input  bind:value={passwordField} type="password" placeholder="Password*"/>
            <div class="error">{errors.password}</div>
            <button class="button">Login</button>
        </form>
        <span>All fields with * are mandatory</span>
        <br>
        <a href="/register" >No Account? Sign up!</a>
    </div>
</div>

<style>
    .error
    {
        color: red;
    }
</style>