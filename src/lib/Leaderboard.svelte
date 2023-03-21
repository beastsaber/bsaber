<script lang="ts">
  import Listing from '$lib/Listing.svelte'
  export let img: string
  export let title: string
  export let players: Array<{
    name: string
    rank: number
    avatar: string
    change: number
  }>
  export let linkText: string
  export let linkUrl: string

  type RankColorType = 'info-blue' | 'warning-yellow' | 'success-green'
  export let rankColor: RankColorType
</script>

<Listing {title} {img} linkText={linkText} linkUrl={linkUrl}>
  {#each players as player, index}
    <div class="player-container">
      <div class="player">
        <div class="rank {rankColor}">{player.rank}</div>
        <img class="avatar" src={player.avatar} alt="" />
        <div class="name">{player.name}</div>
        <div class="change-icon" class:up={player.change >= 1} class:down={player.change <= -1} />
        <div class="change">{Math.abs(player.change)}</div>
      </div>
    </div>
  {/each}
</Listing>

<style lang="scss">
  @import 'src/scss/variables';

  .player-container {
    border-bottom: 1px solid $color-card-headers;
    &:last-child {
      border-bottom: 1px solid $color-muted-text;
    }
  }

  .player {
    font-family: $font-primary-text;
    font-weight: 700;
    display: grid;
    grid-template-columns: 34px 24px 1fr 24px 20px;
    gap: 8px;
    align-items: center;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .rank {
    color: $background-primary;
    background: #ffffff; // fallback
    width: 24px;
    height: 24px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-header-text;
    font-weight: 600;

    &.warning-yellow {
      background: $color-warning-yellow;
    }

    &.info-blue {
      background: $color-info-blue;
    }

    &.success-green {
      background: $color-success-green;
    }
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: $rounding;
  }

  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .score {
    text-align: right;
  }

  .change {
    display: flex;
    justify-content: end;
  }
  .change-icon {
    justify-self: end;
    content: url('/rank-neutral.svg');
    &.up {
      content: url('/rank-up.svg');
    }
    &.down {
      content: url('/rank-down.svg');
    }
  }
</style>
