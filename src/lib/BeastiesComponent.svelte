<script lang="ts">
  import { onMount } from 'svelte'

  let countdownText = 'Calculating...'
  let submitVisible = false
  let headerVisible = true
  let tlVisible = true
  let countdownDate: number

  function formatTime(days: number, hours: number, minutes: number, seconds: number): string {
    const daysText = days > 0 ? `${days}\u00A0${days === 1 ? 'day' : 'days'}` : ''
    const hoursText = hours > 0 ? `${hours}\u00A0${hours === 1 ? 'hour' : 'hours'}` : ''
    const minutesText = minutes > 0 ? `${minutes}\u00A0${minutes === 1 ? 'minute' : 'minutes'}` : ''
    const secondsText = seconds > 0 ? `${seconds}\u00A0${seconds === 1 ? 'second' : 'seconds'}` : ''
    return [daysText, hoursText, minutesText, secondsText].filter(Boolean).join(', ')
  }

  function updateCountdown() {
    const now = new Date().getTime()
    const timeLeft = countdownDate - now

    if (timeLeft <= 0) {
      countdownText = "Thank you for being there! We'll see you next year!"
      submitVisible = false
      headerVisible = false
      tlVisible = false
      return
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    countdownText =
      days >= 1 ? formatTime(days, hours, minutes, 0) : formatTime(0, hours, minutes, seconds)

    submitVisible = timeLeft > 0
    headerVisible = true
    tlVisible = true
  }

  onMount(() => {
    countdownDate = new Date('January 15, 2024 00:00:00 UTC').getTime()
    updateCountdown()

    const countdownInterval = setInterval(() => {
      updateCountdown()
      if (new Date().getTime() > countdownDate) {
        clearInterval(countdownInterval)
      }
    }, 1000)

    return () => clearInterval(countdownInterval)
  })
</script>

<div class="beasties-banner">
  <div class="container">
    <div class="left-side-beasties-banner">
      <img src="/beastie-trophy.png" alt="Beasties Trophy" />
    </div>
    <div class="right-side-beasties-banner">
      <h1>The 2024 Beasties</h1>
      <p class="BeastiesTimerContainer" id="BeastiesTimer">
        <span id="countdown">{countdownText}</span>
      </p>
      <div class="cta-row">
        <div class="submit {submitVisible ? '' : 'hidden'}">
          <a href="https://mappingawards.saeraphinx.dev/" class="button-link">Vote!</a>
        </div>
        <a href="/posts/the-beasties-2024-winners" class="text-link">2024 Winners</a>
        <span class="separater"> | </span>
        <a href="https://youtu.be/u7CJoYyRVWg" class="text-link">Watch the premiere</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .beasties-banner {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: -1rem;
    margin-top: 1.5rem;
    box-shadow: 0px 3px 3px black;

    h1 {
      font-size: 2.5rem;
    }

    @media (max-width: 556px) {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
  .beasties-banner::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('/beasties-banner-bg.png') no-repeat center;
    background-size: cover;
    filter: brightness(50%) blur(5px);
    z-index: -1;
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 0;
    @media (max-width: 486px) {
      padding: 1rem 0.5rem;
    }
  }

  .BeastiesTimerContainer {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .header {
    color: #e95d4e;
  }

  .left-side-beasties-banner {
    display: flex;
    align-items: center;
    img {
      height: 10rem;
    }
    @media (max-width: 486px) {
      display: none;
    }
  }

  .right-side-beasties-banner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 470px;
    @media (max-width: 486px) {
      min-width: unset;
    }
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 0.5rem;

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .submit.hidden {
      display: none;
    }

    .button-link {
      gap: 1rem;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      background-color: #b73425;
      border-radius: $rounding-small;
      text-decoration: none;
      transition: background-color 0.3s;
      &:hover {
        background-color: #792117;
      }
    }
    a {
      color: white;
      font-weight: bold;
    }
  }
</style>
