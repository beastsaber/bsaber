<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="IVE Switch Fitbeat Pack"
  description="Don't skip leg day, it's IVE's newest album Switch. Time to train those thigh muscles and get a good butt with IVE's amazing songs."
  imageUrl="/uploads/playlists/ive-switch.jpg"
/>

<section class="hero">
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/145971" target="_blank"
          ><img src="/uploads/playlists/bellus.png" alt="Bellus" />
        </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/145971" target="_blank">Bellus</a> & others
      Present
    </div>
    <div class="body">
      <h1>IVE Switch Fitbeat Pack</h1>
      <p>
        Don't skip leg day, it's IVE's newest album Switch. Time to train those thigh muscles and
        get a good butt with IVE's amazing songs.
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/528396/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/528396/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/528396">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={528396} />

<style>
  .hero {
    position: relative;
    min-height: 45rem;
    height: 70vh;
    background-size: cover;
    margin-top: -20px;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('/uploads/playlists/ive-switch.jpg') no-repeat center center;
    background-size: cover;
    filter: brightness(30%) blur(5px);
    z-index: -1;
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
    background: rgba(48, 208, 232, 0);
    flex: 1;
    width: 45rem;
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
  }

  .uploader {
    color: white;
    font-weight: 1000;
  }

  .body {
    padding-bottom: 2.5rem;
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
    background-color: #414160;
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
    background-color: #3951ab;
    color: white;
  }
  .btn:hover {
    background-color: #122975;
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
