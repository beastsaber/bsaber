<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/Navbar.svelte'
</script>

<Navbar />
<main>
  <slot />
</main>

<style lang="scss">
  @import 'src/scss/variables';

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    width: 100%;
    margin-top: $navbar-height;
    box-sizing: border-box;
  }
</style>
