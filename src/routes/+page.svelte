<script lang="ts">
  import AnnouncementHeader from '$lib/AnnouncementHeader.svelte'

  import QuickFilters from '$lib/QuickFilters.svelte'
  import Search from '$lib/Search.svelte'
  import PostCards from '$lib/PostCards.svelte'
  import Header from '$lib/Header.svelte'
  import Leaderboards from '$lib/Leaderboards.svelte'
  import PlaylistCards from '$lib/PlaylistCards.svelte'
  import MapCards from '$lib/MapCards.svelte'

  import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
  import { faRectangleList } from '@fortawesome/free-solid-svg-icons/faRectangleList'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
  import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
  import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

  import type { RootPageSSRData } from './+page.server.ts'
  import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
  import EventCards from '$lib/EventCards.svelte'
  import { isCurrentEvent } from '$lib/isCurrentEvent'

  export let data: RootPageSSRData

  let {
    announcements,
    currentMapOfTheWeek,
    articles,
    communityEvents,
    featuredPlaylistOverwriteMap,
  } = data
  let announcement = data.announcements?.length > 0 ? announcements[0] : undefined

  const currentEvents = communityEvents.filter(isCurrentEvent).reverse()
  const maxNewsCards = 3
  const maxFeaturedPackCards = 4
  const maxCommunityEventsCards = 6

  if (typeof document !== 'undefined') {
    const countdownDate = new Date('December 15, 2024 00:00:00 UTC').getTime()
    const countdownFunction = setInterval(function () {
      const now = new Date().getTime()
      const timeLeft = countdownDate - now
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
      const daysText = days > 0 ? `${days}&nbsp;${days === 1 ? 'day' : 'days'}` : ''
      const hoursText = hours > 0 ? `${hours}&nbsp;${hours === 1 ? 'hour' : 'hours'}` : ''
      const minutesText =
        minutes > 0 ? `${minutes}&nbsp;${minutes === 1 ? 'minute' : 'minutes'}` : ''
      const secondsText =
        seconds > 0 ? `${seconds}&nbsp;${seconds === 1 ? 'second' : 'seconds'}` : ''

      let displayTime
      if (days >= 1) {
        displayTime = [daysText, hoursText, minutesText].filter(Boolean).join(', ')
      } else {
        displayTime = [hoursText, minutesText, secondsText].filter(Boolean).join(', ')
      }

      const countdownElement = document.getElementById('countdown')
      if (countdownElement) {
        countdownElement.innerHTML = displayTime || 'Less than a second remaining'
      }

      if (timeLeft < 0) {
        clearInterval(countdownFunction)
        const countdownElement = document.getElementById('countdown')
        if (countdownElement) {
          countdownElement.innerHTML = 'Submissions Closed! Stay tuned for voting!'
        }
        const submitDiv = document.querySelector('.submit')
        if (submitDiv) {
          ;(submitDiv as HTMLElement).style.display = 'none'
        }
      }
    }, 1000)
  }
</script>

<MetaHead />

<section>
  {#if announcement}
    <div class="announcement">
      <AnnouncementHeader {announcement} />
    </div>
  {/if}

  <QuickFilters />
  <!-- Search to be moved to Navbar later -->
  <Search />

  <div class="beasties-banner">
    <div class="left-side-beasties-banner">
      <img src="/beastie-trophy.png" alt="Beasties Trophy" />
    </div>
    <div class="right-side-beasties-banner">
      <h1>Beasties are Coming</h1>
      <p class="BeastiesTimerContainer" id="BeastiesTimer">
        <span>Submissions Closed! Stay tuned for voting!</span>
      </p>
      <div class="cta-row">
        <!-- Temporarily setting display to none until voting opens -->
        <div class="submit" style="display: none;">
          <a href="https://mappingawards.saeraphinx.dev/" class="button-link">Submit Maps</a>
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

  {#if currentMapOfTheWeek != undefined}
    <MapOfTheWeekSection showHeader={true} mapOfTheWeek={currentMapOfTheWeek} />
  {/if}

  <Header
    text="Featured Packs"
    icon={faRectangleList}
    linkUrl={'/playlists/page/1'}
    linkText="See all featured packs"
  />
  <PlaylistCards maxCards={maxFeaturedPackCards} overwriteMap={featuredPlaylistOverwriteMap} />

  <Header
    text="Latest Articles"
    icon={faNewspaper}
    linkUrl="/posts/page/1"
    linkText="See all posts"
  />
  <PostCards posts={articles} maxColumns="3" maxCards={maxNewsCards} aspectRatio={21 / 16} />

  <Header
    text="Recently Curated Maps"
    icon={faAward}
    linkUrl={`${
      import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'
    }/?order=Curated&curated=true`}
    linkText="See all curated maps"
  />
  <MapCards sortOrder="Curated" loadMoreEnabled={true} />

  <Header
    text="Recent Maps by Verified Mappers"
    icon={faCircleCheck}
    linkUrl={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/?verified=true`}
    linkText="See all maps by verified mappers"
  />
  <MapCards verified={true} loadMoreEnabled={true} />

  <Header
    text="Community Events"
    icon={faCalendarDay}
    linkUrl="/community-events/1"
    linkText="See all events"
  />
  <EventCards events={currentEvents} maxCards={maxCommunityEventsCards} />

  <Header icon={faChartLine} text="Global Ranking Leaderboards" />
  <div class="leaderboards">
    <Leaderboards />
  </div>
</section>

<style lang="scss">
  @import 'src/scss/variables';

  .motw-beasties {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
  }
  .motw {
    flex: 1;
    height: auto;
    min-width: 68%;
  }

  hr {
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    background-color: #707070;
  }

  .announcement {
    margin-bottom: 1.5rem;
  }

  .leaderboards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 20px;
  }

  @media (min-width: 768px) {
    .leaderboards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .leaderboards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .beasties-banner {
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding-top: 10px;

    h1 {
      font-size: 2.5rem;
    }

    @media (max-width: 556px) {
      h1 {
        font-size: 1.5rem;
      }
    }
  }

  .BeastiesTimerContainer {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .separater {
    @media (max-width: 452px) {
      display: none;
    }
  }

  .left-side-beasties-banner {
    display: flex;
    align-items: center;
    padding-right: 1rem;
    img {
      height: 9rem;
    }
  }

  .right-side-beasties-banner {
    width: 575px;
    height: max-content;
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
    margin-top: 0.5rem;

    .button-link {
      gap: 1rem;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      background-color: $color-accent;
      color: var(--button-primary-text);
      border-radius: $rounding-small;
      text-decoration: none;
      transition: background-color 0.2s;
      &:hover {
        background-color: var(--button-primary-hover);
      }
    }
    .button-link:hover {
      background-color: $color-background-primary;
    }
  }
</style>
