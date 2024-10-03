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

  onMount(() => {
    return () => {
      clearTimeout(tooltipTimeout)
    }
  })
</script>

<button on:click={copyBSR} title="Copy BSR" class="copy-bsr" style="font-size: {fontSize}">
  <Fa icon={faTwitch} />
</button>

{#if showTooltip}
  <div class="tooltip" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>!bsr Copied</div>
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

  .tooltip {
    position: absolute;
    background-color: $color-background-tertiary;
    color: $color-text-primary;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    opacity: 1;
    top: 0;
    left: 92%;
    transform: translateX(-50%);
    margin-top: 32px;
    text-align: center;
    text-wrap: nowrap;
  }
</style>
