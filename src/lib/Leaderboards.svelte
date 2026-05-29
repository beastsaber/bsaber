<script lang="ts">
  import { onMount } from 'svelte'
  import Leaderboard from '$lib/Leaderboard.svelte'

  type Player = {
    name: string
    rank: number
    avatar: string
    change: number
  }

  type Players = {
    scoresaber: Player[]
    beatleader: Player[]
    accsaber: Player[]
  }

  type LeaderboardErrors = {
    scoresaber: string | null
    beatleader: string | null
    accsaber: string | null
  }

  let players: Players = {
    scoresaber: [],
    beatleader: [],
    accsaber: [],
  }

  let errors: LeaderboardErrors = {
    scoresaber: null,
    beatleader: null,
    accsaber: null,
  }

  let loadError = ''

  onMount(async () => {
    await getPlayers()
  })

  async function getPlayers() {
    loadError = ''

    try {
      let response = await fetch(
        `${import.meta.env.VITE_BSABER_API_BASE || 'https://api.bsaber.com'}/api/players/top`,
      )
      let json = await response.json()

      if (json.error) {
        loadError = json.message ?? 'Unable to load leaderboards.'

        errors = {
          scoresaber: 'ScoreSaber failed to load.',
          beatleader: 'BeatLeader failed to load.',
          accsaber: 'AccSaber failed to load.',
        }

        return
      }

      players = {
        scoresaber: Array.isArray(json.scoresaber) ? json.scoresaber : [],
        beatleader: Array.isArray(json.beatleader) ? json.beatleader : [],
        accsaber: Array.isArray(json.accsaber) ? json.accsaber : [],
      }

      errors = {
        scoresaber: json.errors?.scoresaber ?? null,
        beatleader: json.errors?.beatleader ?? null,
        accsaber: json.errors?.accsaber ?? null,
      }

      if (!response.ok && !json.scoresaber && !json.beatleader && !json.accsaber) {
        loadError = json.message ?? 'Unable to load leaderboards.'
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard players:', error)

      loadError = 'Unable to load leaderboards.'

      errors = {
        scoresaber: 'ScoreSaber failed to load.',
        beatleader: 'BeatLeader failed to load.',
        accsaber: 'AccSaber failed to load.',
      }
    }
  }
</script>

<Leaderboard
  title="ScoreSaber"
  img="/scoresaber-logo.svg"
  rankColor="warning-yellow"
  linkText="See full rankings"
  linkUrl="https://scoresaber.com/rankings"
  players={players.scoresaber}
  error={errors.scoresaber}
/>

<Leaderboard
  title="BeatLeader"
  img="/beatleader-logo.svg"
  rankColor="info-blue"
  linkText="See full rankings"
  linkUrl="https://www.beatleader.com/ranking/1"
  players={players.beatleader}
  error={errors.beatleader}
/>

<Leaderboard
  title="AccSaber"
  img="/accsaber-logo.svg"
  rankColor="success-green"
  linkText="See full rankings"
  linkUrl="https://accsaber.com/leaderboards/overall"
  players={players.accsaber}
  error={errors.accsaber}
/>
