<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

  export let mapId: string | undefined = undefined
  export let playlistUrl: string | undefined = undefined

  if (mapId && playlistUrl) {
    console.error('Only one of mapId or playlistUrl can be provided. mapId takes priority.')
  }

  if (!mapId && !playlistUrl) {
    console.error('One of mapId or playlistUrl must be provided')
  }
</script>

{#if mapId}
  <a
    title="OneClick Download via BeatSaver and ModAssistant"
    href="beatsaver://{mapId}"
    class="one-click-download-link"><Fa icon={faCloudDownloadAlt} /></a
  >
{:else if playlistUrl}
  <a
    title="OneClick Download via BeatSaver and ModAssistant"
    href="bsplaylist://playlist/{playlistUrl}"
    class="one-click-download-link"><Fa icon={faCloudDownloadAlt} /></a
  >
{/if}

<style lang="scss">
  @import 'src/scss/variables';

  // Initially hiding it and only showing it at a certain screen size
  // Smaller screen size will usually be smartphones
  // They can't download maps directly from the site, so we hide it
  .one-click-download-link {
    font-size: 1.2rem;
    display: none;
    color: #c5c5c5;

    &:hover {
      color: white;
    }
  }

  @media (min-width: 678px) {
    .one-click-download-link {
      display: block;
    }
  }
</style>
