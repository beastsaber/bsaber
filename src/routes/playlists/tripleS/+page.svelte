<script lang="ts">
  import MemberProfileCard from './MemberProfileCard.svelte'
  import MemberProfileCardSide from './MemberProfileCardSide.svelte'
  import MemberProfileCardSwag from './MemberProfileCardSwag.svelte'
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
  <div class="timeline-left">
    <MemberProfileCardSwag
      sNumber={1}
      name="Seoyeon"
      image="/playlists/tripleS/yooyeon.png"
      date="1st May 2022"
    />
  </div>
  <div class="timeline-line">
    <div class="icon" />
  </div>
  <div class="timeline-right">Right</div>
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

  .timeline {
    display: flex;
    grid-template-columns: 1fr 1rem 1fr;
  }

  .timeline-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 0 !important;
    margin: 0 !important;
    height: 100%;
    background-image: url('/playlists/tripleS/vertical-line.svg');
    background-repeat: no-repeat;
    background-position: center;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: red;
      padding: 0;
      margin: 0;
      height: 1rem;
      width: 1rem;
    }

    .date {
      position: relative;
      font-size: 0.75rem;
      top: -1.1rem;
      text-wrap: nowrap;
      width: 100%;
      &.left {
        left: -3.5rem;
      }
    }
  }

  .timeline-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    width: 50%;
    height: 100%;
    background-color: red;
  }

  .timeline-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    background-color: blue;
  }
</style>
