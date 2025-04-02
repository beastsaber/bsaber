<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="Sensual Rhythms Vol. 1"
  description="Dive into the world of allure and intimacy with our Sensual Rhythms map pack featuring the most sexy and sensual songs. This collection is designed to set the mood with smooth, sultry beats, passionate vocals, and enticing lyrics that stir the soul and ignite desire."
  imageUrl="/uploads/playlists/SensualRhythmsVolume1BG.png"
/>

<section class="hero">
  <div class="video-background">
    <video playsinline autoplay muted loop>
      <source
        src="https://cdn.theczar1994.dev/bsaber/playlists/sensualrhythmsvol1hero.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/247853#playlists"
          ><img src="/uploads/playlists/247853.jpg" alt="SSMG" />
        </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/247853#playlists"
        >Sonic Seduction MG</a
      >
      Presents
    </div>
    <div class="body">
      <h1>Sensual Rhythms Vol. 1</h1>
      <p>
        Dive into the world of allure and intimacy with our Sensual Rhythms map pack featuring the
        most sexy and sensual songs. This collection is designed to set the mood with smooth, sultry
        beats, passionate vocals, and enticing lyrics that stir the soul and ignite desire.
        <br />
        <br />
        <a class="reference" href="/playlists/sensual-rhythms-vol-2" style="font-size: large;"
          >Check out Volume 2 here!</a
        >
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/651847/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/651847/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/651847">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={651847} showToggle={false} />

<style>
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
    z-index: -1;
    filter: brightness(40%) blur(5px);
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
    flex-wrap: wrap;
    gap: 3rem;
    height: 200px;
    transform: scale(15%);
    margin-top: -5rem;
  }
  .card {
    height: 700px;
    background: rgba(48, 208, 232, 0);
    flex: 1;
    width: 45rem;
  }
  .card:hover {
    flex: 3;
    background: rgba(12, 171, 195, 0);
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .body {
    padding: 0 0.5rem 2.5rem 0.5rem;
  }

  .uploader {
    color: white;
    font-weight: 1000;
  }

  .reference {
    color: white;
    font-weight: 1000;
    border: solid 1.5px white;
    border-radius: 5px;
    padding: 8px;
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
    background-color: #420707;
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
    background-color: #420707;
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
