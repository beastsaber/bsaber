<script lang="ts">
  import CuratorCard from '$lib/CuratorCard.svelte'

  export let data
  let curators = data.curators
</script>

<svelte:head>
  <title>Curation Team - BeastSaber</title>
</svelte:head>

<div class="cards">
  {#each curators as curator}
    <CuratorCard
      name={curator.name}
      id={curator.id}
      roles={ {...curator} }
      description={curator.description}
      avatar={curator.avatar}
    />
  {/each}
</div>

<style lang="scss">
  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
