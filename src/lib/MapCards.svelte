<script lang="ts">
    import type {Beatmap} from "../types"
    import {onMount} from "svelte";
    import Uploader from "$lib/Uploader.svelte";
    import Tags from "$lib/Tags.svelte";
    import Difficulties from "$lib/Difficulties.svelte";

    export let maxCards: number | undefined = undefined // max amount of cards to show

    let maps: Beatmap[] = []

    onMount(async () => {
        await getMaps()
    })

    async function getMaps() {
        let response = await fetch(
            `${import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com'}/maps/latest?sort=CURATED&pageSize=${maxCards ?? 6}`,
        )
        maps = await response.json().then(json =>
            json["docs"] as Beatmap[]
        )
    }
</script>

<div class="cards max-cols-3">
    {#if maps.length !== 0}
        {#each maps as map}
            <div class="card">
                <img src="{`${import.meta.env.VITE_BEATSAVER_CDN_BASE || 'https://cdn.beatsaver.com'}/${map.versions[0].hash}.jpg`}" alt="{map.name}"/>
                <div class="content">
                    <div>
                        <a href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/maps/${map.id}`}
                           class="title"
                           title="{map.name}">
                            {map.name}
                        </a>
                        <Uploader uploader="{map.uploader}" curator="{map.curator}"/>
                    </div>
                    <Tags tags="{map.tags}"/>
                    <Difficulties diffs="{map.versions[0].diffs}"/>
                </div>
            </div>
        {/each}
    {:else}
        {#each Array(maxCards ?? 6) as _}
            <div class="card loading"/>
        {/each}
    {/if}
</div>


<style lang="scss">
  @import 'src/scss/variables';

  $image-size: 7.5rem;

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card {
    position: relative;
    display: flex;
    overflow: hidden;

    &.loading {
      background-color: $background-secondary;
      height: $image-size;
      border-radius: $card-border-radius;
    }

    img {
      border-radius: $card-border-radius;
      margin-right: 0.75rem;
      height: $image-size;
      flex: $image-size 0 0;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      .title {
        display: block;
        font-weight: bold;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.25rem;
      }
    }
  }
</style>
