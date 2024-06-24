<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import MapCards from '$lib/MapCards.svelte'
  export let title = 'BSMG 5th Anniversary'
  export let subtitle = 'Celebrating 5 years of Beat Saber Modding Group!'
</script>

<MetaHead title="BSMG 5th Anniversary" />

<section class="hero">
  <div class="overlay" />
  <div class="content">
    <p><img src="/ModSaberWhite.svg" alt="BSMG Logo" width="100" height="100" /></p>
    BSMG Presents
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <div class="buttons">
      <a class="btn" href="https://api.beatsaver.com/playlists/id/89418/download" target="_blank"
        >PLAYLIST</a
      >
      <a
        class="btn2"
        href="https://github.com/BSMGPink/FifthAnniversaryMod/releases/tag/1.0.0"
        target="_blank">ANNIVERSARY MOD</a
      >
    </div>
  </div>
</section>
<br />
<MapCards sortOrder="CURATED" />

<style>
  .hero {
    position: relative;
    height: 70vh;
    background: url('BSMG_Pack_bg_v3.png') no-repeat center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;
    backdrop-filter: blur(5px) brightness(-40%) !important;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
  }

  p {
    margin: 0.5rem 0 0;
  }
  .buttons {
    display: flex;
    flex-direction: column;
  }
  .btn {
    background-color: #efd6dc;
    color: black;
  }
  .btn2 {
    background-color: #3951ab;
    color: white;
  }
  .btn,
  .btn2 {
    border: none;
    padding: 12px 30px;
    cursor: pointer;
    font-size: 15px;
    position: absolute;
    border-radius: 5px;
    text-align: center;
    font-family: sans-serif;
    width: 200px;
    justify-content: center;
  }

  .btn:hover {
    background-color: #e18da9;
    text-decoration: none;
    color: white;
  }
  .btn2:hover {
    background-color: #122975;
    text-decoration: none;
  }

  .btn {
    top: 125%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn2 {
    top: 150%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
