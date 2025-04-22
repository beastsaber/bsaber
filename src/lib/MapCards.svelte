<script lang="ts">
  import type { Beatmap } from '../types'
  import { onMount, onDestroy } from 'svelte'
  import Uploader from '$lib/Uploader.svelte'
  import Tags from '$lib/Tags.svelte'
  import Difficulties from '$lib/Difficulties.svelte'
  import OneClickDownloadButton from './OneClickDownloadButton.svelte'
  import ZipDownloadButton from './ZipDownloadButton.svelte'
  import MapPreview from './MapPreview.svelte'
  import MapPreviewModal from '$lib/MapPreviewModal.svelte'
  import Fa from 'svelte-fa'
  import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
  import { audioPlayer } from '$lib/audio-player'
  import { beatSaverClientFactory } from './beatsaver-client'
  import CopyBsr from './CopyBSR.svelte'
  import { slide } from 'svelte/transition'
  import { filterNsfw, nsfwToggleVisibility } from '$lib/storeNsfwPreference'

  interface Props {
    sortOrder?: 'Latest' | 'Relevance' | 'Rating' | 'Curated' | 'Random'
    verified?: boolean
    playlistId?: number
    forceColumnCount?: number
    loadMoreEnabled?: boolean
    fixedCount?: number
    showToggle?: boolean
  }

  let {
    sortOrder = 'Latest',
    verified,
    playlistId,
    forceColumnCount,
    loadMoreEnabled = false, // New prop to control "Load More" button
    fixedCount = 50, // Default fixed number of cards to show. Should account for any playlist pages
    showToggle = true, // Allow excplictly hiding the NSFW toggle with default being true
  }: Props = $props()

  let maps: Promise<Beatmap[]> | undefined = $state()
  let visibleCount = $state(loadMoreEnabled ? 8 : fixedCount) // Use fixed count if loadMoreEnabled is false
  let mapsLength: number = $state(0)
  let previewKey: string | null = $state(null)

  const setPreviewKey = (key: string | null) => (previewKey = key)

  onMount(async () => {
    if (showToggle) {
      nsfwToggleVisibility.set(true)
    }

    mapsLength = 0
    let responsePromise = beatSaverClient.fetch(path)
    if (playlistId != null) {
      maps = responsePromise
        .then((res: Response) => res.json())
        .then((json: { maps: { map: Beatmap }[] }) => json.maps.map((x) => x.map))
    } else {
      maps = responsePromise
        .then((res: Response) => res.json())
        .then((json: { docs: Beatmap[] }) => json.docs)
    }

    mapsLength = (await maps).length
  })

  onDestroy(() => {
    if (showToggle) {
      nsfwToggleVisibility.set(false)
    }
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

  function loadMore(e: Event) {
    e.preventDefault()
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

{#snippet loadingSkeleton()}
  {#each { length: 8 }}
    <div class="card-wrapper loading"></div>
  {/each}
{/snippet}

<div
  class="cards max-cols-3"
  style={forceColumnCount != null
    ? `grid-template-columns: repeat(${forceColumnCount}, 1fr) !important;`
    : ''}
>
  {#if previewKey != null}
    <MapPreviewModal bind:key={previewKey} />
  {/if}

  {#await maps}
    {@render loadingSkeleton()}
  {:then bmaps}
    {#if bmaps != undefined && bmaps.length !== 0}
      {#each bmaps.slice(0, visibleCount) as map (map.id)}
        <div class="card-wrapper" transition:slide={{ duration: 300 }}>
          <div class="card">
            <div class="image-container">
              <img
                src={`${import.meta.env.VITE_BEATSAVER_CDN_BASE || 'https://cdn.beatsaver.com'}/${
                  map.versions[0].hash
                }.jpg`}
                alt={map.name}
                class:blur={$filterNsfw && map.nsfw}
              />
              <button
                class="button-overlay"
                class:force-show={$playingId === map.id}
                type="button"
                aria-pressed={$playingId === map.id}
                aria-label={$playingId === map.id ? 'Play' : 'Stop'}
                onclick={() => togglePlayingAudio(map.id, map.versions[0].previewURL)}
              >
                {#if $playingId === map.id}
                  <Fa icon={faPause} />
                {:else}
                  <Fa icon={faPlay} />
                {/if}
              </button>
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
                  <MapPreview mapId={map.id} {setPreviewKey} class="mobile-hidden" />
                  <CopyBsr mapId={map.id} />
                </div>
              </div>
              <div class="last-row-container">
                <Difficulties diffs={map.versions[0].diffs} />
                <div class="interactive-buttons">
                  <OneClickDownloadButton mapId={map.id} class="mobile-hidden" />
                  <ZipDownloadButton downloadURL={map.versions[0].downloadURL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {:else if bmaps != undefined}
      <div class="card-wrapper">
        <p>Oh, quite empty here</p>
      </div>
    {:else}
      {@render loadingSkeleton()}
    {/if}
  {:catch err}
    <div class="card-wrapper">
      <p>Oh no, an error occured: {err}</p>
    </div>
  {/await}
</div>

<!-- Conditionally show "Load More" button if loadMoreEnabled is true -->
{#if loadMoreEnabled && visibleCount < mapsLength}
  <div class="load-more-container">
    <button onclick={loadMore} class="load-more">Show More</button>
  </div>
{/if}

<style lang="scss">
  @use 'sass:math';
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
  $gradient-start: percentage(math.div(100%, $background-size));

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
      $color-background-secondary 100%
    );

    &:hover {
      background: linear-gradient(
        90deg,
        $color-background-primary $gradient-start,
        $color-background-tertiary 100%
      );
    }
    @media (hover: hover) {
      background: linear-gradient(
        90deg,
        $color-background-primary $gradient-start,
        $color-background-tertiary 100%
      );
      background-size: $background-size;
    }
    padding: 2px;
    border-radius: $rounding-large + 2px;
    transition: background-position $transition-long;
    overflow: hidden;

    .interactive-buttons {
      display: none;
    }

    @media screen and (min-width: 560px) {
      .interactive-buttons {
        display: grid;
        grid-template-columns: repeat(2, 20px);
        gap: 1rem;
        justify-items: center;
        direction: rtl;
        transition: opacity $transition-long;
        margin-left: auto;
        opacity: 0;
      }
    }

    @media (hover: none) {
      .interactive-buttons {
        opacity: 1;
      }
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
      overflow: hidden;
      border-radius: $rounding-large;
      height: $image-size;
      flex: $image-size 0 0;

      .blur {
        filter: blur(5px);
      }

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
