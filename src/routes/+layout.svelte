<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/Navbar.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
</script>

<MetaHead
  title="BeastSaber"
  description="The hub of the Beat Saber community: your guide to top-tier map recommendations and essential insights. Uncover a rich selection of curated maps and learn more about Beat Saber and its community through our articles to enhance your gaming experience."
  imageUrl="/beastsaber-logo-fullsize-square.jpg"
/>

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
