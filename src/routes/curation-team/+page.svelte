<script lang="ts">
  import { onMount } from 'svelte'
  import type { Uploader } from '../../types.js'
  import CuratorCard from '$lib/CuratorCard.svelte'

  let curators: Uploader[] = []

  onMount(async () => {
    curators = await fetch(`https://api.beatsaver.com/users/curators`).then((res) => res.json())
  })
</script>

<svelte:head>
  <title>Curation Team - BeastSaber</title>
</svelte:head>

<div class="cards">
  {#each curators as curator (curator.id)}
    <CuratorCard
      name={curator.name}
      id={curator.id}
      roles={{ ...curator }}
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
