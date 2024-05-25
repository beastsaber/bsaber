<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
  import Fa from 'svelte-fa/src/fa.svelte'
  import IconLink from './IconLink.svelte'

  export let text: string
  export let icon: IconDefinition
  export let linkUrl: string | undefined = undefined
  export let linkText: string | undefined = undefined
</script>

<div class="container">
  <div class="heading-container">
    {#if icon}
      <div class="icon">
        <!-- TODO: Check for better way to style this -->
        <Fa style="height:100%;width:100%;" class="fa" fw {icon} />
      </div>
    {/if}
    <h2>{text}</h2>
    <div class="accent-line-container">
      <div class="line" />
    </div>
  </div>
  <div class="link-container">
    {#if linkText}
      <IconLink {linkUrl} {linkText} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .container {
    display: flex;
    padding: 0.5rem 0;
    width: 100%;
    padding: 3rem 0 1.5rem 0;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 720px) {
      flex-direction: row;
      align-items: center;
    }
  }

  .heading-container {
    display: flex;
    align-items: center;
    width: 100%;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  .link-container {
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 10px;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  h2 {
    display: block;
  }

  .accent-line-container {
    @media (min-width: 420px) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      height: 100%;
      flex-grow: 1;

      .line {
        height: 2px;
        width: 100%;
        background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
      }
    }
  }
</style>
