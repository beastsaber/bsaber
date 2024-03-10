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
    padding: 20px 12px 2.3rem 12px;
    width: 100%;
    margin-top: 75px;
    box-sizing: border-box;
  }
</style>
