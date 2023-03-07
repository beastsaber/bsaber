<script lang="ts">
  import Listing from '$lib/Listing.svelte'

  export let img: string
  export let title: string
  export let players: Array<{
    name: string
    rank: number
    avatar: String
    score: number
    change: number
  }>
</script>

<Listing title={title} img={img}>
  {#each players as player, index}
    {#if index > 0}
      <hr />
    {/if}
    <div class="player">
      <div class="rank">#{player.rank}</div>
      <img class="avatar" src={player.avatar} alt="" />
      <div class="name">{player.name}</div>
      <div class="score">
        {player.score.toLocaleString(undefined, { minimumFractionDigits: 2 })}pp
      </div>
      <div class="change" class:up={player.change >= 1} class:down={player.change <= -1}>
        {player.change >= 1 ? '+' : ''}{player.change}
      </div>
    </div>
  {/each}
</Listing>

<style lang="scss">
  hr {
    height: 1px;
    margin: 8px -12px;
    border: none;
    background-color: #444;
  }

  .player {
    display: grid;
    grid-template-columns: 28px 16px 1fr 88px 40px;
    gap: 8px;
    align-items: center;
  }

  .rank {
  }

  .avatar {
    width: 16px;
    height: 16px;
    border-radius: 100%;
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

  .up {
    color: #00bc8c;
  }

  .down {
    color: #e74c3c;
  }

  .change {
    text-align: right;
  }
</style>
