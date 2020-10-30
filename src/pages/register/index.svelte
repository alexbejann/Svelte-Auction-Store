<script>
    let usernameField = '';
    let emailField = '';
    let passwordField = '';
    let rePasswordField = '';
    //Minimum 6 characters, one lowercase, one uppercase and one digit
    const passwordRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6,}/;
    // anything@anything.(com || nl)
    const emailRegEx= /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(com|nl)/;

    let errors = { username:'', email:'', password:'', repPassword:'' };
    let valid = false;

    async function register()
    {
        valid = true;

        //validate username
        if (usernameField.trim().length <= 1)
        {
            valid = false;
            errors.username = 'Username field is mandatory!';
        }
        else
        {
            errors.username = '';
        }

        //validate email
        if (emailField.length <= 0)
        {
            valid = false;
            errors.email = 'Email field is mandatory!'
        }
        else if (emailRegEx.test(emailField))
        {
            valid = false;
            errors.email = 'Email field should follow this pattern: anything1@anything.com/nl, first word can have some special characters'
        }
        else
        {
            errors.email = '';
        }

        //validate password
        if (!passwordRegEx.test(passwordField))
        {
            valid = false;
            errors.password = 'Password must contain 6 characters, one lowercase, one uppercase and one digit!';
        }
        else
        {
            errors.password = '';
        }

        //rePass validate
        if (passwordField !== rePasswordField)
        {
            valid = false;
            errors.repPassword = 'Password fields must match!';
        }
        else if ( rePasswordField.trim().length < 0 )
        {
            valid = false;
            errors.repPassword = 'Re-enter password field shouldn\'t be empty!';
        }
        else
        {
            errors.repPassword = '';
        }

        //if everything is ok prepare fetch statement
        if (valid)
        {
            //create body
            const body = { username: usernameField,
                email: emailField,
                password: passwordField }

            await fetch('/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
                .then(response => console.log(response))

                .catch(err => alert(err));
        }
    }
</script>

<h1>Register</h1>
<form on:submit|preventDefault = {register}>
    <input bind:value={usernameField} type="text" placeholder="Username*"/>
    <div class="error">{errors.username}</div>
    <input bind:value={emailField} type="email" placeholder="Email*"/>
    <div class="error">{errors.email}</div>
    <input bind:value={passwordField} type="password" placeholder="Password*"/>
    <div class="error">{errors.password}</div>
    <input bind:value={rePasswordField} type="password" placeholder="Password repeat*"/>
    <div class="error">{errors.repPassword}</div>
    <button class="button">Register</button>
    <span>All fields with * are mandatory</span>
</form>

<style>
    .error
    {
        color: red;
    }
</style>