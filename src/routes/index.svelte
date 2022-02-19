<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import Cards from '$lib/Cards.svelte'
</script>

<svelte:head>
  <title>BeastSaber</title>
</svelte:head>

<section>
  <Cards />
</section>

<style>
  section {
    max-width: 1332px;
  }
</style>
