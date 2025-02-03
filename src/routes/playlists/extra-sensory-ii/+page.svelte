<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
</script>

<MetaHead
  title="Extra Sensory II"
  description="The sequel to the original Extra Sensory event in 2020; EXSII pushes the limits like never before. With ten new maps that will completely flip how you play (and make modhcarts) on its head."
  imageUrl="/uploads/playlists/totalbslogo1.png"
/>

<section class="hero">
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source
        src="https://cdn.theczar1994.dev/bsaber/playlists/exsii-background.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  <div class="content">
    <div class="card-container">
      <div class="card">
        <img src="/uploads/playlists/totalbslogo1.png" alt="TotalBS" />
      </div>
    </div>
    <div class="uploader-container">TotalBS Presents</div>
    <div class="body">
      <h1>Extra Sensory II</h1>
      <p>
        Time for something you've never seen before!
        <br />
        <br />
        The sequel to the original Extra Sensory event in 2020; EXSII pushes the limits like never before.
        With ten new maps that will completely flip how you play (and make modhcarts) on its head.
        <br />
        <br />
        <a class="uploader" href="/posts/this-is-totalbs" style="font-size: large;"
          >Learn more about the TotalBS Team!</a
        >
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/797071/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/797071/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" target="_blank" href="https://exsii.totalbs.dev/">Download the Mods</a>
    </div>
  </div>
</section>
<br />
<h2><Fa icon={faMap} />&nbsp;Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId={797071} showToggle={false} />

<style lang="scss">
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
    background-color: #0cc0c9;
    color: white;
  }
  .zip:hover,
  .one:hover {
    background-color: #5d5d8b;
    text-decoration: none;
    color: white;
  }
  .buttons {
    display: grid;
    gap: 0.3rem;
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
    background-color: #0cc0c9;
    color: white;
  }
  .btn:hover {
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
