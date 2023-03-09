<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'

  export let icon: string
  export let img: string
  export let title: string
</script>

<div class="listing">
  <div class="header">
    {#if icon}
      <Fa fw {icon} />
    {:else if img}
      <img class="img" src={img} alt="" />
    {/if}
    <h3>{title}</h3>
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .listing {
    border-radius: $rounding;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 20px;
    border-top-left-radius: $rounding;
    border-top-right-radius: $rounding;
    font-size: 20px;
    border-bottom: 1px solid $color-muted-text;
  }

  .img {
    width: 25px;
  }

  .content {
    padding: 12px;
  }
</style>
