<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
  import Fa from 'svelte-fa/src/fa.svelte'

  export let text: string
  export let color: string
  export let href: string
  export let icon: IconDefinition | undefined = undefined
  export let iconPath: string | undefined = undefined // path to the icon, if not using fa icon
</script>

<a class="quick-filter" style="background-color: {color}" {href}>
  <div class="content">
    <div class="icon">
      {#if iconPath}
        <img class="image-icon" alt="" src={iconPath} />
      {:else}
        <Fa {icon} />
      {/if}
    </div>
    <h4>{text}</h4>
  </div>
</a>

<style lang="scss">
  @import 'src/scss/variables';

  .quick-filter {
    height: 40px;
    color: $color-primary-text;
    border-radius: 10px;
    overflow: hidden;
    text-transform: uppercase;
    font-family: $font-poppins;
    font-size: 1rem;

    .content {
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
    }

    .image-icon {
      height: 1rem;
    }
  }

  @media (min-width: 1200px) {
    .quick-filter {
      font-size: 1.25rem;

      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }

      .image-icon {
        height: 1.25rem;
      }
    }
  }
</style>
