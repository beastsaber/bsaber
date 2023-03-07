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
    <div>{title}</div>
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .listing {
    border-radius: $rounding;
    background-color: $background-secondary;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-left: 12px;
    padding-right: 12px;
    border-top-left-radius: $rounding;
    border-top-right-radius: $rounding;
    background-color: $background-tertiary;
    font-size: 20px;
  }

  .img {
    width: 25px;
  }

  .content {
    padding: 12px;
  }
</style>
