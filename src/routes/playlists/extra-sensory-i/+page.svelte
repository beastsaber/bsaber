<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="Extra Sensory I"
  description="EXTRA SENSORY I - The original Extra Sensory event pack release which debuted in 2020"
  imageUrl="/uploads/playlists/totalbslogo1.png"
/>

<section class="hero">
  <div class="content">
    <div class="card-container">
      <div class="card">
        <img src="/uploads/playlists/totalbslogo1.png" alt="TotalBS" />
      </div>
    </div>
    <div class="uploader-container">TotalBS Presents</div>
    <div class="body">
      <h1>Extra Sensory I</h1>
      <p>
        Time for something you've never seen before!
        <br />
        <br />
        The Extra Sensory event saw the release of five new maps that use the game in new, creative ways
        that will flip how you play on its head. This song pack contains all of them in one place for
        you! From hell to cities, hitting bombs and notes that can't sit still, you're sure to find a
        new unexpected experience here.
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/50/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/50/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <br />
    <br />
    <a class="uploader" href="/playlists/extra-sensory-ii">Extra Sensory II is now available!</a>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={50} />

<style lang="scss">
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
    background: url('/uploads/posts/exsii/blackbackground.png') no-repeat center center;
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
  .uploader {
    color: white;
    font-weight: 1000;
  }
  .body {
    padding: 0 0.5rem 2.5rem 0.5rem;
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
    background-color: #0cc0c9;
    color: white;
  }
  .zip:hover,
  .one:hover {
    background-color: #5d5d8b;
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
