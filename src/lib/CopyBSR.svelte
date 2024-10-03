<script lang="ts">
  import Fa from 'svelte-fa'
  import { faTwitch } from '@fortawesome/free-brands-svg-icons'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  export let fontSize: string = '1rem'
  export let mapId: string

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
  function hideTooltip() {
    showTooltip = false
    clearTimeout(tooltipTimeout)
  }

  onMount(() => {
    clearTimeout(tooltipTimeout)
  })
</script>

<div class="position-ancestor">
  <button
    on:click={copyBSR}
    on:mouseout={hideTooltip}
    on:blur={hideTooltip}
    title="Copy BSR"
    class="copy-bsr"
    style="font-size: {fontSize};"
  >
    <Fa icon={faTwitch} />
  </button>

  {#if showTooltip}
    <div class="tooltip" out:fade={{ duration: 300 }}>!bsr Copied</div>
  {/if}
</div>

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
    top: -2.2rem;
    background-color: $color-background-tertiary;
    color: $color-text-primary;
    transform: translateX(-40%); // Not sure why, but -50% looks and is off-center
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    text-align: center;
    white-space: nowrap;
  }

  .position-ancestor {
    position: relative;
  }
</style>
