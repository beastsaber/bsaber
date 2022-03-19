<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/Navbar.svelte';
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
    width: 100%;
    max-width: 1364px;
    margin: 60px auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
