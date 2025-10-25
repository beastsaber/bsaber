<script lang="ts">
  import MetaHead from '$lib/MetaHead.svelte'
  import Fa from 'svelte-fa'
  import { faDownload, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import AdoventCalendar, { type Day, type Bonus, type Credit } from './adoventCalendar.svelte'

  export let data: {
    playlistId: number
    playlistName: string
    days: Day[]
    bonus: Bonus[]
    credits: Credit[]
  }

  let days = structuredClone(data.days)
  let bonus = structuredClone(data.bonus)
  const credits = data.credits

  function handleReorder(e: CustomEvent<{ days: Day[]; bonus: Bonus[] }>) {
    days = e.detail.days
    bonus = e.detail.bonus
  }
</script>

<MetaHead
  title="ADOvent Calendar"
  description="Ado is a Japanese singer known for her powerful vocals, enigmatic persona, and distinctive blend of J-pop, rock, and Vocaloid influences. To celebrate her birthday on October 24th, one map is released each day starting October 1st, like an advent calendar leading up to Christmas."
  imageUrl="/uploads/posts/ditr/ditr7-square.png"
/>

<section class="hero">
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source
        src="https://cdn.theczar1994.dev/bsaber/playlists/AdoDynamicWideBlank.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/4284201">
          <img src="/uploads/playlists/nitronik.gif" alt="nitronik.exe" />
        </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/4284201">nitronik.exe</a> presents
    </div>
    <div class="body">
      <h1>{data.playlistName}</h1>
      <p>
        Ado is a Japanese singer known for her powerful vocals, enigmatic persona, and distinctive
        blend of J-pop, rock, and Vocaloid influences.
      </p>
      <p>
        To celebrate her birthday on October 24th, one map is released each day starting October
        1st, like an Advent Calendar leading up to Christmas.
      </p>
    </div>
  </div>
</section>

<br />

<div class="download-buttons">
  <div class="saber-pc">
    <a
      class="btn-saber"
      href={'https://cdn.theczar1994.dev/bsaber/Adovent2025AdoRoseSaber.saber'}
      title="Ado Saber PC Download">Ado Saber Download (PC)</a
    >
  </div>
  <div class="normal-buttons">
    <div class="zip-one">
      <a
        class="zip"
        href={'https://api.beatsaver.com/playlists/id/' + data.playlistId + '/download'}
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href={'bsplaylist://playlist/https://api.beatsaver.com/playlists/id/' +
          data.playlistId +
          '/download'}
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>

    <div class="buttons">
      <a class="btn" href={'https://beatsaver.com/playlists/' + data.playlistId}>BEATSAVER</a>
    </div>
  </div>
  <div class="saber-quest">
    <a
      class="btn-saber"
      href={'https://cdn.theczar1994.dev/bsaber/Adovent2025AdoRoseSaber.whacker'}
      title="Ado Saber Quest Download">Ado Saber Download (Quest)</a
    >
  </div>
</div>

<br />

<h2>ADOvent Calendar</h2>
<hr class="fade" />

<AdoventCalendar {days} {bonus} {credits} on:reorder={handleReorder} />

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
    inset: 0;
    z-index: -5;
    filter: brightness(60%) blur(7px);
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
    inset: 0;
  }
  .card-container {
    display: flex;
    height: 200px;
    transform: scale(15%);
    margin-top: -5rem;
  }
  .card {
    height: 700px;
    background: transparent;
    flex: 1;
    width: 45rem;
  }
  .card img {
    width: 97%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
  }
  .body {
    padding: 0 0.5rem 2.5rem 0.5rem;
  }
  .uploader {
    color: #fff;
    font-weight: 1000;
  }
  h1 {
    font-size: 3.5rem;
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
    text-align: center;
  }
  .download-buttons {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
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
    background: #fffdfd;
    color: #000;
  }
  .zip:hover,
  .one:hover {
    background: #061c4b;
    color: #fff;
    text-decoration: none;
  }
  .buttons,
  .saber-pc,
  .saber-quest {
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
    background: #fffdfd;
    color: #000;
  }
  .btn:hover {
    background: #061c4b;
    color: #fff;
    text-decoration: none;
  }
  .btn-saber {
    padding: 12px;
    cursor: pointer;
    font-size: 15px;
    text-align: center;
    transition: background-color 0.5s ease;
    border-radius: 5px;
    font-weight: bolder;
    width: 100% !important;
    background: #fffdfd;
    color: #000;
  }
  .btn-saber:hover {
    background: #061c4b;
    color: #fff;
    text-decoration: none;
  }
  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #999 0%, rgba(153, 153, 153, 0) 100%);
  }
  @media (max-width: 960px) {
    .download-buttons {
      grid-template-columns: 1fr;
    }
    .saber-pc,
    .normal-buttons,
    .saber-quest {
      width: 100%;
    }
    .btn {
      width: 100%;
    }
  }
</style>
