<script lang="ts">
  import CuratorCard from '$lib/CuratorCard.svelte'

  export let data
  let curators = data.curators
</script>

<svelte:head>
  <title>Curation Team - BeastSaber</title>
</svelte:head>

<section>
  {#each curators as curator}
    <CuratorCard
      name={curator.name}
      slug={curator.slug}
      role={curator.role}
      tags={curator.style_tags}
      fav_map={curator.favorite_map}
      bio={curator.bio}
      image={curator.image}
    />
  {/each}
</section>

<style lang="scss">
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
</style>
