<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import CuratorCard from '$lib/CuratorCard.svelte'

  let curators = []

  getTeam()

  async function getTeam() {
    curators = await Promise.all(
      Object.entries(import.meta.glob('/src/collections/curation-team/*.md')).map(
        async ([path, module]) => {
          const { metadata } = await module()
          return { ...metadata }
        }
      )
    )
  }
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
    max-width: 1356px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
  }
</style>
