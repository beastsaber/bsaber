<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
</script>

<MetaHead
  title="IVE Switch Fitbeat Pack"
  description="Don't skip leg day, it's IVE's newest album Switch. Time to train those thigh muscles and get a good butt with IVE's amazing songs."
  imageUrl="/uploads/playlists/ive-switch.jpg"
/>

<section class="hero">
  <div class="content">
    <p>
      <img src="/uploads/playlists/bellus.png" alt="Bellus" width="100" height="100" />
    </p>
    Bellus & others Presents
    <h1>IVE Switch Fitbeat Pack</h1>
    <p>
      Don't skip leg day, it's IVE's newest album Switch. Time to train those thigh muscles and get
      a good butt with IVE's amazing songs.
    </p>
    <div class="buttons">
      <a class="btn" href="https://api.beatsaver.com/playlists/id/528396/download" target="_blank"
        >ZIP DOWNLOAD</a
      >
      <a class="btn2" href="https://beatsaver.com/playlists/528396" target="_blank">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<h2>Download the maps below!</h2>
<hr class="fade" />
<MapCards playlistId="528396" />

<style>
  img {
    border-radius: 50%;
  }

  .hero {
    position: relative;
    min-height: 45rem;
    height: 70vh;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: -28px;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/uploads/playlists/ive-switch.jpg') no-repeat center center;
    background-size: cover;
    filter: brightness(30%) blur(5px);
    z-index: -1;
  }

  img {
    padding-bottom: 10px;
  }

  .content {
    position: relative;
    z-index: 1;
    bottom: 6rem;
  }

  h1 {
    font-size: 3.5rem;
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-top: 2rem;
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
  .btn,
  .btn2 {
    border: none;
    padding: 12px 30px;
    cursor: pointer;
    font-size: 15px;
    position: absolute;
    text-align: center;
    width: 165px;
    justify-content: center;
    transition: background-color 0.5s ease;
    border-radius: 5px;
    font-weight: bolder;
  }

  .btn:hover {
    background-color: #414160;
    text-decoration: none;
    color: white;
  }
  .btn2:hover {
    background-color: #122975;
    text-decoration: none;
  }

  .btn {
    background-color: #fffdfd;
    color: black;
    top: 125%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn2 {
    background-color: #3951ab;
    color: white;
    top: 142%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
  }
</style>
