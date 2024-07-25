<script lang="ts">
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
  import type { MapOfTheWeek } from '../types'
  import Header from './Header.svelte'
  import OneClickButton from './OneClickDownloadButton.svelte'
  import ZipDownloadButton from './ZipDownloadButton.svelte'
  export let mapOfTheWeek: MapOfTheWeek
  export let showHeader = false
  import { marked } from 'marked'

  let aspectRatio = mapOfTheWeek.showcase?.type === 'youtube-short' ? '9/16' : '16/9'
  let sizeDeterminer =
    mapOfTheWeek.showcase?.type === 'youtube-short' ? 'height: 90vh' : 'width: 90vw'
  let sizeLimiter =
    mapOfTheWeek.showcase?.type === 'youtube-short' ? 'max-height: 50,625vw' : 'max-width: 160vh'

  let showShowcase = false

  const closeModalOnEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideShowcase()
    }
    document.removeEventListener('keydown', closeModalOnEsc)
  }

  const openShowcase = () => {
    showShowcase = true
    document.body.addEventListener('keydown', closeModalOnEsc)
  }

  const hideShowcase = () => {
    showShowcase = false
    document.body.removeEventListener('keydown', closeModalOnEsc)
  }

  const collaborators = mapOfTheWeek.map.collaborators ?? []

  const uploaders = [mapOfTheWeek.map.uploader, ...collaborators]

  const renderer = new marked.Renderer()
  renderer.paragraph = (text) => text

  // Set the renderer to the marked options
  marked.setOptions({
    renderer: renderer,
  })
</script>

{#if showShowcase && mapOfTheWeek.showcase != null && mapOfTheWeek.showcase.id != null && mapOfTheWeek.showcase.type != null}
  <div class="showcase-modal" style="aspect-ratio: {aspectRatio}; {sizeDeterminer}; {sizeLimiter};">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/{mapOfTheWeek?.showcase.id}?rel=0&autoplay=1&loop=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
  <div class="showcase-backdrop" on:click={hideShowcase} />
{/if}
<div class="motw-container">
  <div class="background-image" style="background-image: url({mapOfTheWeek.coverUrl});" />
  <div class="card">
    {#if showHeader}
      <Header
        text="Map of the Week"
        icon={faCalendarDay}
        linkText="See all maps of the week"
        linkUrl="/maps-of-the-week/1"
      />
    {/if}
    <div class="card-body">
      <a class="map-link" href="https://beatsaver.com/maps/{mapOfTheWeek.map.id}">
        <img class="map-cover" alt="Cover of the Map of the Week" src={mapOfTheWeek.coverUrl} />
      </a>
      <!-- This container is used to float the content to the bottom so that it will push up bashed on the length of the review -->
      <div class="map-details-container">
        <div class="map-details">
          <h2 class="map-title">
            <a class="map-link" href="https://beatsaver.com/maps/{mapOfTheWeek.map.id}">
              {mapOfTheWeek.map.name}
            </a>
          </h2>
          <!-- eslint-disable -->
          <!-- prettier-ignore-start -->
          <!-- @formatter:off -->
          <p class="map-uploader">
            By
            {#each uploaders as uploader, i}
              <a class="profile-link" href="https://beatsaver.com/profile/{uploader.id}">
                {uploader.name}</a
              ><!--
           -->{#if uploader.verifiedMapper}
                <img
                  class="verified"
                  src="/verified.svg"
                  alt="Verified"
                  title="Verified"
                /><!--
           -->{/if}<!--

           -->{#if i < uploaders.length - 2}
                {', '}
              {:else if i === uploaders.length - 2}
                {' and '}
              {/if}
            {/each}
          </p>
          <!-- @formatter:on -->
          <!-- prettier-ignore-end -->
          <!-- eslint-enable -->
          <p class="review">{@html marked(mapOfTheWeek.review)}</p>
          <div class="action-bar">
            {#if mapOfTheWeek.showcase != null && mapOfTheWeek.showcase.id != null && mapOfTheWeek.showcase.type != null}
              <button class="open-showcase-button" on:click={() => openShowcase()}>
                Watch the showcase
              </button>
            {/if}
            <div class="zip-download-button-container">
              <ZipDownloadButton downloadURL={mapOfTheWeek.map.versions[0].downloadURL} />
            </div>
            <div class="one-click-download-button-container">
              <OneClickButton mapId={mapOfTheWeek.map.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  :global(.motw-container > .card > .container) {
    padding-top: 0rem !important;
  }

  .showcase-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $color-background-secondary;
    z-index: 100;
  }

  .showcase-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2px);
    z-index: 99;
  }

  .action-bar {
    display: flex;
    margin-top: 0.7rem;

    & .open-showcase-button {
      display: block;
      color: $color-accent;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      text-shadow: $color-background-primary 1px 0 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .motw-container {
    position: relative;
    overflow: hidden;
    box-shadow: 0px 3px 3px black;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  $blur-radius: 3px;
  .background-image {
    position: absolute;
    /* 
      Choosing these non-zero values are used to not have the background color bleed into the banner. 
      Basically, the idea of Pixelguy: draw large and have it crop to a smaller size
    */
    top: -$blur-radius - 1px;
    left: -$blur-radius - 1px;
    right: -$blur-radius - 1px;
    bottom: -$blur-radius - 1px;

    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: blur($blur-radius);
  }

  .background-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 66%;
    background: linear-gradient(to top, $color-background-secondary 0%, transparent 100%);
    z-index: 1;
  }

  .card {
    position: relative;
    z-index: 2;
    padding: 1.5rem 1.5rem 2rem 2.5rem;
  }

  $size-cover: 150px;

  .map-details-container {
    // Need to consider the width of the cover which is left-floated, anything less or equal to the width will result in a zero margin
    display: flex;
    min-height: 150px;
    align-items: end;
  }

  .map-details {
    flex-grow: 1;
  }

  .map-cover {
    width: 0;
    height: 0;
    display: hidden;
  }

  @media (min-width: 678px) {
    .map-cover {
      display: block;
      width: $size-cover;
      height: $size-cover;
      float: left;
      border-radius: 10px;
      filter: drop-shadow(5px 5px 5px $color-background-primary);
      transition: 0.6s ease;

      &:hover {
        transform: scale(1.1);
        transition: 0.3s ease;
      }
    }

    .map-details-container {
      margin-left: $size-cover + 26px;
    }
  }

  .map-title {
    margin-bottom: 0rem;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  .profile-link {
    color: $color-danger-red;
  }

  .map-uploader {
    margin-bottom: 1rem;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  .verified {
    height: 1rem;
    width: 1rem;
    /* Margin bottom to counter the illusion of it not being center */
    margin: 0 0 0.15rem 0.3rem;
    vertical-align: middle;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  .map-link {
    color: inherit;
  }

  .review {
    white-space: pre-wrap;
    text-shadow: $color-background-primary 1px 0 10px;
  }

  .one-click-download-button-container {
    position: absolute;
    bottom: 2rem;
    right: 1.5rem;
  }

  .zip-download-button-container {
    position: absolute;
    bottom: 2rem;
    right: 3.8rem;
  }
</style>
