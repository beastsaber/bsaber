<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
  import Fa from 'svelte-fa/src/fa.svelte'

  export let text: string
  export let color: string
  export let icon: IconDefinition
  export let href: string
</script>

<a class="quick-filter" style="background-color: {color}" {href}>
  <div class="content">
    <div class="icon">
      <Fa size="1.5x" {icon} />
    </div>
    <h4>{text}</h4>
  </div>
</a>

<style lang="scss">
  @import 'src/scss/variables';

  .quick-filter {
    height: 40px;
    color: $color-primary-text;
    border-radius: $rounding;
    overflow: hidden;
    text-transform: uppercase;

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
      padding-top: 1px; // fix for slight misalignment
      opacity: 0.5;
    }
  }
</style>
