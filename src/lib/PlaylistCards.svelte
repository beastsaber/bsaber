<script lang="ts">
    import type {Playlist} from "../types"
    import {onMount} from "svelte";

    export let maxCards: number | undefined = undefined // max amount of cards to show

    let playlists: Playlist[] = []

    onMount(async () => {
        await getPlaylists()
    })

    async function getPlaylists() {
        let response = await fetch(
            `${import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com'}/playlists/latest?sort=CURATED&pageSize=${maxCards ?? 4}`,
        )
        playlists = await response.json().then(json =>
            json["docs"] as Playlist[]
        )
        console.log(playlists)
    }
</script>

<div class="cards max-cols-4" style="--aspect-ratio: 1">
    {#if playlists.length !== 0}
        {#each playlists as playlist}
            <a class="card"
               href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/playlists/${playlist.playlistId}`}
               style={`background-image: url(${playlist.playlistImage512})`}>
                <div class="title max-cols-4">
                    {playlist.name ?? ''}
                </div>
            </a>
        {/each}
    {:else}
        {#each Array(maxCards ?? 4) as _}
            <div class="card loading"/>
        {/each}
    {/if}
</div>

<style lang="scss">
  @import "../scss/post-cards";
</style>
