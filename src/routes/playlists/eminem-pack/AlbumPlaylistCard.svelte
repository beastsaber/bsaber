<script lang="ts">
  import MapCards from '$lib/MapCards.svelte'
  import OneClickDownloadButton from '$lib/OneClickDownloadButton.svelte'
  import SocialIcon from '$lib/SocialIcon.svelte'
  import ZipDownloadButton from '$lib/ZipDownloadButton.svelte'

  export let albumName: string
  export let mappers: string
  export let playlistId: number
  export let albumCover: string

  const playlistUrl = `https://api.beatsaver.com/playlists/id/${playlistId}/download/beatsaver-${playlistId}.bplist`
</script>

<div class="playlist-card">
  <div class="header">
    <div class="logo-container">
      <img class="header-logo" src={albumCover} />
    </div>
    <div class="header-content-container">
      <div class="header-line">
        <h2>{albumName}</h2>
      </div>
      <div class="second-line">
        <div class="mappers">
          Mappers: {mappers}
        </div>
        <div class="download-buttons">
          <ZipDownloadButton downloadURL={playlistUrl} />
          <OneClickDownloadButton {playlistUrl} />
        </div>
      </div>
    </div>
  </div>
  <div class="map-cards-containers">
    <MapCards {playlistId} fixedCount={4} showToggle={false} />
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';
  .playlist-card {
    width: 100%;

    &:hover .header,
    &:hover .footer {
      background-color: $color-background-tertiary;
    }

    &:hover .map-cards-containers {
      border-right: 1.5px solid $color-background-tertiary;
      border-bottom: 1.5px solid $color-background-tertiary;
      border-left: 1.5px solid $color-background-tertiary;
    }
  }

  .header {
    display: flex;
    padding: 1rem;
    background-color: $color-background-secondary;
    border-radius: $rounding-small $rounding-small 0 0;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }

  .header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .second-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .download-buttons {
    display: flex;
    gap: 1rem;
    vertical-align: middle;
    justify-content: center;
    align-items: center;

    .social-icon-wrapper {
      margin-right: 2rem;
    }
  }

  .header-content-container {
    flex: 1;
    flex-grow: 1;
    margin-left: 1.3rem;
  }

  .header-logo {
    height: 4rem;
    width: 4rem;
    border-radius: 5px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .mappers {
    font-size: 1rem;
    color: $color-text-secondary;
  }

  .map-cards-containers {
    margin: 0;
    padding: 1rem;
    border-left: 1.5px solid $color-background-secondary;
    border-right: 1.5px solid $color-background-secondary;
    border-bottom: 1.5px solid $color-background-secondary;
    border-radius: 0 0 $rounding-small $rounding-small;
    transition-property: border-left, border-right, border-bottom;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
</style>
