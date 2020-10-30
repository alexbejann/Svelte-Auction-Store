# Assignment 3 Svelte

- **Daniel-Alexandru Bejan**
- **Cosmin George Mucalau**

### Get started

This project has been created with `npx @sveltech/routify init`. In order to start frontend run the dev configuration do `npm run dev`, this will start the svelte application listening on `http://localhost:5000`.

**Note:** 
You must use the backend from assignment 2.

## Admin user credentials
- username: __alex__
- password: __pass123__

## User without login

- Can sign up
- Filter books on main page based on Authors, Years and Country.
- Can also view the book detail page 

## Normal User

- Login logout
- View books on main page
    - __Add__ bid to book on detail page
- See his own bids in bids.html
    - __Delete__ bid 

## Admin user 

- Can see all users in Users section (username, email and role)
- Can manage all auctions in Administration section 
    - admin can **modify**, **delete** current auctions/books
    - can **add** a new auction/book

### Components

- AddBook.svelte
    - It's the form in our Modal.svelte. 
    - This component handles adding a book 
    - We've created this component because the Modal.svelte was getting to big so we wanted to split up the work. Component is rendered inside the Modal using a `<slot/>`. 
- Auction.svelte
    - Is the component from the auctions table. Has a unique behavior to switch from edit to read mode.
- Bid.svelte
    - Is the component from the bids page. This component can be deleted by user pressing the delete icon.
- Card.svelte 
    - Is only the card 'view' display
- Modal.svelte
    - Has been created only because we wanted to put add book form into a separate component
- User.svelte 
    - Is the component from Users section table.
 
## Complex components

- In books-> [id]-> _layout we are using a scoped slot to display the detail page. Inside index.svelte we are processing further the book from the scope.       
    ```
    {#if book}
        <Card>
            <BaseTransition {configs}>
                <slot scoped={{ book }}>Loading...</slot>
            </BaseTransition>
        </Card>
    {/if}
    ```
- We are using a svelte magic transition inside the [id] -> index.svelte, when we select another navigation item. 
    ```
    <div id="detail-column" transition:fade>
    .
    .
    .
    .
    </div>
    ```
- auth.js is the `$user` a writable store. When `signin(username, password)` is called we do a post request to our backend to get a jwt token which is set in user store. The `signout()` method is doing a post request to backend and if successful we set the store to null.
  ```
    async function signin(username, password)
        {
            ...
    
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
           ...
        }
    //log out
    async function signout()
        {
            ...
  
            const svrResponse = await fetch(`http://localhost:3000/auth` , {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
    
                },
            })
                .then(response => response.json())
    
                .catch(err => alert(err));
    
            ...
        }
  ```

### Libraries used

- ## [Routify](https://routify.dev/)
    - Because svelte doesn't have a built in routing component we've decided to use Routify to solve this problem. 
    - Routify creates automatically svelte routes by our file [structure](https://routify.dev/guide/starter-Template).
    - Therefore, this is our project folder structure:
        - src
            - components
            - pages
                - admin
                - bids
                - books
                    - [id]
                - login
                - register
                - users
    - Each folder (e.g admin, bids etc.) contain a _layout.svelte and index.svelte. In _layout.svelte the $user store it's called to check if user allowed to 'see' that section/component.
- ## [Svelte-select](https://www.npmjs.com/package/svelte-select)   
    - This is a select/autocomplete component for Svelte apps. With support for grouping, filtering, async and more.
    - We are using this component to filter our books base on the chosen filter(e.g. year, author and country).
    - This component it's being used in books/index.svelte
     
   