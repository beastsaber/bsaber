<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import Fa from 'svelte-fa'
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
    Dia_Kurosawa: 'Dia Kurosawa',
    A_Rise: 'A-RISE',
    Sunny_Passion: 'Sunny Passion',
    Sayaka_Murano: 'Sayaka Murano',
    Hanayo_Koizumi: 'Hanayo Koizumi',
    Wien_Margarete: 'Wien Margarete',
    Nakasu_Kasumi: 'Kasumi Nakasu',
    Kanan_Matsuura: 'Kanan Matsuura',
    Lanzhu_Zhong: 'Lanzhu Zhong',
    Chisato_Arashi: 'Chisato Arashi',
    Emma_Verde: 'Emma Verde',
    Kozuzu_Kachimachi: 'Kosuzu Kachimachi',
    Hanamaru_Kunikida: 'Hanamaru Kunikida',
    Sonoda_Umi: 'Umi Sonoda',
    Ayumu_Uehara: 'Ayumu Uehara',
    Shizuku_Osaka: 'Shizuku Osaka',
    Kinako_Sakurakoji: 'Kinako Sakurakoji',
    You_Watanabe: 'You Watanabe',
    Maki_Nishikino: 'Maki Nishikino',
    Kanon_Shibuya: 'Kanon Shibuya',
    Sarah_Kazuno: 'Sarah Kazuno',
    Kaho_Hinoshita: 'Kaho Hinoshita',
    Ai_Miyashita: 'Ai Miyashita',
    Nozomi_Tojo: 'Nozomi Tojo',
    Mari_Ohara: 'Mari Ohara',
    Kozue_Otomune: 'Kozue Otomune',
    Shiki_Wakana: 'Shiki Wakana',
    Karin_Asaka: 'Karin Asaka',
    Yoshiko_Tsushima: 'Yoshiko Tsushima',
    Keke_Tang: 'Keke Tang',
    Nico_Yazawa: 'Nico Yazawa',
    Chika_Takami: 'Chika Takami',
    Honoka_Kosaka: 'Honoka Kosaka',
    Natsumi_Onitsuka: 'Natsumi Onitsuka',
    Setsuna_Yuki: 'Setsuna Yuki',
    Rurino_Osawa: 'Rurino Osawa',
    Kotori_Minami: 'Kotori Minami',
    Riko_Sakurauchi: 'Riko Sakurauchi',
    Ruby_Kurosawa: 'Ruby Kurosawa',
    Hime_Anyoji: 'Hime Anyoji',
    Sumire_Heanna: 'Sumire Heanna',
    Shioriko_Mifune: 'Shioriko Mifune',
    Ginko_Momose: 'Ginko Momose',
    Eli_Ayase: 'Eli Ayase',
    Mei_Yoneme: 'Mei Yoneme',
    Rin_Hozhizora: 'Rin Hoshizora',
    Rina_Tennoji: 'Rina Tennoji',
    Tsuzuri_Yugiri: 'Tsuzuri Yugiri',
    Ren_Hazuki: 'Ren Hazuki',
    Mia_Taylor: 'Mia Taylor',
    Leah_Kazuno: 'Leah Kazuno',
    Kanata_Konoe: 'Kanata Konoe',
    Megumi_Fujishima: 'Megumi Fujishima',
    Tomari_Onitsuka: 'Tomari Onitsuka',
  }
</script>

<MetaHead
  title="Love Live! Birthday Pack"
  description="Presenting a year-long effort to highlight every idol in the Love Live! franchise, symphonic has gathered an army of mappers to release maps featuring each of these idols individually on their birthdays! All maps come with custom lightshows!"
  imageUrl="/uploads/playlists/Love Live! Birthday Pack - Cover - With Text.png"
/>

<section class="hero">
  <div class="content">
    <div class="card-container">
      <div class="card">
        <a href="https://beatsaver.com/profile/4292041"><img src={avatarUrl} alt="Symphonic" /> </a>
      </div>
    </div>
    <div class="uploader-container">
      <a class="uploader" href="https://beatsaver.com/profile/4292041">symphonic</a>
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

