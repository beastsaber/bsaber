<script lang="ts">
  import type { Playlist } from '../types'
  import { onMount } from 'svelte'
  import Uploader from '$lib/Uploader.svelte'
  import OneClickDownloadButton from './OneClickDownloadButton.svelte'

  export let maxCards: number | undefined = undefined // max amount of cards to show

  let playlists: Playlist[] = []

  onMount(async () => {
    await getPlaylists()
  })

  async function getPlaylists() {
    let response = await fetch(
      `${
        import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com'
      }/playlists/latest?sort=CURATED&pageSize=${maxCards ?? 4}`,
    )
    playlists = await response.json().then((json) => json['docs'] as Playlist[])
  }
</script>

<div class="cards max-cols-4" style="--aspect-ratio: 1">
  {#if playlists.length !== 0}
    {#each playlists as playlist}
      <a
        class="card"
        href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/playlists/${
          playlist.playlistId
        }`}
        style={`background-image: url(${playlist.playlistImage512})`}
      >
        <div class="one-click-download-button-container">
          <OneClickDownloadButton
            playlistUrl="https://api.beatsaver.com/playlists/id/{playlist.playlistId}/download"
          />
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
    {#each Array(maxCards ?? 4) as _}
      <div class="card loading" />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import '../scss/post-cards';
  a .one-click-download-button-container {
    transition: opacity $transition-long ease-in-out;
    opacity: 0;

    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 1;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    padding: 0.3rem;
    border-radius: 50%;
    overflow: visible;
  }

  @media (min-width: 678px) {
    a:hover .one-click-download-button-container {
      opacity: 1;
    }
  }
</style>
