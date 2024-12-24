<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    if (typeof document !== 'undefined') {
      const countdownDate = new Date('January 15, 2025 00:00:00 UTC').getTime()
      const submitDiv = document.querySelector('.submit') as HTMLElement
      const headerDiv = document.querySelector('.header') as HTMLElement
      const tlDiv = document.querySelector('.tl') as HTMLElement
      const countdownElement = document.getElementById('countdown')

      if (submitDiv) submitDiv.style.display = 'none'

      function updateCountdown() {
        const now = new Date().getTime()
        const timeLeft = countdownDate - now

        if (timeLeft <= 0) {
          if (headerDiv) headerDiv.style.display = 'none'
          if (tlDiv) tlDiv.style.display = 'none'
          if (countdownElement) {
            countdownElement.textContent = 'Voting has closed! Stay tuned for the Awards Show!'
          }
          if (submitDiv) submitDiv.style.display = 'none'
          return
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        const daysText = days > 0 ? `${days} ${days === 1 ? 'day' : 'days'}` : ''
        const hoursText = hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : ''
        const minutesText = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : ''
        const secondsText = seconds > 0 ? `${seconds} ${seconds === 1 ? 'second' : 'seconds'}` : ''

        const displayTime =
          days >= 1
            ? [daysText, hoursText, minutesText].filter(Boolean).join(', ')
            : [hoursText, minutesText, secondsText].filter(Boolean).join(', ')

        if (countdownElement) {
          countdownElement.textContent = displayTime || 'Less than a second remaining'
        }

        if (submitDiv) {
          submitDiv.style.display = timeLeft > 0 ? 'flex' : 'none'
        }
      }

      updateCountdown()

      const countdownInterval = setInterval(() => {
        updateCountdown()
        if (new Date().getTime() > countdownDate) {
          clearInterval(countdownInterval)
        }
      }, 1000)
    }
  })
</script>

<div class="beasties-banner">
  <div class="container">
    <div class="left-side-beasties-banner">
      <img src="/beastie-trophy.png" alt="Beasties Trophy" />
    </div>
    <div class="right-side-beasties-banner">
      <h1>Beasties are Coming</h1>
      <p class="BeastiesTimerContainer" id="BeastiesTimer">
        <span class="header"><h2>Voting is Now Open!</h2></span>
        <span class="tl">Time left to vote: </span><span id="countdown" />
      </p>
      <div class="cta-row">
        <div class="submit">
          <a href="https://mappingawards.saeraphinx.dev/" class="button-link">Vote!</a>
        </div>
        <a href="/the-beastsaber-mapping-awards" rel="external" class="text-link">Learn more</a>
        <span class="separater"> | </span>
        <a
          href="https://fancy-heath-653.notion.site/The-Beasties-10ac696bffca80a79826f47be321b15c"
          class="text-link"
          title="External Japanese Guide">もっと読む</a
        >
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
    padding-right: 20px;
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
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 0.25rem;

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
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
