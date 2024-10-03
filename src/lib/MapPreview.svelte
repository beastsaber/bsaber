<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faPlay } from '@fortawesome/free-solid-svg-icons'

  export let mapId: string

  export let setPreviewKey: ((key: string | null) => void) | undefined = undefined
</script>

<a
  title="Preview Map"
  href="https://allpoland.github.io/ArcViewer/?id={mapId}"
  class="preview-map"
  on:click={(e) => {
    e.preventDefault()

    // @ts-ignore
    setPreviewKey?.call(this, mapId)
  }}
>
  <Fa icon={faPlay} />
</a>

<style lang="scss">
  @import 'src/scss/variables';

  .preview-map {
    display: none;
    color: $color-text-secondary;
    transition: color $transition-short;
    margin-right: 2px;
    transition: 0.6s ease;

    &:hover {
      color: $color-text-primary;
      transform: scale(1.2);
      transition: 0.3s ease;
    }
  }

  @media (min-width: 678px) {
    .preview-map {
      display: block;
    }
  }
</style>
