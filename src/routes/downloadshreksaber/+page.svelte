<script>
  import MetaHead from '$lib/MetaHead.svelte'
</script>

<MetaHead
  title="Shrek Saber"
  description="The entire feature length movie in Beat Saber. Download Shrek Saber by KINGPEUCHE"
/>

<section class="hero">
  <div class="content">
    <div class="body">
      <h2>THE ENTIRE FEATURE LENGTH MOVIE IN BEAT SABER</h2>
      <h2>DOWNLOAD <span class="green">SHREK SABER</span> BY KINGPEUCHE</h2>
      <h2>Experience all 83 minutes of Shrek epicness in Beat Saber!</h2>
      <br />
      <br />
      <p>*This map has no valid map ID/hash - scores will not upload to any leaderboards*</p>
    </div>
    <div class="buttons">
      <a
        class="btn"
        href="https://drive.usercontent.google.com/download?id=18Uc3oJl0TbygSnnX9iS27G5t9Pk0ZcbK&export=download"
        title="Recommended Install">Download V2 Format (Recommended)</a
      >
      <a
        class="btn"
        href="https://drive.usercontent.google.com/download?id=1FJ4Zk4ta_TNd19CM0vxqRhn_Mwdk4XFb&export=download"
        title="Will not work on latest Beat Saber versions">Download Original V1 Format</a
      >
    </div>
  </div>
</section>

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
    background: url('/uploads/posts/shreksaber.jpg') no-repeat center center;
    background-size: cover;
    filter: brightness(50%) blur(2px);
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
  .body {
    padding: 0 0.5rem 2.5rem 0.5rem;
  }
  h2 {
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
    font-family: sans-serif;
    text-shadow: 1px 0 10px black;
  }
  p {
    text-shadow: 1px 0 10px black;
  }
  .green {
    color: #99cc00;
  }

  .buttons {
    display: grid;
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
  }
  .btn {
    padding: 12px 30px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.5s ease;
    border-radius: 5px;
    font-weight: bolder;
    background-color: dodgerblue;
    color: white;
  }
  .btn:hover {
    background-color: royalblue;
    text-decoration: none;
    color: white;
  }
</style>
