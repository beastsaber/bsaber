<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/Navbar.svelte'
</script>

<Navbar />
<main>
  <slot />
</main>

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    padding-top: 68px;
    width: 100%;
    max-width: 1364px;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
