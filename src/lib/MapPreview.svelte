<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faPlay } from '@fortawesome/free-solid-svg-icons'

  export let mapId: string
</script>

<a title="Preview Map" href="https://allpoland.github.io/ArcViewer/?id={mapId}" class="preview-map">
  <Fa icon={faPlay} />
</a>

<style lang="scss">
  @import 'src/scss/variables';

  .preview-map {
    display: none;
    color: $color-text-secondary;
    transition: color $transition-short;
    margin-right: 3px;

    &:hover {
      color: $color-text-primary;
    }
  }

  @media (min-width: 678px) {
    .preview-map {
      display: block;
    }
  }
</style>