<div class="timeline">
  <div class="timeline-side timeline-left">
    <div style="height: 40rem"></div>
    <MemberProfileCardSwag
      name={members.Dia_Kurosawa}
      image="/uploads/playlists/love-live/01-01_Dia_Kurosawa.png"
      date="January 1"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 2rem"></div>
    <MemberProfileCardSwag
      name={members.Sayaka_Murano}
      image="/uploads/playlists/love-live/01-13_Sayaka_Murano.png"
      date="January 13"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Wien_Margarete}
      image="/uploads/playlists/love-live/01-20_Wien_Margarete.png"
      date="January 20"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Emma_Verde}
      image="/uploads/playlists/love-live/02_05_Emma_Verde.png"
      date="February 5"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Lanzhu_Zhong}
      image="/uploads/playlists/love-live/02-15_Lanzhu_Zhong.png"
      date="February 15"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Kozuzu_Kachimachi}
      image="/uploads/playlists/love-live/02_28_Kozuzu_Kachimachi.png"
      date="February 28"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Hanamaru_Kunikida}
      image="/uploads/playlists/love-live/03-04_Hanamaru_Kunikida.png"
      date="March 4"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Sunny_Passion}
      image="/uploads/playlists/love-live/sunny-passion.png"
      date="March 28"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Kinako_Sakurakoji}
      image="/uploads/playlists/love-live/04-10_Kinako_Sakurakoji.png"
      date="April 10"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Maki_Nishikino}
      image="/uploads/playlists/love-live/04-19_Maki_Nishikino.png"
      date="April 19"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Sarah_Kazuno}
      image="/uploads/playlists/love-live/05-04_Sarah_Kazuno.png"
      date="May 4"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Ai_Miyashita}
      image="/uploads/playlists/love-live/05-30_Ai_Miyashita.png"
      date="May 30"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Mari_Ohara}
      image="/uploads/playlists/love-live/06-13_Mari_Ohara.png"
      date="June 13"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Shiki_Wakana}
      image="/uploads/playlists/love-live/06-17_Shiki_Wakana.png"
      date="June 17"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Yoshiko_Tsushima}
      image="/uploads/playlists/love-live/07-13_Yoshiko_Tsushima.png"
      date="July 13"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Nico_Yazawa}
      image="/uploads/playlists/love-live/07-22_Nico_Yazawa.png"
      date="July 22"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Honoka_Kosaka}
      image="/uploads/playlists/love-live/08-03_Honoka_Kosaka.png"
      date="August 3"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Setsuna_Yuki}
      image="/uploads/playlists/love-live/08-08_Setsuna_Yuki.png"
      date="August 8"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Kotori_Minami}
      image="/uploads/playlists/love-live/09-12_Kotori_Minami.png"
      date="September 12"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Ruby_Kurosawa}
      image="/uploads/playlists/love-live/09-21_Ruby_Kurosawa.png"
      date="September 21"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Shioriko_Mifune}
      image="/uploads/playlists/love-live/10-05_Shioriko_Mifune.png"
      date="October 5"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Mei_Yoneme}
      image="/uploads/playlists/love-live/10-29_Mei_Yoneme.png"
      date="October 29"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Rina_Tennoji}
      image="/uploads/playlists/love-live/11-13_Rina_Tennoji.png"
      date="November 13"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Ren_Hazuki}
      image="/uploads/playlists/love-live/11-24_Ren_Hazuki.png"
      date="November 24"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Leah_Kazuno}
      image="/uploads/playlists/love-live/12-12_Leah_Kazuno.png"
      date="December 12"
      positionDate="bottom-right"
      positionName="top-left"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Megumi_Fujishima}
      image="/uploads/playlists/love-live/12-20_Megumi_Fujishima.png"
      date="December 20"
      positionDate="bottom-right"
      positionName="top-left"
    />
  </div>
  <div class="timeline-center">
    <div class="trailer">
      <h2>Watch the pack Trailer!</h2>
      <iframe
        src="https://www.youtube.com/embed/v0btb_hd50Q?si=PpegLO0UwX5Or75S"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <AlbumPlaylistCard
      albumName="Love Live! Birthday Pack"
      groupName="Mappers: symphonic, FeudBoy_YT, swukpuff, calamity, misterlihao, Ge2toro, AchiCirno, steeak, Acubens, CMP1111, Kinz, vekikano, Fuyakeru, P90KILLR, emiru, ashad, mikuri, Elecast, Klondike, Ken_Monogatari, Joetastic, yuchisese, BanditByTheStreet, chikinbiskit, NTS-Azazel, Bytrius, Comyute, umeko, ImChloe"
      playlistId={268749}
    />
  </div>
  <div class="timeline-side timeline-right">
    <div style="height: 51rem"></div>
    <MemberProfileCardSwag
      name={members.A_Rise}
      image="/uploads/playlists/love-live/a-rise.png"
      date="January 6"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 2rem"></div>
    <MemberProfileCardSwag
      name={members.Hanayo_Koizumi}
      image="/uploads/playlists/love-live/01-17_Hanayo_Koizumi.png"
      date="January 17"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Nakasu_Kasumi}
      image="/uploads/playlists/love-live/01-23_Kazumi_Nakasu.png"
      date="January 23"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 0.1rem"></div>
    <MemberProfileCardSwag
      name={members.Kanan_Matsuura}
      image="/uploads/playlists/love-live/02-10_Kanan_Matsuura.png"
      date="February 10"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 0.5rem"></div>
    <MemberProfileCardSwag
      name={members.Chisato_Arashi}
      image="/uploads/playlists/love-live/02-25_Chisato_Arashi.png"
      date="February 25"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Ayumu_Uehara}
      image="/uploads/playlists/love-live/03_01_Ayumu_Uehara.png"
      date="March 1"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Sonoda_Umi}
      image="/uploads/playlists/love-live/03-15_Umi_Sonoda.png"
      date="March 15"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Shizuku_Osaka}
      image="/uploads/playlists/love-live/04-03_Shizuku_Osaka.png"
      date="April 3"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.You_Watanabe}
      image="/uploads/playlists/love-live/04-17_You_Watanabe.png"
      date="April 17"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Kanon_Shibuya}
      image="/uploads/playlists/love-live/05-01_Kanon_Shibuya.png"
      date="May 1"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1.5rem"></div>
    <MemberProfileCardSwag
      name={members.Kaho_Hinoshita}
      image="/uploads/playlists/love-live/05-22_Kaho_Hinoshita.png"
      date="May 22"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Nozomi_Tojo}
      image="/uploads/playlists/love-live/06-09_Nozomi_Tojo.png"
      date="June 9"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Kozue_Otomune}
      image="/uploads/playlists/love-live/06-15_Kozue_Otomune.png"
      date="June 15"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Karin_Asaka}
      image="/uploads/playlists/love-live/06-29_Karin_Asaka.png"
      date="June 29"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Keke_Tang}
      image="/uploads/playlists/love-live/07-17_Keke_Tang.png"
      date="July 17"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Chika_Takami}
      image="/uploads/playlists/love-live/08-01_Chika_Takami.png"
      date="August 1"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Natsumi_Onitsuka}
      image="/uploads/playlists/love-live/08-07_Natsumi_Onitsuka.png"
      date="August 7"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Rurino_Osawa}
      image="/uploads/playlists/love-live/08-31_Rurino_Osawa.png"
      date="August 31"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Riko_Sakurauchi}
      image="/uploads/playlists/love-live/09-19_Riko_Sakurauchi.png"
      date="September 19"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Sumire_Heanna}
      image="/uploads/playlists/love-live/09-28_Sumire_Heanna.png"
      date="September 28"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Eli_Ayase}
      image="/uploads/playlists/love-live/10-21_Eli_Ayase.png"
      date="October 21"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Rin_Hozhizora}
      image="/uploads/playlists/love-live/11-01_Rin_Hozhizora.png"
      date="November 1"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Tsuzuri_Yugiri}
      image="/uploads/playlists/love-live/11-17_Tsuzuri_Yugiri.png"
      date="November 17"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Mia_Taylor}
      image="/uploads/playlists/love-live/12-02_Mia_Taylor.png"
      date="December 2"
      positionDate="bottom-left"
      positionName="top-right"
    />
    <div style="height: 1rem"></div>
    <MemberProfileCardSwag
      name={members.Kanata_Konoe}
      image="/uploads/playlists/love-live/12-16_Kanata_Konoe.png"
      date="December 16"
      positionDate="bottom-left"
      positionName="top-right"
    />
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
      grid-template-columns: calc(var(--card-width) + 1rem) auto calc(var(--card-width) + 1rem);
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
    padding: 1rem;
    width: 100%;
  }
  iframe {
    display: flex;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16 / 9;
  }
</style>
