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
  export let error: string | null = null

  type RankColorType = 'info-blue' | 'warning-yellow' | 'success-green'
  export let rankColor: RankColorType

  function contentFromChange(change: number): string {
    if (change <= -1) return change.toString()
    else if (change >= 1) return `+${change}`
    else return '~'
  }
</script>

<Listing {title} {img} {linkText} {linkUrl}>
  {#if error}
    <div class="leaderboard-error">
      {error}
    </div>
  {:else if players.length}
    {#each players as player (`${player.name}-${player.rank}`)}
      <div class="player-container">
        <div class="player">
          <div class="rank {rankColor}">{player.rank}</div>
          <img class="avatar" src={player.avatar} alt="" />
          <div class="name">{player.name}</div>
          <div class="change" class:up={player.change >= 1} class:down={player.change <= -1}>
            {contentFromChange(player.change)}
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <div class="leaderboard-empty">No players available.</div>
  {/if}
</Listing>

<style lang="scss">
  @import 'src/scss/variables';

  .player-container {
    border-bottom: 1px solid $color-background-tertiary;
    &:last-child {
      border-bottom: 1px solid $color-muted-text;
    }
  }

  .player {
    font-family: $font-primary;
    font-weight: 700;
    display: grid;
    grid-template-columns: 10px 24px auto auto;
    gap: 16px;
    align-items: center;
    padding: 10px 5px;
  }

  .rank {
    color: $color-background-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-header;
    font-weight: 600;

    &.warning-yellow {
      color: $color-warning-yellow;
    }

    &.info-blue {
      color: $color-info-blue;
    }

    &.success-green {
      color: $color-success-green;
    }
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: $rounding-small;
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
    color: $color-muted-text;
    text-align: right;

    &.up {
      color: $color-success-green;
    }
    &.down {
      color: $color-danger-red;
    }
  }

  .leaderboard-error,
  .leaderboard-empty {
    padding: 10px 5px;
    font-family: $font-primary;
    font-weight: 700;
  }

  .leaderboard-error {
    color: $color-danger-red;
  }

  .leaderboard-empty {
    color: $color-muted-text;
  }
</style>
