<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'

  export let downloadURL: string
  
</script>

<a
  title="Zip Download via BeatSaver"
  href={downloadURL}
  class="zip-download-link"><Fa icon={faDownload} /></a
>

<style lang="scss">
  @import 'src/scss/variables';

  // Initially hiding it and only showing it at a certain screen size
  // Smaller screen size will usually be smartphones
  // They can't download maps directly from the site, so we hide it
  .zip-download-link {
    font-size: 1.2rem;
    display: none;
    color: #c5c5c5;

    &:hover {
      color: white;
    }
  }

  @media (min-width: 678px) {
    .zip-download-link {
      display: block;
    }
  }
</style>
