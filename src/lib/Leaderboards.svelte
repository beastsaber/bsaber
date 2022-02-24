<script lang="ts">
  import Listing from '$lib/Listing.svelte'

  let players = []

  getPlayers()

  async function getPlayers() {
    let response = await fetch('https://scoresaber.com/api/players')
    let json = await response.json()
    players = json.players
    players.length = 10
    players = players.map(function (player) {
      player.weeklyChange = weeklyChange(player.histories)
      return player
    })
  }

  function weeklyChange(histories) {
    let changes = histories.split(',')
    let lastWeek
    if (changes.length >= 7) {
      lastWeek = Number(changes[changes.length - 7])
    } else {
      lastWeek = Number(changes[0])
    }

    if (lastWeek != 999999) {
      return lastWeek - Number(changes[changes.length - 1])
    }
  }
</script>

<Listing title="ScoreSaber Leaderboards" img="/static/scoresaber-logo.svg">
  {#each players as player, index}
    {#if index > 0}
      <hr />
    {/if}
    <div class="player">
      <div class="rank">#{player.rank}</div>
      <img class="avatar" src={player.profilePicture} alt="" />
      <div class="name">{player.name}</div>
      <div class="score">{player.pp.toPrecision(7).toLocaleString()}pp</div>
      <div
        class="change"
        class:up={player.weeklyChange >= 1}
        class:down={player.weeklyChange <= -1}
      >
        {player.weeklyChange >= 1 ? '+' : ''}{player.weeklyChange}
      </div>
    </div>
  {/each}
</Listing>

<style>
  hr {
    height: 1px;
    margin-left: -12px;
    margin-right: -12px;
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
