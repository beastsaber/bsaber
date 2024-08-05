<script lang="ts">
  import AlbumPlaylistCard from './AlbumPlaylistCard.svelte'
  import MemberProfileCardSwag from './MemberProfileCardSwag.svelte'
  import OneClickDownloadButton from '$lib/OneClickDownloadButton.svelte'
  import ZipDownloadButton from '$lib/ZipDownloadButton.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
  import { audioPlayer } from '$lib/audio-player'

  let nextSToClick = 1
  const clickMember = (sNumber: number) => {
    if (sNumber === nextSToClick) {
      nextSToClick++
    }

    if (nextSToClick === 25) {
      nextSToClick = 1
      audioPlayer.play('/playlists/tripleS/generationcoverfinal.mp3', 'generation-cover')
    }
  }

  const members = {
    Seoyeon: 'Seoyeon',
    Hyerin: 'Hyerin',
    Jiwoo: 'Jiwoo',
    Chaeyeon: 'Chaeyeon',
    Yooyeon: 'Yooyeon',
    Soomin: 'Soomin',
    Nakyoung: 'Nakyoung',
    Yubin: 'Yubin',
    Kaede: 'Kaede',
    Dahyun: 'Dahyun',
    Kotone: 'Kotone',
    Yeonji: 'Yeonji',
    Nien: 'Nien',
    Sohyun: 'Sohyun',
    Xinyu: 'Xinyu',
    Mayu: 'Mayu',
    Lynn: 'Lynn',
    Joobin: 'Joobin',
    Hayeon: 'Hayeon',
    Shion: 'Shion',
    Chaewon: 'Chaewon',
    Sullin: 'Sullin',
    Seoah: 'Seoah',
    Jiyeon: 'Jiyeon',
  } as const
</script>

<MetaHead
  title="tripleS Pack"
  description="We are presenting the 'tripleS Pack'! A comprehensive Beat Saber map pack containing the entire discography of tripleS up until August 2024!"
  imageUrl="/playlists/tripleS/tripleS-logo.png"
/>

<div class="header-line">
  <img class="header-logo" src="/playlists/tripleS/tripleS-logo.png" />
  <div class="right-hand-side">
    <h1>tripleS Pack</h1>
    <div class="description">
      We are presenting the "tripleS Pack"!<br />A comprehensive Beat Saber map pack containing the
      entire discography of tripleS up until August 2024!
    </div>
    <div class="download">
      <a href="https://beatsaver.com/playlists/545227" class="playlist-button" download
        >Full Playlist</a
      >
      <div class="download_buttons">
        <ZipDownloadButton
          downloadURL="https://api.beatsaver.com/playlists/id/545227/download/beatsaver-545227.bplist"
          fontSize="2rem"
        />
        <OneClickDownloadButton
          playlistUrl="https://api.beatsaver.com/playlists/id/545227/download/beatsaver-545227.bplist"
          fontSize="2rem"
        />
      </div>
    </div>
  </div>
