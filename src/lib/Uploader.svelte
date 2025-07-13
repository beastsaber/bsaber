<script lang="ts">
  import Fa from 'svelte-fa'
  import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import type { Uploader } from '../types'

  export let uploader: Uploader
  export let curator: Uploader | undefined = undefined
  export let collaborators: Uploader[] = []

  let showTooltip = false

  const randomId = Math.random().toString(36).substring(2, 15)

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInside = (event.target as HTMLElement)?.closest('.tooltip-scope')
      if (!clickedInside) {
        showTooltip = false
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
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
  {#if collaborators.length > 0}
    <div class="collaborators-container tooltip-scope">
      <button
        class="collaborators-button"
        aria-label="Show collaborators"
        on:click={() => (showTooltip = !showTooltip)}
      >
        <Fa icon={faUserGroup} />
        <span class="collab-count">+{collaborators.length}</span>
      </button>

      {#if showTooltip}
        <div class="collaborators-tooltip" role="tooltip">
          <button
            class="close-button"
            on:click={() => (showTooltip = false)}
            aria-label="Close tooltip"
          >
            ×
          </button>
          <div class="collaborator-line">
            {#each collaborators as collaborator, i}
              <a
                class="uploader-link"
                href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${collaborator.id}`}
              >
                <img src={collaborator.avatar} alt="" aria-hidden="true" />
                {collaborator.name}
              </a>
              {#if i < collaborators.length - 1}
                <span class="dash">–</span>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </div>
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

  .collaborators-container {
    position: relative;
    display: inline-block;

    .collaborators-button {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
      background: none;
      border: 1px;
      color: $color-danger-red;
      padding: 0.25rem;
      cursor: pointer;
    }

    .collab-count {
      font-weight: bold;
    }

    .collaborators-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(4.5rem);
      background: $color-background-tertiary;
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 0.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      min-width: max-content;
      max-width: 90vw;
      white-space: nowrap;

      .close-button {
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
        background: none;
        border: none;
        font-size: 1rem;
        color: #ccc;
        cursor: pointer;

        &:hover {
          color: #fff;
        }
      }

      .collaborator-line {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;

        .dash {
          color: #aaa;
        }

        .uploader-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: $color-danger-red;
          text-decoration: none;

          img {
            height: 1.25rem;
            width: 1.25rem;
            border-radius: 50%;
          }

          &:hover {
            text-decoration: underline;
          }
        }
      }
      @media (max-width: 992px) {
        display: none;
      }
    }
  }
</style>
