<script lang="ts">
  import MemberProfileCard from './MemberProfileCard.svelte'
  import MemberProfileCardSide from './MemberProfileCardSide.svelte'
  import MemberProfileCardSwag from './MemberProfileCardSwag.svelte'
</script>

<img class="header-logo" src="/playlists/tripleS/tripleS-logo.png" />
<div class="timeline">
  <div class="timeline-left">
    <MemberProfileCard
      sNumber={1}
      name="Seoyeon"
      image="/playlists/tripleS/yooyeon.png"
      date="2022-05-01"
    />
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
  $logo-size: 4rem;
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
