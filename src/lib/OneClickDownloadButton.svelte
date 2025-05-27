<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

  interface Props {
    mapId?: string | undefined
    playlistUrl?: string | undefined
    fontSize?: string
    class?: string
  }

  let {
    mapId = undefined,
    playlistUrl = undefined,
    fontSize = '1rem',
    class: classes,
  }: Props = $props()

  if (mapId && playlistUrl) {
    console.error('Only one of mapId or playlistUrl can be provided. mapId takes priority.')
  }

  if (!mapId && !playlistUrl) {
    console.error('One of mapId or playlistUrl must be provided')
  }
</script>

{#if mapId}
  <a
    title="OneClick&trade; Install via BeatSaver"
    href="beatsaver://{mapId}"
    class="{classes} one-click-download-link"
    style="font-size: {fontSize}"
  >
    <Fa icon={faCloudDownloadAlt} />
  </a>
{:else if playlistUrl}
  <a
    title="OneClick&trade; Install via BeatSaver"
    href="bsplaylist://playlist/{playlistUrl}"
    class="one-click-download-link"
    style="font-size: {fontSize}"
  >
    <Fa icon={faCloudDownloadAlt} />
  </a>
{/if}

<style lang="scss">
  @import 'src/scss/variables';

  ///
  .one-click-download-link {
    display: block;
    color: $color-text-secondary;
    transition: color $transition-short;
    transition: 0.6s ease;

    &:hover {
      color: $color-text-primary;
      transform: scale(1.2);
      transition: 0.3s ease;
    }
  }

  @media (hover: hover) {
    .one-click-download-link {
      color: $color-text-secondary;
      transition: color $transition-short;
      transition: 0.6s ease;
    }
  }
</style>
