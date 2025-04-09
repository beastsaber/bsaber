<script lang="ts">
  import type { Uploader } from '../types'

  export let uploader: Uploader

  export let curator: Uploader | undefined = undefined

  const randomId = Math.random().toString(36).substring(2, 15)
</script>

<div class="uploader">
  <label id="{randomId}-mapped-by" for="{randomId}-uploader-link" class="sr-only">Mapped by</label>
  <a
    class="uploader-link"
    id="{randomId}-uploader-link"
    href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${
      uploader.id
    }`}
    aria-labelledby="{randomId}-mapped-by {randomId}-uploader-link"
  >
    <img src={uploader.avatar} alt="" aria-hidden="true" />
    {uploader.name}
  </a>
  {#if uploader.verifiedMapper}
    <img class="verified" src="/verified.svg" alt="Verified Mapper" title="Verified" />
  {/if}
  {#if curator !== undefined}
    <span class="curator" aria-hidden="true">-</span>
    <span class="curator">
      <span id="{randomId}-curated-by">Curated by </span>
      <a
        aria-labelledby="{randomId}-curated-by {randomId}-curator-link"
        id="{randomId}-curator-link"
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
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;

    .uploader-link {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      overflow-wrap: anywhere;
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
