<script lang="ts">
  import Fa from 'svelte-fa'
  import { faTwitch } from '@fortawesome/free-brands-svg-icons'

  export let fontSize: string = '1rem'
  export let mapId: string

  function copyBSR() {
    const textToCopy = `!bsr ${mapId}`
    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error('Failed to copy BSR:', err)
    })
  }
</script>

<button on:click={copyBSR} title="Copy BSR" class="copy-bsr" style="font-size: {fontSize}">
  <Fa icon={faTwitch} />
</button>

<style lang="scss">
  @import 'src/scss/variables';

  .copy-bsr {
    display: none;
    background: none;
    border: none;
    color: $color-text-secondary;
    transition: color $transition-short, transform 0.3s ease;
    padding: 0;
    font: inherit;
    margin-right: 4.3px; // I'm sure it's just an optical illusion but it looks off without this margin
    margin-top: 3px; // Same here

    &:hover {
      color: $color-text-primary;
      transform: scale(1.2);
      cursor: pointer;
    }
  }

  @media (min-width: 678px) {
    .copy-bsr {
      display: inline-block;
    }
  }
</style>
