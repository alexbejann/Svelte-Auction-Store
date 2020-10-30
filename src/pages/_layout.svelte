<script>
  import {metatags, page} from "@sveltech/routify";
  import Navigation from "./_navigation.svelte";

  $: metatags.title = `Book Store - ${$page.title}`;
  metatags.description = "This is my Book Store...";
</script>

<!--Basic template -->
<div class="container">
  <Navigation/>
  <slot/>
</div>