<script lang="ts">
  import Fa from 'svelte-fa'
  import { faTwitch } from '@fortawesome/free-brands-svg-icons'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  export let fontSize: string = '1rem'
  export let mapId: string

  // Adding props to allow these to be customizable for the MOTW Section
  export let tooltipTop: string = '32px'
  export let tooltipLeft: string = '92%'
  export let tooltipTransform: string = 'translateX(-50%)'

  // Margins because it looks off on the MapCards without it
  export let marginRight: string = '4.3px'
  export let marginTop: string = '3px'

  let showTooltip = false
  let tooltipTimeout: NodeJS.Timeout

  function copyBSR() {
    const textToCopy = `!bsr ${mapId}`
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showTooltip = true
        clearTimeout(tooltipTimeout)
        tooltipTimeout = setTimeout(() => {
          showTooltip = false
        }, 3000)
      })
      .catch((err) => {
        console.error('Failed to copy BSR:', err)
      })
  }

  onMount(() => {
    return () => {
      clearTimeout(tooltipTimeout)
    }
  })
</script>

<button
  on:click={copyBSR}
  title="Copy BSR"
  class="copy-bsr"
  style="font-size: {fontSize}; margin-right: {marginRight}; margin-top: {marginTop}"
>
  <Fa icon={faTwitch} />
</button>

{#if showTooltip}
  <div
    class="tooltip"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 300 }}
    style="top: {tooltipTop}; left: {tooltipLeft}; transform: {tooltipTransform}"
  >
    !bsr Copied
  </div>
{/if}

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

  .tooltip {
    position: absolute;
    background-color: $color-background-tertiary;
    color: $color-text-primary;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    opacity: 1;
    text-align: center;
    white-space: nowrap;
  }
</style>
