<script lang="ts">
  import type { Beatmap } from '../types'
  import { onMount } from 'svelte'
  import Uploader from '$lib/Uploader.svelte'
  import Tags from '$lib/Tags.svelte'
  import Difficulties from '$lib/Difficulties.svelte'
  import OneClickDownloadButton from './OneClickDownloadButton.svelte'
  import ZipDownloadButton from './ZipDownloadButton.svelte'
  import MapPreview from './MapPreview.svelte'
  import MapPreviewModal from '$lib/MapPreviewModal.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
  import { audioPlayer } from '$lib/audio-player'
  import { beatSaverClientFactory } from './beatsaver-client'
  import CopyBsr from './CopyBSR.svelte'
  import { slide } from 'svelte/transition'

  export let sortOrder: 'Latest' | 'Relevance' | 'Rating' | 'Curated' | 'Random' =
    'Latest'
  export let verified: boolean | undefined = undefined
  export let playlistId: number | undefined = undefined
  export let forceColumnCount: number | undefined = undefined
  export let loadMoreEnabled: boolean = false // New prop to control "Load More" button
  export let fixedCount: number = 50 // Default fixed number of cards to show. Should account for any playlist pages

  let maps: Beatmap[] = []
  let visibleCount = loadMoreEnabled ? 8 : fixedCount // Use fixed count if loadMoreEnabled is false
  let previewKey: string | null = null

  const setPreviewKey = (key: string | null) => (previewKey = key)

  onMount(async () => {
    await getMaps()
  })

  const beatSaverClient = beatSaverClientFactory.create()

  let path: string
  if (playlistId != null) {
    path = `/playlists/id/${playlistId}/0`
  } else {
    path = `/search/text/0?sortOrder=${sortOrder}${
      verified !== undefined ? `&verified=${verified}` : ''
    }&pageSize=100` // Maxes out at 100
  }

  async function getMaps() {
    let response = await beatSaverClient.fetch(path)
    if (playlistId != null) {
      maps = await response.json().then((json) => json.maps.map((x) => x.map) as Beatmap[])
    } else {
      maps = await response.json().then((json) => json['docs'] as Beatmap[])
    }
  }

  function loadMore() {
    visibleCount += 8 // Load 8 more cards when clicking "Load More"
  }

  // Having it in a class is a bit trickier to handle. So we're pulling it out there.
  const playingId = audioPlayer.playingId

  const togglePlayingAudio = (mapId: string, previewUrl: string) => {
    if ($playingId === mapId) {
      audioPlayer.pause()
    } else {
      audioPlayer.play(previewUrl, mapId)
    }
  }
</script>

<div
  class="cards max-cols-3"
  style={forceColumnCount != null
    ? `grid-template-columns: repeat(${forceColumnCount}, 1fr) !important;`
    : ''}
>
  {#if previewKey != null}
    <MapPreviewModal bind:key={previewKey} />
  {/if}

  {#if maps.length !== 0}
    {#each maps.slice(0, visibleCount) as map (map.id)}
      <div class="card-wrapper" transition:slide={{ duration: 300 }}>
        <div class="card">
          <div class="image-container">
            <img
              src={`${import.meta.env.VITE_BEATSAVER_CDN_BASE || 'https://cdn.beatsaver.com'}/${
                map.versions[0].hash
              }.jpg`}
              alt={map.name}
            />
            <div
              class="button-overlay"
              class:force-show={$playingId === map.id}
              on:click={() => togglePlayingAudio(map.id, map.versions[0].previewURL)}
            >
              {#if $playingId === map.id}
                <Fa icon={faPause} />
              {:else}
                <Fa icon={faPlay} />
              {/if}
            </div>
          </div>
          <div class="content">
            <div>
              <a
                href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/maps/${
                  map.id
                }`}
                class="title"
                title={map.name}
              >
                {map.name}
              </a>
              <Uploader uploader={map.uploader} curator={map.curator} />
            </div>
            <div class="tag-row-container">
              <Tags tags={map.tags} />
              <div class="interactive-buttons">
                <CopyBsr mapId={map.id} />
                <MapPreview mapId={map.id} {setPreviewKey} />
              </div>
            </div>
            <div class="last-row-container">
              <Difficulties diffs={map.versions[0].diffs} />
              <div class="interactive-buttons">
                <ZipDownloadButton downloadURL={map.versions[0].downloadURL} />
                <OneClickDownloadButton mapId={map.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    {#each Array(8) as _}
      <div class="card-wrapper loading" />
    {/each}
  {/if}
</div>

<!-- Conditionally show "Load More" button if loadMoreEnabled is true -->
{#if loadMoreEnabled && visibleCount < maps.length}
  <div class="load-more-container">
    <button on:click|preventDefault={loadMore} class="load-more">Show More</button>
  </div>
{/if}

<style lang="scss">
  @import 'src/scss/variables';

  $image-size: 8rem;

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;
    width: 100%;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  $gradient-coverage: 60%;
  // Don't touch these two
  $background-size: 100% + $gradient-coverage;
  $gradient-start: percentage(100% / $background-size);

  .load-more-container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .load-more {
    background-color: $color-background-secondary;
    border: none;
    color: $color-danger-red;
    padding: 10px 40px;
    border-radius: $rounding-large;
    transition: background-color $transition-long;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .card-wrapper {
    background: linear-gradient(
      90deg,
      $color-background-primary $gradient-start,
      $color-background-tertiary 100%
    );
    background-size: $background-size;
    padding: 2px;
    border-radius: $rounding-large + 2px;
    transition: background-position $transition-long;
    overflow: hidden;

    .interactive-buttons {
      display: grid;
      grid-template-columns: repeat(2, 20px);
      gap: 1rem;
      justify-items: center;
      transition: opacity $transition-long;
      margin-left: auto;
      opacity: 0;
    }

    &:hover {
      background-position-x: 100%;

      > .card {
        background-position-x: 100%;
      }

      .interactive-buttons {
        opacity: 1;
      }
    }

    &.loading {
      background-image: none;
      background-color: $color-background-secondary;
      height: calc($image-size + 4px);
      border-radius: $rounding-large;
    }
  }

  .card {
    position: relative;
    display: flex;
    overflow: hidden;
    background: linear-gradient(
      90deg,
      $color-background-primary $gradient-start,
      $color-background-secondary 100%
    );
    background-size: $background-size;
    border-radius: $rounding-large;
    transition: background-position $transition-long;

    .image-container {
      position: relative;
      height: $image-size;
      flex: $image-size 0 0;

      img {
        height: 128px;
        width: 128px;
        border-radius: $rounding-large;
      }

      .button-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2rem;
        border-radius: $rounding-large;

        opacity: 0;
        transition: opacity 0.3s;
        @media (hover: hover) {
          &:hover {
            opacity: 1;
          }
        }

        &.force-show {
          opacity: 1;
        }
      }
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      padding: 0.375rem 0.75rem;

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

      .last-row-container,
      .tag-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }
  }
</style>
