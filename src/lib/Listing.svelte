<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'

  export let icon = null
  export let img = null
  export let title
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

<style>
  .listing {
    width: 100%;
    border-radius: 4px;
    background-color: #303030;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-left: 12px;
    padding-right: 12px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #444;
    font-size: 20px;
  }

  .img {
    width: 25px;
  }

  .content {
    padding: 12px;
  }
</style>
