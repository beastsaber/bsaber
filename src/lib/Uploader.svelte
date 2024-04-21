<script lang="ts">
  import type { Uploader } from '../types'

  export let uploader: Uploader

  export let curator: Uploader | undefined = undefined
</script>

<div class="uploader">
  <a
    class="uploader-link"
    href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${
      uploader.id
    }`}
  >
    <img src={uploader.avatar} alt={uploader.name} />
    {uploader.name}
  </a>
  {#if uploader.verifiedMapper}
    <img class="verified" src="/verified.svg" alt="Verified" title="Verified" />
  {/if}
  {#if curator !== undefined}
    <span class="curator">-</span>
    <span class="curator">
      Curated by <a
        href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${
          curator.id
        }`}>{curator.name}</a
      >
    </span>
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .uploader {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .uploader-link {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    img {
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;

      &.verified {
        height: 1rem;
        width: 1rem;
      }
    }

    a {
      font-weight: normal;
      color: $color-danger-red;
      cursor: pointer;
    }

    .curator {
      font-size: 0.75rem;
      color: $color-muted-text;
      display: none;

      @media (min-width: 992px) {
        display: inline-block;
      }
    }
  }
</style>
