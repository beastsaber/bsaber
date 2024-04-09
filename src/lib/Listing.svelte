<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import IconLink from './IconLink.svelte'
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'

  export let title: string

  export let icon: IconDefinition | undefined = undefined
  export let img: string | undefined = undefined
  export let linkUrl: string | undefined = undefined
  export let linkText: string | undefined = undefined
</script>

<div class="listing">
  <div class="header">
    <div class="source">
      {#if icon}
        <Fa fw {icon} />
      {:else if img}
        <img class="img" src={img} alt="" />
      {/if}
      <h3>{title}</h3>
    </div>
    {#if linkText}
      <div class="icon-link">
        <IconLink {linkUrl} {linkText} />
      </div>
    {/if}
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .listing {
    border-radius: $rounding-small;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 10px;
    border-bottom: 1px solid $color-muted-text;
    flex-wrap: wrap;

    .source {
      font-size: 20px;
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 10px;
    }

    .icon-link {
      display: flex;
      justify-content: end;
      margin-bottom: 10px;
    }
  }

  .img {
    width: 25px;
  }
</style>
