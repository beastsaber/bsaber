<script>
  import MetaHead from '$lib/MetaHead.svelte'
</script>

<MetaHead
  title="BSMG 5th Anniversary"
  description="Celebrating 5 years of the Beat Saber Modding Group, this pack features a variety of maps and songs to get you grooving!"
/>

<section class="hero">
  <div class="content">
    <p><img src="/ModSaberWhite.svg" alt="BSMG Logo" width="100" height="100" /></p>
    BSMG Presents
    <h1>BSMG <span class="pink">5th</span> Anniversary</h1>
    <p>Celebrating 5 years of the Beat Saber Modding Group!</p>
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

<style>
  .pink {
    color: #e18da9;
  }
  .hero {
    position: relative;
    height: 70vh;
    background: url('BSMG_Pack_bg_v3.png') no-repeat center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: -28px;
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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
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
    .content {
      bottom: 4rem;
    }
  }

  p {
    margin: 0.5rem 0.5rem 0;
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
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: 165px;
    justify-content: center;
    transition: background-color 0.5s ease;
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
    top: 145%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
