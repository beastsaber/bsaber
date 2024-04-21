<script lang="ts">
  import { onMount } from 'svelte'
  import Leaderboard from '$lib/Leaderboard.svelte'

  let players = {
    scoresaber: [],
    beatleader: [],
    accsaber: [],
  }

  onMount(async () => {
    await getPlayers()
  })

  async function getPlayers() {
    let response = await fetch(
      `${import.meta.env.VITE_BSABER_API_BASE || 'https://api.bsaber.com'}/api/players/top`,
    )
    let json = await response.json()
    players = json
  }
</script>

<Leaderboard
  title="ScoreSaber"
  img="/scoresaber-logo.svg"
  rankColor="warning-yellow"
  linkText="See full rankings"
  linkUrl="https://scoresaber.com/rankings"
  players={players.scoresaber}
/>

<Leaderboard
  title="BeatLeader"
  img="/beatleader-logo.svg"
  rankColor="info-blue"
  linkText="See full rankings"
  linkUrl="https://www.beatleader.xyz/ranking/1"
  players={players.beatleader}
/>

<Leaderboard
  title="AccSaber"
  img="/accsaber-logo.svg"
  rankColor="success-green"
  linkText="See full rankings"
  linkUrl="https://accsaber.com/leaderboards/overall"
  players={players.accsaber}
/>
