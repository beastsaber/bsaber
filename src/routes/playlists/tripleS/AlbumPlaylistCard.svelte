<script lang="ts">
  import MapCards from '$lib/MapCards.svelte'
  import OneClickDownloadButton from '$lib/OneClickDownloadButton.svelte'
  import SocialIcon from '$lib/SocialIcon.svelte'
  import ZipDownloadButton from '$lib/ZipDownloadButton.svelte'

  export let albumName: string
  export let groupName: string
  export let albumDate: string
  export let playlistId: number
  export let membersIncluded: string[]

  const playlistUrl = `https://api.beatsaver.com/playlists/id/${playlistId}/download/beatsaver-${playlistId}.bplist`

  const lastMember = membersIncluded.pop()
  const memberNames =
    membersIncluded.join(', ') + (membersIncluded.length > 1 ? ' and ' : '') + lastMember
</script>

<div class="playlist-card">
  <div class="header">
    <div class="logo-container">
      <img class="header-logo" src="/playlists/tripleS/tripleS-logo.png" />
    </div>
    <div class="header-content-container">
      <div class="header-line">
        <h2>{albumName}</h2>
        <div class="release-date">released on {albumDate}</div>
      </div>
      <div class="second-line">
        <div class="group-name">
          {groupName}
        </div>
        <div class="download-buttons">
          <div class="social-icon-wrapper">
            <SocialIcon social="BeatSaver" link={`https://beatsaver.com/playlists/${playlistId}`} />
          </div>
          <ZipDownloadButton downloadURL={playlistUrl} />
          <OneClickDownloadButton {playlistUrl} />
        </div>
      </div>
    </div>
  </div>
  <div class="map-cards-containers">
    <MapCards {playlistId} maxCards={4} forceColumnCount={1} />
  </div>
  <div class="footer">With {memberNames}</div>
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
      border-left: 1.5px dashed $color-background-tertiary;
      border-right: 1px dashed $color-background-tertiary;
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

  .footer {
    display: flex;
    padding: 1rem;
    background-color: $color-background-secondary;
    border-radius: 0 0 $rounding-small $rounding-small;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
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
  .release-date {
    font-size: 1rem;
    flex: 1;
    flex-grow: 1;
    padding-left: 1rem;
    color: $color-text-secondary;
  }

  .group-name {
    font-size: 1.3rem;
    color: $color-text-secondary;
  }

  .map-cards-containers {
    margin: 0;
    padding: 1rem;
    border-left: 1.5px dashed $color-background-secondary;
    border-right: 1px dashed $color-background-secondary;
  }
</style>
