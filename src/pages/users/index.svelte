<script>
  import { authStore } from "../../auth.js"
  import { onMount} from "svelte";
  import User from "../../components/User.svelte";
  const { user } = authStore;

  let users = [];

  const API_URL = 'http://localhost:3000/users';

  // fetch books when page "mounts"
  onMount(async () => {

    users = await fetch(API_URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${$user}`
      },
    })
      .then(response => response.json())

      .catch(err => alert(err));

  });
</script>

<table>
  <tbody><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
  </tr>
  </tbody>
  {#each users as user}
    <User {...user} />
  {/each}
</table>