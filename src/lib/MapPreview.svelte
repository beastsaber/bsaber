<script lang="ts">
  import Fa from 'svelte-fa'
  import { faPlay } from '@fortawesome/free-solid-svg-icons'

  interface Prop {
    mapId: string
    class?: string
    setPreviewKey: ((key: string | null) => void) | undefined
  }

  let { mapId, class: classes, setPreviewKey = undefined }: Prop = $props()
</script>

<a
  title="Preview Map"
  href="https://allpoland.github.io/ArcViewer/?id={mapId}"
  class="{classes} preview-map"
  onclick={(e) => {
    e.preventDefault()

    setPreviewKey?.(mapId)
  }}
>
  <Fa icon={faPlay} />
</a>

<style lang="scss">
  @import 'src/scss/variables';

  .preview-map {
    display: block;
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
</style>
