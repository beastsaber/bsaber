<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import AlbumPlaylistCard from './AlbumPlaylistCard.svelte'
  import MemberProfileCardSwag from './MemberProfileCardSwag.svelte'

  let avatarUrl = ''

  onMount(async () => {
    const response = await fetch('https://beatsaver.com/api/users/id/4292041')
    const data = await response.json()
    avatarUrl = data.avatar
  })

  const members = {
    John: 'John',
  }
</script>

<MetaHead
  title="Love Live! Birthday Pack"
  description="Presenting a year-long effort to highlight every idol in the Love Live! franchise, symphonic has gathered an army of mappers to release maps featuring each of these idols individually on their birthdays! All maps come with custom lightshows!"
  imageUrl="/uploads/playlists/OneRepublic.png"
/>

<section class="hero">
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/4292041"><img src={avatarUrl} alt="Symphonic" /> </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/4286182">symphonic</a>
      and others Present
    </div>
    <div class="body">
      <h1>Love Live! Birthday Pack</h1>
      <p>
        Presenting a year-long effort to highlight every idol in the "Love Live!" franchise,
        symphonic has gathered an army of mappers to release maps featuring each of these idols
        individually on their birthdays! All maps come with custom lightshows!
      </p>
    </div>
    <div class="zip-one">
      <a
        class="zip"
        href="https://api.beatsaver.com/playlists/id/268749/download"
        title="Zip Download via BeatSaver"><Fa icon={faDownload} /></a
      >
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/268749/download"
        title="OneClick&trade; Install via BeatSaver"><Fa icon={faCloudDownloadAlt} /></a
      >
    </div>
    <div class="buttons">
      <a class="btn" href="https://beatsaver.com/playlists/268749">BEATSAVER</a>
    </div>
  </div>
</section>
<br />
<div class="trailer">
  <h2>Watch the pack Trailer!</h2>
  <iframe
    src="https://www.youtube.com/embed/v0btb_hd50Q?si=PpegLO0UwX5Or75S"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  />
</div>
<br />

<div class="timeline">
  <div class="timeline-side timeline-left">
    <div style="height: 3rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/uploads/playlists/love-live/01_Dia_Kurosawa.png"
      date="May 1, 2022"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 31rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/uploads/playlists/love-live/02-1_Anju_Yuki.png"
      date="June 1, 2022"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 25rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/uploads/playlists/love-live/02-2_Tsubasa_Kira.png"
      date="July 15, 2022"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 35rem" />
    <MemberProfileCardSwag
      name={members.John}
      image=""
      date="August 22, 2022"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 39rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Kaede.png"
      date="November 9, 2022"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 27rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Kotone.png"
      date="January 2, 2023"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 35rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Nien.png"
      date="March 20, 2023"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 43rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Xinyu.png"
      date="July 2, 2023"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 35rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Lynn.png"
      date="December 26, 2023"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 26rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/HaYeon.png"
      date="December 28, 2023"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 33rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/ChaeWon.png"
      date="April 1, 2024"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 42rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/SeoAh.png"
      date="April 3, 2024"
      positionDate="bottom-left"
      positionName="top-right"
    />
  </div>
  <div class="timeline-center">
    <AlbumPlaylistCard
      albumName="Love Live! Birthday Pack"
      groupName="Mappers: symphonic, FeudBoy_YT, swukpuff, calamity, misterlihao, Ge2toro, AchiCirno, steeak, Acubens, CMP1111, Kinz, vekikano, Fuyakeru, P90KILLR, emiru, ashad, mikuri, Elecast, Ken_Monogatari, Joetastic, yuchisese, BanditByTheStreet, chikinbiskit, NTS-Azazel, Bytrius, Comyute, umeko, ImChloe"
      playlistId={268749}
    />
  </div>
  <div class="timeline-side timeline-right">
    <div style="height: 18rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/HyeRin.png"
      date="May 17, 2022"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/ChaeYeon.png"
      date="June 22, 2022"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 52rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/SooMin.png"
      date="August 8, 2022"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 20rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/YuBin.png"
      date="September 9, 2022"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/DaHyun.png"
      date="December 9, 2022"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 55rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/YeonJi.png"
      date="January 18, 2023"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/SoHyun.png"
      date="April 14, 2023"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 20rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Mayu.png"
      date="June 19, 2023"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 48rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/JooBin.png"
      date="December 27, 2023"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/ShiOn.png"
      date="December 29, 2023"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 20rem" />
    <MemberProfileCardSwag
      name={members.John}
      image="/playlists/tripleS/Sullin.png"
      date="April 2, 2024"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 39rem" />
    <div class="swag-hang">
      <MemberProfileCardSwag
        name={members.John}
        image="/playlists/tripleS/JiYeon.png"
        date="April 4, 2024"
        positionDate="bottom-right"
        positionName="top-left"
      />
    </div>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';
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
    background: url('/uploads/playlists/Love Live! Birthday Pack - Cover - With Text.png') no-repeat
      center center;
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
    background-color: #371226;
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
    background-color: #371226;
    text-decoration: none;
    color: white;
  }

  @media (max-width: 1099px) {
    .timeline-side {
      display: none;
      margin: 0;
      padding: 0;
    }

    .timeline {
      grid-template-columns: 1fr;
    }

    .timeline-center {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      align-items: center;
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  @media (min-width: 1100px) {
    .timeline {
      width: 100%;
      display: grid;
      grid-template-columns: calc(var(--triples-card-width) + 1rem) auto calc(
          var(--triples-card-width) + 1rem
        );
    }

    .timeline-side {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .timeline-center {
      margin: 0 3rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      align-items: center;
    }

    .swag-hang {
      position: relative;
      top: 8rem;
    }
  }
  .trailer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }
  iframe {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16 / 9;
  }
</style>
