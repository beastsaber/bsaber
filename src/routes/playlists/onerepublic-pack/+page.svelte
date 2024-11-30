<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="OneRepublic Pack"
  description="A pack devoted to OneRepublic songs with all maps having custom lights, a poodle diff, and a normal diff at a minimum."
  imageUrl="/uploads/playlists/OneRepublic.png"
/>

<section class="hero">
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/4286182"
          ><img src="/uploads/playlists/MadChase.png" alt="MadChase" />
        </a>
      </div>
      <div class="card">
        <a href="https://beatsaver.com/profile/4280701"
          ><img src="/uploads/playlists/RateGyro.jpg" alt="RateGyro" />
        </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/4286182">MadChase</a>
      &
      <a class="uploader" href="https://beatsaver.com/profile/4280701">RateGyro</a>
      Presents
    </div>
    <div class="body">
      <h1>OneRepublic Pack</h1>
      <p>
        A pack devoted to OneRepublic songs with all maps having custom lights, a poodle diff, and a
        normal diff at a minimum.
        <br />
        <br />
        Mappers:
        <a class="uploader" href="https://beatsaver.com/profile/4286182">MadChase</a>
        &
        <a class="uploader" href="https://beatsaver.com/profile/4280701">RateGyro</a> <br />
        Lighting and Environments:
        <a class="uploader" href="https://beatsaver.com/profile/4286182">MadChase</a>,
        <a class="uploader" href="https://beatsaver.com/profile/4280701">RateGyro</a>, &
        <a class="uploader" href="https://beatsaver.com/profile/4284947">Phøenix</a>
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/621068/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/621068/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/621068">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={621068} />

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
    background: url('/uploads/playlists/OneRepublic.gif') no-repeat center center;
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
    transition: 0.3s;
    width: 90rem;
  }
  .card:hover {
    flex: 3;
    background: rgba(12, 171, 195, 0);
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
    background-color: #00014a;
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
    background-color: #00014a;
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
