<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/Navbar.svelte'
</script>

<Navbar />
<main>
  <h1>COMING SOON</h1>
  <h3 style="text-align: center; margin-top: 2rem;">We'll be back with our new site very soon. Follow the announcements the <a href="https://discord.gg/VJZHUbt">Beast Saber Discord server</a> to stay up to date.</h3>
  <!--REVERT: Put this back in and remove the content INSIDE the main tags above-->
  <!-- <slot /> -->
</main>

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 12px;
    width: 100%;
    margin-top: 75px;
    box-sizing: border-box;
  }
</style>
