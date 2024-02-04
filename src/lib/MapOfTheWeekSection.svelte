<script lang="ts">
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
  import type { MapOfTheWeek } from '../types'
  import Header from './Header.svelte'
  export let mapOfTheWeek: MapOfTheWeek
</script>

<div class="motw-container">
  <div class="background-image" style="background-image: url({mapOfTheWeek.map.coverUrl});" />
  <div class="card">
    <Header
      text="Map of the Week"
      icon={faCalendarDay}
    />
    <!-- ToDo: Implement this header link 
      linkText="See all maps of the week"
      linkUrl="/maps-of-the-week" 
    -->
    <div class="card-body">
      <a class="map-link" target="_blank" href="https://beatsaver.com/maps/{mapOfTheWeek.map.id}">
        <img class="map-cover" alt="Cover of the Map of the Week" src={mapOfTheWeek.map.coverUrl} />
      </a>
      <!-- This container is used to float the content to the bottom so that it will push up bashed on the length of the remark -->
      <div class="map-details-container">
        <div class="map-details">
          <h2 class="map-title">
            <a
              class="map-link"
              target="_blank"
              href="https://beatsaver.com/maps/{mapOfTheWeek.map.id}"
            >
              {mapOfTheWeek.map.name}
            </a>
          </h2>
          <p class="map-uploader">
            Mapped by
            <a
              class="profile-link"
              target="_blank"
              href="https://beatsaver.com/profile/{mapOfTheWeek.map.uploader.id}"
              >{mapOfTheWeek.map.uploader.name}</a
            >
            {#if mapOfTheWeek.map.uploader.verifiedMapper}
              <img class="verified" src="/verified.svg" alt="Verified" title="Verified" />
            {/if}
          </p>
          <p class="remark">{mapOfTheWeek.remark}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .motw-container {
    position: relative;
    margin-top: 2rem;
    margin-bottom: -0.8rem;
    width: 100%;
    min-height: 18.5rem;
    overflow: hidden;
    box-shadow: 0px 3px 3px black;
    border-radius: 12px;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: blur(3px);
    transition: filter 0.3s;
  }

  .motw-container:hover > .background-image {
    filter: blur(0);
  }

  .background-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 66%;
    background: linear-gradient(to top, #323232 0%, #323232 24%, transparent 100%);
    z-index: 1;
  }

  .card {
    padding-left: 2.3rem;
    position: relative;
    z-index: 2;
  }

  .map-details-container {
    /* The real left-margin is given by this value - the width of .map-cover*/
    margin-left: 11rem;
    display: flex;
    min-height: 150px;
    align-items: end;
  }

  .map-cover {
    width: 150px;
    height: 150px;
    float: left;
  }

  .map-title {
    margin-bottom: 0rem;
  }

  .profile-link {
    color: #e74c3c;
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
</style>
