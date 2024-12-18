<script lang="ts">
  import { onMount } from 'svelte'
  import type { Uploader } from '../../types.js'
  import CuratorCard from '$lib/CuratorCard.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
  import { beatSaverClientFactory } from '$lib/beatsaver-client.js'

  let curators: Uploader[] = []

  onMount(async () => {
    const beatSaverClient = beatSaverClientFactory.create()
    curators = await beatSaverClient.fetch(`/users/curators`).then((res) => res.json())
  })
</script>

<MetaHead title="Curation Team" />

<h1 style="text-align: center;">The Curation Team</h1>

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
    word-wrap: break-word;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
