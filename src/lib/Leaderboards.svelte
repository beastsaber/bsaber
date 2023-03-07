<script lang="ts">
	import { onMount } from 'svelte'
  import Leaderboard from '$lib/Leaderboard.svelte'

  let players = {
    scoresaber: [],
    beatleader: [],
    accsaber: [],
  };

  onMount(async () => {
    await getPlayers();
	});

  async function getPlayers() {
    let response = await fetch(
      `${import.meta.env.VITE_BSABER_API_BASE || 'https://api.bsaber.com'}/top-players`,
    )
    let json = await response.json()
    players = json;
  }
</script>

<Leaderboard
  title="ScoreSaber Leaderboards"
  img="/scoresaber-logo.svg"
  players={players.scoresaber}
/>

<Leaderboard
  title="AccSaber Leaderboards"
  img="/accsaber-logo.svg"
  players={players.accsaber}
/>

<Leaderboard 
  title="BeatLeader Leaderboards"
  img="/beatleader-logo.svg"
  players={players.beatleader}
/>