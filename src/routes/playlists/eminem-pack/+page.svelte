<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
  import AlbumPlaylistCard from './AlbumPlaylistCard.svelte'
</script>

<MetaHead
  title="Eminem Pack"
  description="American Rapper, Eminem, hits Beat Saber with this music pack! Play various songs by Eminem from throughout the years presented to you by TGMapping Group!"
  imageUrl="/uploads/playlists/eminem-pack/Eminem_Pack.png"
/>

<section class="hero">
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source
        src="https://cdn.theczar1994.dev/bsaber/playlists/eminem-pack-hero.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/124825"
          ><img src="/uploads/playlists/eminem-pack/TGMappingGroup.jpg" alt="TGMappingGroup" />
        </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/124825">TGMappingGroup</a>
      Presents
    </div>
    <div class="body">
      <h1>Eminem Pack</h1>
      <p>
        TG Mapping Group presents... The Eminem Pack! Slash though some iconic songs from 8
        different albums, from the newly released Death of Slim Shady, to classics like The Eminem
        Show!
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/830318/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/830318/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/830318">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<div class="timeline-center">
  <AlbumPlaylistCard
    albumName="The Death of Slim Shady"
    albumCover="/uploads/playlists/eminem-pack/779231.jpg"
    mappers="Scorefam, CosmonautSaitni"
    playlistId={779231}
  />
  <AlbumPlaylistCard
    albumName="Music To Be Murdered By"
    albumCover="/uploads/playlists/eminem-pack/779232.jpg"
    mappers="TaylorGaming, ImChloe"
    playlistId={779232}
  />
  <AlbumPlaylistCard
    albumName="Recovery"
    albumCover="/uploads/playlists/eminem-pack/779233.jpg"
    mappers="DesperateWoman, The_Editor_On_BeatSaver"
    playlistId={779233}
  />
  <AlbumPlaylistCard
    albumName="D-12 World"
    albumCover="/uploads/playlists/eminem-pack/779235.jpg"
    mappers="grizlor"
    playlistId={779235}
  />
  <AlbumPlaylistCard
    albumName="All Is Yellow"
    albumCover="/uploads/playlists/eminem-pack/779236.jpg"
    mappers="steeak"
    playlistId={779236}
  />
  <AlbumPlaylistCard
    albumName="The Marshall Mathers LP 1 & 2"
    albumCover="/uploads/playlists/eminem-pack/779239.jpg"
    mappers="TaylorGaming, LunarByte, grizlor, steeak, ImChloe, TPenny68, The_Editor_On_BeatSaver, OneSpookyBoi"
    playlistId={779239}
  />
  <AlbumPlaylistCard
    albumName="2001"
    albumCover="/uploads/playlists/eminem-pack/824603.jpg"
    mappers="grizlor"
    playlistId={824603}
  />
  <AlbumPlaylistCard
    albumName="Eminem Show"
    albumCover="/uploads/playlists/eminem-pack/824605.jpg"
    mappers="DesperateWoman"
    playlistId={824605}
  />
</div>

<style lang="scss">
  @import 'src/scss/variables';
  .hero {
    position: relative;
    min-height: 50rem;
    height: 70vh;
    background-size: cover;
    margin-top: -20px;
    overflow: hidden;
  }
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -5;
    filter: brightness(45%) blur(10px);
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    text-align: center;
    align-items: center;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .card-container {
    display: flex;
    height: 200px;
    transform: scale(15%);
    margin-top: -5rem;
  }
  .card {
    height: 700px;
    background: rgba(48, 208, 232, 0);
    flex: 1;
    width: 45rem;
    transition: filter 0.6s ease;
    filter: drop-shadow(5px 5px 20px $color-background-primary);
    &:hover {
      filter: drop-shadow(5px 5px 20px white);
    }
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .body {
    padding: 0 0.5rem 2.5rem 0.5rem;
    text-shadow: $color-background-primary 5px 5px 20px;
  }

  .uploader {
    color: white;
    font-weight: 1000;
    text-shadow: $color-background-primary 5px 5px 20px;
  }

  h1 {
    font-size: 3.5rem;
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
  }
  @media (max-width: 678px) {
    h1 {
      font-size: 2.5rem;
    }
  }
  @media (max-width: 400px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  p {
    margin: 0.5rem 0.5rem 0;
  }
  .zip-one {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .zip,
  .one {
    padding: 12px;
    cursor: pointer;
    font-size: 15px;
    text-align: center;
    transition: background-color 0.5s ease;
    border-radius: 5px;
    font-weight: bolder;
    width: 84px;
    background-color: #fffdfd;
    color: black;
  }
  .zip:hover,
  .one:hover {
    background-color: #3b1b54;
    text-decoration: none;
    color: white;
  }
  .buttons {
    display: grid;
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
  }
  .btn {
    padding: 12px;
    cursor: pointer;
    font-size: 15px;
    text-align: center;
    transition: background-color 0.5s ease;
    border-radius: 5px;
    font-weight: bolder;
    width: 197px;
    background-color: #fffdfd;
    color: black;
  }
  .btn:hover {
    background-color: #3b1b54;
    text-decoration: none;
    color: white;
  }
  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
  }
  @media (max-width: 1099px) {
    .timeline-center {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  @media (min-width: 1100px) {
    .timeline-center {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
  }
</style>
