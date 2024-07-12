<img class="header-logo" src="/playlists/tripleS/tripleS-logo.png" />
<img class="header-logo" src="/playlists/tripleS/vertical-line.svg" />
<div class="timeline">
  <div class="timeline-unit">
    <div class="timeline-left">Left</div>
    <div class="timeline-line">
      <div class="icon" />
      <div class="date left">2021-01-01</div>
    </div>
    <div class="timeline-right">Right</div>
  </div>
</div>

<style lang="scss">
  $logo-size: 4rem;
  .header-logo {
    height: $logo-size;
    width: $logo-size;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .timeline-unit {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
  }

  .timeline-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
  }
</style>
