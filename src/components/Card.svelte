<script>
  import {scale} from 'svelte/transition'
</script>
<div class="card" in:scale|local>
  <slot />
</div>
