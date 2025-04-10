<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/Navbar.svelte'
  import Footer from '$lib/Footer.svelte'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<Navbar />
<main>
  {@render children?.()}
</main>
<Footer />

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
