<script>
  import {authStore} from "../../auth.js"
  import { userBids } from '../../auctStore'
  import {onMount} from "svelte";
  import Bid from "../../components/Bid.svelte";

  const {user} = authStore;

  const API_URL = 'http://localhost:3000/books/bids';

  // fetch books when page "mounts"
  onMount(async () => {
    $userBids = await fetch(API_URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${$user}`
      },
    })
        .then(response => response.json())

        .catch(err => alert(err));

    console.log($userBids);
  });

</script>

<h1>My Bids</h1>
<table>
    <tbody>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Time</th>
      <th>Remove</th>
    </tr>
    {#each $userBids as bid}
      <Bid {...bid} />
    {/each}
    </tbody>
  </table>
