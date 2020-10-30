import { writable } from 'svelte/store'

export const authStore = createAuthStore()

function createAuthStore()
{
    const user = writable(null)
    let token;

    //Login method
    async function signin(username, password)
    {
        const body = {
            username: username,
            password: password
        }

       const json =  await fetch(`http://localhost:3000/auth` , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())

            .catch(err => alert(err));

        if (!json.message)
        {
            token = json.token;
            user.set(json.token)
        }
        else
        {
            alert(json.message)
        }
    }

    // log out method
    async function signout()
    {
        console.log("Logging out...")
        // logout
        const svrResponse = await fetch(`http://localhost:3000/auth` , {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        })
            .then(response => response.json())

            .catch(err => alert(err));

        // update store
        if (svrResponse)
        {
            user.set(null)
            console.log("Logged out!")
        }
    }

    return { user, signin, signout }
}