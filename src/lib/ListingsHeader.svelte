<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
  import Fa from 'svelte-fa/src/fa.svelte'

  export let text: string
  export let icon: IconDefinition
  export let linkUrl = ''
  export let linkText = ''
</script>

<div class="container">
  {#if icon}
    <div class="icon">
      <!-- TODO: Check for better way to style this -->
      <Fa style='height:100%;width:100%;' class="fa" fw {icon} />
    </div>
  {/if}
  <h2>{text}</h2>
  <div class="accent-line-container">
    <div class="line" />
  </div>
  {#if linkText}
    <a href={linkUrl}>{linkText}</a>
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .icon {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 20px;
  }

  .container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  h2 {
    display: block;
  }

  .accent-line-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    height: 100%;
    flex-grow: 1;

    .line {
      height: 5px;
      width: 100%;
      background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
    }
  }

  a {
    display: inline-flex;
    justify-content: right;
    align-items: center;
    &::before {
      height: 15px;
      width: 8px;
      margin-right: 9px;
      content: url('/red-triangle.svg');
    }
    color: $color-danger-red;
  }
</style>
