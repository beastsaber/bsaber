<script lang="ts">
  import type { FeaturedPlaylistOverwriteCollectionData, Playlist } from '../types'
  import { onMount } from 'svelte'
  import Uploader from '$lib/Uploader.svelte'
  import OneClickDownloadButton from './OneClickDownloadButton.svelte'
  import ZipDownloadButton from './ZipDownloadButton.svelte'
  import { beatSaverClientFactory } from './beatsaver-client'

  interface Props {
    maxCards?: number | undefined // max amount of cards to show
    overwriteMap?: Record<string, FeaturedPlaylistOverwriteCollectionData>
    playlists?: Playlist[]
  }

  let { maxCards = undefined, overwriteMap = {}, playlists = $bindable([]) }: Props = $props()

  onMount(async () => {
    await getPlaylists()
  })

  const beatSaverClient = beatSaverClientFactory.create()

  async function getPlaylists() {
    if (playlists.length > 0) return
    let response = await beatSaverClient.fetch(
      `/playlists/latest?sort=CURATED&pageSize=${maxCards ?? 4}`,
    )
    playlists = await response.json().then((json) => json['docs'] as Playlist[])
  }
</script>

<div class="cards max-cols-4" style="--aspect-ratio: 1">
  {#if playlists.length !== 0}
    {#each playlists as playlist (playlist.playlistId)}
      <!-- Default to beatsaver playlist page - if url overwrite is given apply that -->
      <a
        class="card"
        class:overridden={overwriteMap[playlist.playlistId] != null}
        href={overwriteMap[playlist.playlistId] == null ||
        overwriteMap[playlist.playlistId].linkOverwrite == null
          ? `${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/playlists/${playlist.playlistId}`
          : overwriteMap[playlist.playlistId].linkOverwrite}
        style={`background-image: url(${(() => {
          const img = overwriteMap[playlist.playlistId]?.imageOverwrite
          return img
            ? img.substring(img.indexOf('/static/') + 7)
            : (playlist.playlistImage512 ?? playlist.playlistImage)
        })()})`}
      >
        <div></div> <!-- This div is here to workaround a breaking SSR bug -->
        <!-- <div class="mobile-hidden"> -->
        <div>
          <div class="zip-download-button-container">
            <ZipDownloadButton
              downloadURL="{import.meta.env.VITE_BSABER_API_BASE ??
                'https://api.beatsaver.com'}/playlists/id/{playlist.playlistId}/download"
            />
          </div>
          <div class="one-click-download-button-container">
            <OneClickDownloadButton
              playlistUrl="{import.meta.env.VITE_BSABER_API_BASE ??
                'https://api.beatsaver.com'}/playlists/id/{playlist.playlistId}/download"
            />
          </div>
        </div>
        <div class="content max-cols-4">
          <Uploader uploader={playlist.owner} />
          <div class="last-row-container">
            <h3 class="title">{playlist.name ?? ''}</h3>
          </div>
        </div>
      </a>
    {/each}
  {:else}
    {#each { length: maxCards ?? 4 }}
      <div class="card loading"></div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @import '../scss/post-cards';
  a .one-click-download-button-container,
  a .zip-download-button-container {
    position: absolute;
    top: 0.3rem;
    z-index: 1;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    border-radius: 50%;
    overflow: visible;
  }

  a .one-click-download-button-container {
    display: none;
  }

  a .zip-download-button-container {
    right: 0.3rem;
    padding: .3em .45em;
  }

  @media (hover: hover) {

    a .one-click-download-button-container {
      display: inherit;
      right: 0.3rem;
      padding: 0.3rem;
    }

    a .zip-download-button-container {
      right: 2.5rem;
      padding: 0.3em 0.45em;
    }
    a .one-click-download-button-container,
    a .zip-download-button-container {
      transition: opacity $transition-long ease-in-out;
      opacity: 0;
    }
    a:hover .one-click-download-button-container {
      opacity: 1;
    }

    a:hover .zip-download-button-container {
      opacity: 1;
    }
  }

  .overridden {
    animation: colorTransition 5s linear infinite alternate;
  }

  @keyframes colorTransition {
    0%,
    100% {
      box-shadow: 0 0 7px 3px rgba(255, 215, 0, 0.4);
    }
    50% {
      box-shadow: 0 0 7px 3px rgba(255, 217, 0, 0.635);
    }
  }
</style>
