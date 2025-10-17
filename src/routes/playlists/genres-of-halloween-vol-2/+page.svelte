<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="Genres of Halloween - Vol. 2"
  description="Ready for Round 2?! TG Mapping Group returns, for Vol. 2 of Genres of Halloween!"
  imageUrl="/uploads/playlists/Genres_of_Halloween_2.png"
/>

<section class="hero">
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source
        src="https://cdn.theczar1994.dev/bsaber/playlists/GOH_Background_Video.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  <div class="pictures">
    <img src="/uploads/playlists/swarm-pack/Nitro.png" alt="Nitro" />
    <img src="/uploads/playlists/swarm-pack/OneSpookyBoi.png" alt="Spooky" />
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
      <h1>Genres of Halloween - Vol. 2</h1>
      <p>Ready for Round 2?! TG Mapping Group returns, for Vol. 2 of Genres of Halloween!</p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/1033478/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/1033478/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/1033478">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={1033478} showToggle={false} />

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
    filter: brightness(45%) blur(7px);
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

  .pictures {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: -4;
    filter: brightness(45%);
    img {
      height: 12rem;
      width: auto;
      filter: brightness(45%);
      animation: ghostFloat 3.5s ease-in-out infinite alternate;
      transition:
        transform 0.4s ease-in-out,
        filter 0.4s ease-in-out;
      &:hover {
        transform: translateY(-10px) rotate(3deg) scale(1.05) translateX(5px);
        filter: brightness(100%);
      }
      @media (max-width: 678px) {
        height: 10rem;
      }
      @media (max-width: 400px) {
        height: 8rem;
      }
    }
    img:nth-child(1) {
      animation-duration: 3s;
      animation-delay: 0s;
    }
    img:nth-child(2) {
      animation-duration: 3.8s;
      animation-delay: 0.7s;
      animation-name: ghostFloatAlt;
    }
  }
  @keyframes ghostFloat {
    0% {
      transform: translateY(0) translateX(0) scale(1);
    }
    100% {
      transform: translateY(-12px) translateX(6px) scale(1.02);
    }
  }
  @keyframes ghostFloatAlt {
    0% {
      transform: translateY(0) translateX(0) scale(1);
    }
    100% {
      transform: translateY(10px) translateX(-5px) scale(1.02);
    }
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
    background-color: #9f0507;
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
    background-color: #9f0507;
    text-decoration: none;
    color: white;
  }
  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
  }
</style>
