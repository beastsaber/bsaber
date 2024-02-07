<script lang="ts">
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
  import type { MapOfTheWeek } from '../types'
  import Header from './Header.svelte'
  export let mapOfTheWeek: MapOfTheWeek
</script>

<div class="motw-container">
  <div class="background-image" style="background-image: url({mapOfTheWeek.map.coverUrl});" />
  <div class="card">
    <Header text="Map of the Week" icon={faCalendarDay} />
    <!-- ToDo: Implement this header link 
      linkText="See all maps of the week"
      linkUrl="/maps-of-the-week" 
    -->
    <div class="card-body">
      <a class="map-link" href="https://beatsaver.com/maps/{mapOfTheWeek.map.id}">
        <img class="map-cover" alt="Cover of the Map of the Week" src={mapOfTheWeek.map.coverUrl} />
      </a>
      <!-- This container is used to float the content to the bottom so that it will push up bashed on the length of the review -->
      <div class="map-details-container">
        <div class="map-details">
          <h2 class="map-title">
            <a
              class="map-link"
              href="https://beatsaver.com/maps/{mapOfTheWeek.map.id}"
            >
              {mapOfTheWeek.map.name}
            </a>
          </h2>
          <p class="map-uploader">
            Mapped by
            <a
              class="profile-link"
              href="https://beatsaver.com/profile/{mapOfTheWeek.map.uploader.id}"
              >{mapOfTheWeek.map.uploader.name}</a
            >
            {#if mapOfTheWeek.map.uploader.verifiedMapper}
              <img class="verified" src="/verified.svg" alt="Verified" title="Verified" />
            {/if}
          </p>
          <p class="review">{mapOfTheWeek.review}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  :global(.motw-container .container) {
    padding-top: 0rem !important;
  }


  .motw-container {
    position: relative;
    margin-top: 3rem;
    width: 100%;
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
    background: linear-gradient(to top, $background-secondary 0%, transparent 100%);
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
    margin-left: $size-cover + 26px;
    display: flex;
    min-height: 150px;
    align-items: end;
  }

  .map-cover {
    width: $size-cover;
    height: $size-cover;
    float: left;
    border-radius: 10px;
  }

  .map-title {
    margin-bottom: 0rem;
  }

  .profile-link {
    color: $color-danger-red;
  }

  .map-uploader {
    margin-bottom: 1rem;
  }

  .verified {
    height: 1rem;
    width: 1rem;
    /* Margin bottom to counter the illusion of it not being center */
    margin: 0 0 0.15rem 0.2rem;
    vertical-align: middle;
  }

  .map-link {
    color: inherit;
  }

  .review {
    white-space: pre;
  }
</style>
