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

  export let sortOrder: 'FIRST_PUBLISHED' | 'UPDATED' | 'LAST_PUBLISHED' | 'CREATED' | 'CURATED' =
    'FIRST_PUBLISHED'
  export let verified: boolean | undefined = undefined
  export let maxCards: number | undefined = undefined // max amount of cards to show
  export let playlistId: string | undefined = undefined

  let maps: Beatmap[] = []

  let previewKey: string | null = null

  const setPreviewKey = (key: string | null) => (previewKey = key)

  onMount(async () => {
    await getMaps()
  })

  let baseUrl = import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com'
  let url: string
  if (playlistId != null) {
    url = `${baseUrl}/playlists/id/${playlistId}/0`
  } else {
    url = `${baseUrl}/maps/latest?sort=${sortOrder}${
      verified !== undefined ? `&verified=${verified}` : ''
    }&pageSize=${maxCards ?? 8}`
  }

  async function getMaps() {
    let response = await fetch(url)
    if (playlistId != null) {
      maps = await response.json().then((json) => json.maps.map((x) => x.map) as Beatmap[])
    } else {
      maps = await response.json().then((json) => json['docs'] as Beatmap[])
    }
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

<div class="cards max-cols-3">
  {#if previewKey != null}
    <MapPreviewModal bind:key={previewKey} />
  {/if}

  {#if maps.length !== 0}
    {#each maps as map}
      <div class="card-wrapper">
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
              <div class="map-preview">
                <MapPreview mapId={map.id} {setPreviewKey} />
              </div>
            </div>
            <div class="last-row-container">
              <Difficulties diffs={map.versions[0].diffs} />
              <div class="download-button-container">
                <ZipDownloadButton downloadURL={map.versions[0].downloadURL} />
                <OneClickDownloadButton mapId={map.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    {#each Array(maxCards ?? 8) as _}
      <div class="card-wrapper loading" />
    {/each}
  {/if}
</div>

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

    .download-button-container {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      opacity: 0;
      transition: opacity $transition-long;
    }

    .map-preview {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      opacity: 0;
      transition: opacity $transition-long;
      margin-left: auto;
    }

    &:hover {
      background-position-x: 100%;

      > .card {
        background-position-x: 100%;
      }

      .download-button-container {
        opacity: 100%;
      }

      .map-preview {
        opacity: 100%;
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
    }
  }
</style>