</div>
<div class="mobile-hint">This page looks better on a larger screen.</div>
<div class="timeline">
  <div class="timeline-side timeline-left">
    <div style="height: 3rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(1)}
      sNumber={1}
      name={members.Seoyeon}
      image="/playlists/tripleS/SeoYeon.png"
      date="May 1, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />
    <div style="height: 31rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(3)}
      sNumber={3}
      name={members.Jiwoo}
      image="/playlists/tripleS/JiWoo.png"
      date="June 1, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={10}
    />
    <div style="height: 25rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(5)}
      sNumber={5}
      name={members.Yooyeon}
      image="/playlists/tripleS/YooYeon.png"
      date="July 15, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-8}
    />
    <div style="height: 35rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(7)}
      sNumber={7}
      name={members.Nakyoung}
      image="/playlists/tripleS/NaKyoung.png"
      date="August 22, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={4}
    />
    <div style="height: 39rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(9)}
      sNumber={9}
      name={members.Kaede}
      image="/playlists/tripleS/Kaede.png"
      date="November 9, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-12}
    />
    <div style="height: 27rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(11)}
      sNumber={11}
      name={members.Kotone}
      image="/playlists/tripleS/Kotone.png"
      date="January 2, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={4}
    />
    <div style="height: 35rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(13)}
      sNumber={13}
      name={members.Nien}
      image="/playlists/tripleS/Nien.png"
      date="March 20, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-3}
    />
    <div style="height: 43rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(15)}
      sNumber={15}
      name={members.Xinyu}
      image="/playlists/tripleS/Xinyu.png"
      date="July 2, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={6}
    />
    <div style="height: 35rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(17)}
      sNumber={17}
      name={members.Lynn}
      image="/playlists/tripleS/Lynn.png"
      date="December 26, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />
    <div style="height: 26rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(19)}
      sNumber={19}
      name={members.Hayeon}
      image="/playlists/tripleS/HaYeon.png"
      date="December 28, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={8}
    />
    <div style="height: 33rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(21)}
      sNumber={21}
      name={members.Chaewon}
      image="/playlists/tripleS/ChaeWon.png"
      date="April 1, 2024"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />
    <div style="height: 42rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(23)}
      sNumber={23}
      name={members.Seoah}
      image="/playlists/tripleS/SeoAh.png"
      date="April 3, 2024"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={8}
    />
  </div>
  <div class="timeline-center">
    <AlbumPlaylistCard
      albumName="ACCESS"
      groupName="Acid Angel from Asia"
      albumDate="October 28, 2022"
      playlistId={628877}
      membersIncluded={[members.Hyerin, members.Yooyeon, members.Nakyoung, members.Yubin]}
    />
    <AlbumPlaylistCard
      albumName="ASSEMBLE"
      groupName="tripleS"
      albumDate="February 13, 2023"
      playlistId={628878}
      membersIncluded={[
        members.Seoyeon,
        members.Hyerin,
        members.Jiwoo,
        members.Chaeyeon,
        members.Yooyeon,
        members.Soomin,
        members.Nakyoung,
        members.Yubin,
        members.Kaede,
        members.Dahyun,
      ]}
    />
    <AlbumPlaylistCard
      albumName="AESTHETIC"
      groupName="+(KR)ystal Eyes"
      albumDate="May 4, 2023"
      playlistId={628879}
      membersIncluded={[members.Seoyeon, members.Chaeyeon, members.Jiwoo, members.Soomin]}
    />
    <AlbumPlaylistCard
      albumName="Touch+"
      groupName="+(KR)ystal Eyes"
      albumDate="June 27, 2023"
      playlistId={628880}
      membersIncluded={[
        members.Sohyun,
        members.Seoyeon,
        members.Chaeyeon,
        members.Jiwoo,
        members.Soomin,
      ]}
    />
    <AlbumPlaylistCard
      albumName="Cherry Gene"
      groupName="Acid Eyes"
      albumDate="July 6, 2023"
      playlistId={628881}
      membersIncluded={[
        members.Yooyeon,
        members.Nakyoung,
        members.Seoyeon,
        members.Chaeyeon,
        members.Yubin,
        members.Jiwoo,
        members.Hyerin,
        members.Soomin,
      ]}
    />
    <AlbumPlaylistCard
      albumName="ↀ"
      groupName="LOVElution"
      albumDate="August 17, 2023"
      playlistId={628882}
      membersIncluded={[
        members.Xinyu,
        members.Sohyun,
        members.Dahyun,
        members.Nien,
        members.Seoyeon,
        members.Yubin,
        members.Kaede,
        members.Hyerin,
      ]}
    />
    <AlbumPlaylistCard
      albumName="⟡"
      groupName="EVOLution"
      albumDate="October 11, 2023"
      playlistId={628883}
      membersIncluded={[
        members.Yooyeon,
        members.Mayu,
        members.Nakyoung,
        members.Kotone,
        members.Chaeyeon,
        members.Jiwoo,
        members.Soomin,
        members.Yeonji,
      ]}
    />
    <!-- New Look 16 Member version? (2023-11-17 New Look 16 Member version released)-->
    <AlbumPlaylistCard
      albumName="New Look Official Dance"
      groupName="tripleS"
      albumDate="November 17, 2023"
      playlistId={628907}
      membersIncluded={[
        members.Yooyeon,
        members.Mayu,
        members.Xinyu,
        members.Sohyun,
        members.Nakyoung,
        members.Kotone,
        members.Dahyun,
        members.Nien,
        members.Seoyeon,
        members.Yubin,
        members.Chaeyeon,
        members.Jiwoo,
        members.Kaede,
        members.Hyerin,
        members.Soomin,
        members.Yeonji,
      ]}
    />
    <AlbumPlaylistCard
      albumName="Just Do It"
      groupName="NXT"
      albumDate="December 23, 2023"
      playlistId={628884}
      membersIncluded={[members.Shion, members.Lynn, members.Hayeon, members.Joobin]}
    />
    <AlbumPlaylistCard
      albumName="Structure Of Sadness"
      groupName="Aria"
      albumDate="January 15, 2024"
      playlistId={628885}
      membersIncluded={[
        members.Jiwoo,
        members.Chaeyeon,
        members.Kaede,
        members.Dahyun,
        members.Nien,
      ]}
    />
    <AlbumPlaylistCard
      albumName="ASSEMBLE24"
      groupName="tripleS"
      albumDate="March 8, 2024"
      playlistId={628886}
      membersIncluded={[...Object.values(members)]}
    />
    <AlbumPlaylistCard
      albumName="Inner Dance"
      groupName="Glow"
      albumDate="June 21, 2024"
      playlistId={628887}
      membersIncluded={[members.Jiyeon, members.Sullin, members.Chaewon, members.Seoah]}
    />
    <AlbumPlaylistCard
      albumName="###"
      groupName="tripleS"
      albumDate="July 20, 2024"
      playlistId={628888}
      membersIncluded={[...Object.values(members)]}
    />
  </div>
  <div class="timeline-side timeline-right">
    <div style="height: 18rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(2)}
      sNumber={2}
      name={members.Hyerin}
      image="/playlists/tripleS/HyeRin.png"
      date="May 17, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(4)}
      sNumber={4}
      name={members.Chaeyeon}
      image="/playlists/tripleS/ChaeYeon.png"
      date="June 22, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-6}
    />
    <div style="height: 52rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(6)}
      sNumber={6}
      name={members.Soomin}
      image="/playlists/tripleS/SooMin.png"
      date="August 8, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={12}
    />
    <div style="height: 20rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(8)}
      sNumber={8}
      name={members.Yubin}
      image="/playlists/tripleS/YuBin.png"
      date="September 9, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-6}
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(10)}
      sNumber={10}
      name={members.Dahyun}
      image="/playlists/tripleS/DaHyun.png"
      date="December 9, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />
    <div style="height: 55rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(12)}
      sNumber={12}
      name={members.Yeonji}
      image="/playlists/tripleS/YeonJi.png"
      date="January 18, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-8}
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(14)}
      sNumber={14}
      name={members.Sohyun}
      image="/playlists/tripleS/SoHyun.png"
      date="April 14, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={3}
    />
    <div style="height: 20rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(16)}
      sNumber={16}
      name={members.Mayu}
      image="/playlists/tripleS/Mayu.png"
      date="June 19, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-6}
    />
    <div style="height: 48rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(18)}
      sNumber={18}
      name={members.Joobin}
      image="/playlists/tripleS/JooBin.png"
      date="December 27, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />
    <div style="height: 30rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(20)}
      sNumber={20}
      name={members.Shion}
      image="/playlists/tripleS/ShiOn.png"
      date="December 29, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-8}
    />
    <div style="height: 20rem" />
    <MemberProfileCardSwag
      on:click={() => clickMember(22)}
      sNumber={22}
      name={members.Sullin}
      image="/playlists/tripleS/Sullin.png"
      date="April 2, 2024"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />
    <div style="height: 39rem" />
    <div class="swag-hang">
      <MemberProfileCardSwag
        on:click={() => clickMember(24)}
        sNumber={24}
        name={members.Jiyeon}
        image="/playlists/tripleS/JiYeon.png"
        date="April 4, 2024"
        positionDate="bottom-right"
        positionName="top-left"
        rotationDeg={-8}
      />
    </div>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .header-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;
  }

  .right-hand-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-grow: 1;
    gap: 1rem;

    h1 {
      font-size: 6rem;
      margin-bottom: 1rem;
    }

    .description {
      font-size: 1.5rem;
      text-align: center;
      max-width: 48rem;
      margin-bottom: 2rem;
    }

    .download {
      display: flex;
      gap: 3rem;
      align-items: center;
    }

    .download_buttons {
      display: flex;
      gap: 1rem;
    }

    a.playlist-button {
      text-decoration: none;
      cursor: pointer;
      color: white;

      transition-property: all;
      transition-duration: 0.5s;

      font-size: 3rem;
    }

    a.playlist-button:hover {
      background: linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
      -ms-background-clip: text;
      -ms-text-fill-color: transparent;
      -o-background-clip: text;
      -o-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  $logo-size: 26rem;
  .header-logo {
    height: $logo-size;
    width: $logo-size;
  }

  @media (max-width: 1099px) {
    .right-hand-side .download_buttons {
      display: none;
    }

    .mobile-hint {
      display: block;
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      border-radius: $rounding-small;
      background-color: hsla(45, 100%, 50%, 0.2);
    }

    .header-logo {
      display: none;
      margin: 0;
      padding: 0;
    }

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
    .mobile-hint {
      display: none;
    }

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
</style>
