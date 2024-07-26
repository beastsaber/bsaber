<script lang="ts">
  import AlbumPlaylistCard from './AlbumPlaylistCard.svelte'
  import MemberProfileCardSwag from './MemberProfileCardSwag.svelte'

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

<div class="header-line">
  <img class="header-logo" src="/playlists/tripleS/tripleS-logo.png" />
  <div class="right-hand-side">
    <h1>tripleS Pack</h1>
    <a
      href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/545227/download/beatsaver-545227.bplist"
      class="download-button"
      download>Download</a
    >
  </div>
</div>
<div class="timeline">
  <div class="timeline-side timeline-left">
    <MemberProfileCardSwag
      sNumber={1}
      name={members.Seoyeon}
      image="/playlists/tripleS/yooyeon.png"
      date="May 1, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />

    <MemberProfileCardSwag
      sNumber={3}
      name={members.Jiwoo}
      image="/playlists/tripleS/yooyeon.png"
      date="June 1, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={6}
    />

    <MemberProfileCardSwag
      sNumber={5}
      name={members.Yooyeon}
      image="/playlists/tripleS/yooyeon.png"
      date="July 15, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-12}
    />

    <MemberProfileCardSwag
      sNumber={7}
      name={members.Nakyoung}
      image="/playlists/tripleS/yooyeon.png"
      date="August 22, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={12}
    />

    <MemberProfileCardSwag
      sNumber={9}
      name={members.Kaede}
      image="/playlists/tripleS/yooyeon.png"
      date="November 9, 2022"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />

    <MemberProfileCardSwag
      sNumber={11}
      name={members.Kotone}
      image="/playlists/tripleS/yooyeon.png"
      date="January 2, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={2}
    />
    <MemberProfileCardSwag
      sNumber={13}
      name={members.Nien}
      image="/playlists/tripleS/yooyeon.png"
      date="March 20, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-3}
    />
    <MemberProfileCardSwag
      sNumber={15}
      name={members.Xinyu}
      image="/playlists/tripleS/yooyeon.png"
      date="July 2, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={6}
    />
    <MemberProfileCardSwag
      sNumber={17}
      name={members.Lynn}
      image="/playlists/tripleS/yooyeon.png"
      date="December 26, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />
    <MemberProfileCardSwag
      sNumber={19}
      name={members.Hayeon}
      image="/playlists/tripleS/yooyeon.png"
      date="December 28, 2023"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={8}
    />
    <MemberProfileCardSwag
      sNumber={21}
      name={members.Chaewon}
      image="/playlists/tripleS/yooyeon.png"
      date="April 1, 2024"
      positionDate="bottom-left"
      positionName="top-right"
      rotationDeg={-6}
    />
    <MemberProfileCardSwag
      sNumber={23}
      name={members.Seoah}
      image="/playlists/tripleS/yooyeon.png"
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
      albumDate="May 1, 2022"
      playlistId={628674}
      membersIncluded={[members.Hyerin, members.Yooyeon, members.Nakyoung, members.Yubin]}
    />
    <AlbumPlaylistCard
      albumName="ASSEMBLE"
      groupName="tripleS"
      albumDate="February 13, 2023"
      playlistId={628674}
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
      playlistId={628674}
      membersIncluded={[members.Seoyeon, members.Chaeyeon, members.Jiwoo, members.Soomin]}
    />
    <AlbumPlaylistCard
      albumName="Touch+"
      groupName="+(KR)ystal Eyes"
      albumDate="June 27, 2023"
      playlistId={628674}
      membersIncluded={[members.Seoyeon, members.Chaeyeon, members.Jiwoo, members.Soomin]}
    />
    <AlbumPlaylistCard
      albumName="Cherry Gene"
      groupName="Acid Eyes"
      albumDate="July 6, 2023"
      playlistId={628674}
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
      playlistId={628674}
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
      playlistId={628674}
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
    Placeholder
    <AlbumPlaylistCard
      albumName="Just Do It"
      groupName="NXT"
      albumDate="December 23, 2023"
      playlistId={628674}
      membersIncluded={[members.Shion, members.Lynn, members.Hayeon, members.Joobin]}
    />
    <AlbumPlaylistCard
      albumName="Structure Of Sadness"
      groupName="Aria"
      albumDate="January 15, 2024"
      playlistId={628674}
      membersIncluded={[members.Shion, members.Lynn, members.Hayeon, members.Joobin]}
    />
    <AlbumPlaylistCard
      albumName="ASSEMBLE24"
      groupName="tripleS"
      albumDate="March 8, 2024"
      playlistId={628674}
      membersIncluded={[...Object.values(members)]}
    />
    <AlbumPlaylistCard
      albumName="Inner Dance"
      groupName="Glow"
      albumDate="June 21, 2024"
      playlistId={628674}
      membersIncluded={[members.Jiyeon, members.Sullin, members.Chaewon, members.Seoah]}
    />
    <AlbumPlaylistCard
      albumName="###"
      groupName="tripleS"
      albumDate="July 20, 2024"
      playlistId={628674}
      membersIncluded={[...Object.values(members)]}
    />
  </div>
  <div class="timeline-side timeline-right">
    <MemberProfileCardSwag
      sNumber={2}
      name={members.Hyerin}
      image="/playlists/tripleS/yooyeon.png"
      date="May 17, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />

    <MemberProfileCardSwag
      sNumber={4}
      name={members.Chaeyeon}
      image="/playlists/tripleS/yooyeon.png"
      date="June 22, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-6}
    />

    <MemberProfileCardSwag
      sNumber={6}
      name={members.Soomin}
      image="/playlists/tripleS/yooyeon.png"
      date="August 8, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={12}
    />

    <MemberProfileCardSwag
      sNumber={8}
      name={members.Yubin}
      image="/playlists/tripleS/yooyeon.png"
      date="September 9, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-12}
    />

    <MemberProfileCardSwag
      sNumber={10}
      name={members.Dahyun}
      image="/playlists/tripleS/yooyeon.png"
      date="December 9, 2022"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />

    <MemberProfileCardSwag
      sNumber={12}
      name={members.Yeonji}
      image="/playlists/tripleS/yooyeon.png"
      date="January 18, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-2}
    />
    <MemberProfileCardSwag
      sNumber={14}
      name={members.Sohyun}
      image="/playlists/tripleS/yooyeon.png"
      date="April 14, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={3}
    />
    <MemberProfileCardSwag
      sNumber={16}
      name={members.Mayu}
      image="/playlists/tripleS/yooyeon.png"
      date="June 19, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-6}
    />
    <MemberProfileCardSwag
      sNumber={18}
      name={members.Joobin}
      image="/playlists/tripleS/yooyeon.png"
      date="December 27, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />
    <MemberProfileCardSwag
      sNumber={20}
      name={members.Shion}
      image="/playlists/tripleS/yooyeon.png"
      date="December 29, 2023"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-8}
    />
    <MemberProfileCardSwag
      sNumber={22}
      name={members.Sullin}
      image="/playlists/tripleS/yooyeon.png"
      date="April 2, 2024"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={6}
    />
    <MemberProfileCardSwag
      sNumber={24}
      name={members.Jiyeon}
      image="/playlists/tripleS/yooyeon.png"
      date="April 4, 2024"
      positionDate="bottom-right"
      positionName="top-left"
      rotationDeg={-8}
    />
  </div>
</div>

<style lang="scss">
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
      margin-bottom: 3rem;
    }

    a.download-button {
      text-decoration: none;
      cursor: pointer;
      color: white;

      transition-property: all;
      transition-duration: 0.5s;

      font-size: 3rem;
    }

    a.download-button:hover {
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
      display: flex;
      flex-direction: column;
      gap: 3rem;
      align-items: center;
    }
  }
</style>
