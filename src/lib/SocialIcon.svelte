<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { iconMapping } from './iconMapping'

  export let social: keyof typeof iconMapping = 'Website'
  export let id: string | undefined = undefined
  export let link: string | undefined = undefined
  let titleOverwrite: string | undefined = undefined
  export let noLink = false
  let finalLink = link

  $: {
    if (!noLink && !link && id) {
      switch (social) {
        case 'Discord':
          finalLink = `https://discord.com/users/${id}`
          break
        case 'Twitter/X':
          finalLink = `https://twitter.com/${id}`
          break
        case 'Facebook':
          finalLink = `https://facebook.com/${id}`
          break
        case 'Instagram':
          finalLink = `https://instagram.com/${id}`
          break
        case 'Twitch':
          finalLink = `https://twitch.tv/${id}`
          break
        case 'BeatSaver':
          finalLink = `https://beatsaver.com/profile/${id}`
          break
        case 'YouTube':
        case 'Reddit':
        case 'GitHub':
        case 'Website':
        case 'Documentation':
          finalLink = id
      }
    }
  }
</script>

{#if noLink}
  <span class="social-icon">
    <Fa icon={iconMapping[social]} />
  </span>
{:else}
  <a class="social-icon" href={finalLink} title={titleOverwrite ?? social}>
    <Fa icon={iconMapping[social]} />
  </a>
{/if}

<style lang="scss">
  @import 'src/scss/variables';
  .social-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-text-primary;
    border-radius: $rounding-small;
    width: 2em;
    aspect-ratio: 1;

    transition: background-color $transition-short;

    &:hover {
      background-color: mix($color-background-secondary, $color-background-tertiary, 50%);
    }
  }
</style>
