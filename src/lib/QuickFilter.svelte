<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
  import Fa from 'svelte-fa/src/fa.svelte'

  export let text: string
  export let type: string
  export let href: string
  export let icon: IconDefinition | undefined = undefined
  export let iconPath: string | undefined = undefined // path to the icon, if not using fa icon
</script>

<a class="quick-filter {type}" {href}>
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
    border-radius: $rounding-small;
    color: $color-text-primary;
    overflow: hidden;
    text-transform: uppercase;
    font-family: $font-poppins;
    font-size: 1rem;
    transition: background-color 0.15s;

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

  $colors: (
    newest: darken($color-danger-red, 5%),
    ranked: darken($color-warning-yellow, 5%),
    curated: darken($color-success-green, 5%),
    verified: darken($color-info-blue, 5%),
    playlists: $color-bsaber-purple
  );

  @each $name, $color in $colors {
    .#{$name} {
      background-color: $color;

      &:hover {
        background-color: lighten($color, 5%);
      }
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
