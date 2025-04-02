<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="Arcane Season 2 Pack"
  description="This is a pack devoted to Arcane with all songs from season 2. Whether you play a fighting or emotion song, the Powder is in your hands."
  imageUrl="/uploads/playlists/arcaneseason2.png"
/>

<section class="hero">
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source
        src="https://cdn.theczar1994.dev/bsaber/playlists/arcaneseason2.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/4286182"
          ><img src="/uploads/playlists/MadChase.png" alt="MadChase" />
        </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/4286182">MadChase</a>
      & others Presents
    </div>
    <div class="body">
      <h1>Arcane Season 2 Pack</h1>
      <p>
        Arcane! Go watch... NOW!!! After that come back and play all these maps.
        <br />
        <br />
        This is a pack devoted to Arcane with all songs from season 2.
        <br />
        Whether you play a fighting or emotion song, the Powder is in your hands.
        <br />
        <br />
        Mappers:
        <a class="uploader" href="https://beatsaver.com/profile/4286182">MadChase</a>,
        <a class="uploader" href="https://beatsaver.com/profile/4280701">RateGyro</a>,
        <a class="uploader" href="https://beatsaver.com/profile/73032">Bytrius</a>,
        <a class="uploader" href="https://beatsaver.com/profile/145971">Bellus</a>,
        <a class="uploader" href="https://beatsaver.com/profile/4284788">hypersonicsharkz</a>,
        <a class="uploader" href="https://beatsaver.com/profile/4318869">pleo</a>,
        <a class="uploader" href="https://beatsaver.com/profile/4278467">TaylorGaming</a>, &
        <a class="uploader" href="https://beatsaver.com/profile/4284201">nitronik.exe</a>
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/823788/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/823788/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/823788">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={823788} showToggle={false} />

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
    z-index: -5;
    filter: brightness(35%) blur(10px);
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
    gap: 2.5rem;
    height: 200px;
    transform: scale(15%);
    margin-top: -5rem;
  }
  .card {
    height: 700px;
    background: rgba(0, 0, 0, 0);
    flex: 1;
    width: 45rem;
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
  }

  .body {
    padding: 0 0.5rem 2.5rem 0.5rem;
  }

  .uploader {
    color: white;
    font-weight: 1000;
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
    background-color: #023974;
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
    background-color: #023974;
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
