<script lang="ts">
  import type { Beatmap } from '../types'
  import { onMount } from 'svelte'
  import Uploader from '$lib/Uploader.svelte'
  import Tags from '$lib/Tags.svelte'
  import Difficulties from '$lib/Difficulties.svelte'
  import OneClickDownloadButton from './OneClickDownloadButton.svelte'
  import ZipDownloadButton from './ZipDownloadButton.svelte'

  export let sortOrder: 'FIRST_PUBLISHED' | 'UPDATED' | 'LAST_PUBLISHED' | 'CREATED' | 'CURATED' =
    'FIRST_PUBLISHED'
  export let verified: boolean | undefined = undefined
  export let maxCards: number | undefined = undefined // max amount of cards to show

  let maps: Beatmap[] = []

  onMount(async () => {
    await getMaps()
  })

  let baseUrl = import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com'
  let url = `${baseUrl}/maps/latest?sort=${sortOrder}${
    verified !== undefined ? `&verified=${verified}` : ''
  }&pageSize=${maxCards ?? 8}`

  async function getMaps() {
    let response = await fetch(url)
    maps = await response.json().then((json) => json['docs'] as Beatmap[])
  }
</script>

<div class="cards max-cols-3">
  {#if maps.length !== 0}
    {#each maps as map}
      <div class="card-wrapper">
        <div class="card">
          <a
            href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/maps/${map.id}`}
            class="image-link"
          >
            <img
              src={`${import.meta.env.VITE_BEATSAVER_CDN_BASE || 'https://cdn.beatsaver.com'}/${
                map.versions[0].hash
              }.jpg`}
              alt={map.name}
            />
          </a>
          <div class="content">
            <div>
              <a
                href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/maps/${map.id}`}
                class="title"
                title={map.name}
              >
                {map.name}
              </a>
              <Uploader uploader={map.uploader} curator={map.curator} />
            </div>
            <div class="tag-row-container">
              <Tags tags={map.tags}></Tags>
              <div class="zip-download-button-container">
                <ZipDownloadButton downloadURL={map.versions[0].downloadURL}/>
              </div>
            </div>
            <div class="last-row-container">
              <Difficulties diffs={map.versions[0].diffs}/>
              <OneClickDownloadButton mapId={map.id + ''} />
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    {#each Array(maxCards ?? 8) as _}
      <div class="card loading" />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  $image-size: 8.5rem;

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;
    width: 100%;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card-wrapper {
    background: linear-gradient(90deg, $color-background-primary 50%, $color-background-tertiary 100%);
    background-size: 200%;
    padding: 2px;
    border-radius: $rounding-large + 2px;
    transition: background-position $transition-long;
    overflow: hidden;

    &:hover {
      background-position-x: 100%;
    }
  }

  .card {
    position: relative;
    display: flex;
    overflow: hidden;
    background: linear-gradient(90deg, $color-background-primary 50%, $color-background-secondary 100%);
    background-size: 200%;
    border-radius: $rounding-large;
    transition: background-position $transition-long;

    &:hover {
      background-position-x: 100%;
    }

    &.loading {
      background-image: none;
      background-color: $color-background-secondary;
      height: $image-size;
      border-radius: $rounding-large;
    }

    .image-link {
      height: $image-size;
      flex: $image-size 0 0;
      margin-right: 0.75rem;

      img {
        border-radius: $rounding-large;
        height: 100%;
      }
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      padding: 0.25rem 0.75rem 0.25rem 0;

      .title {
        display: block;
        max-width: fit-content;
        font-weight: bold;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.25rem;
      }

      .last-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .tag-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .zip-download-button-container {
        margin-left: auto;
      }
    }
  }
</style>
