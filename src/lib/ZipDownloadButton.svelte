<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'

  export let downloadURL: string
  export let fontSize: string = '1rem'
</script>

<a
  title="Zip Download via BeatSaver"
  href={downloadURL}
  class="zip-download-link"
  style="font-size: {fontSize}"
>
  <Fa icon={faDownload} />
</a>

<style lang="scss">
  @import 'src/scss/variables';

  // Initially hiding it and only showing it at a certain screen size
  // Smaller screen size will usually be smartphones
  .zip-download-link {
    display: none;
    color: $color-text-secondary;
    transition: color $transition-short;
    transition: 0.6s ease;

    &:hover {
      color: $color-text-primary;
      transform: scale(1.2);
      transition: 0.3s ease;
    }
  }

  @media (min-width: 678px) {
    .zip-download-link {
      display: block;
    }
  }
</style>
