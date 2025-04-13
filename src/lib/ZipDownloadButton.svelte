<script lang="ts">
  import Fa from 'svelte-fa'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'

  interface Props {
    downloadURL: string
    fontSize?: string
  }

  const { downloadURL, fontSize = '1rem' }: Props = $props()
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

  .zip-download-link {
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

</style>
