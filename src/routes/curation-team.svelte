<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  let curators = []

  getTeam()

  async function getTeam() {
    curators = await Promise.all(
      Object.entries(import.meta.glob('/src/collections/curation-team/*.md')).map(
        async ([path, module]) => {
          const { metadata } = await module()
          return { ...metadata }
        },
      ),
    )
  }
</script>

<svelte:head>
  <title>Curation Team – BeastSaber</title>
</svelte:head>

<section>
  {#each curators as curator}
    {curator.name}
  {/each}
</section>

<style>
  section {
    max-width: 1356px;
  }
</style>
