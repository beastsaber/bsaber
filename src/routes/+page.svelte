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
      <p>What maps deserve to win in this year's Beasties? Submit maps now!</p>
      <div class="cta-row">
        <a href="https://mappingawards.saeraphinx.dev/" class="button-link">Submit Maps</a>
        <a href="/the-beastsaber-mapping-awards" rel="external" class="text-link">Learn more</a> |
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
  <MapCards sortOrder="CURATED" loadMoreEnabled={true} />

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
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;

    h1 {
      font-size: 2.5rem;
    }

    @media (max-width: 556px) {
      h1 {
        font-size: 1.5rem;
      }
    }
  }

  .left-side-beasties-banner {
    display: flex;
    align-items: center;
    padding-right: 1rem;
    img {
      height: 9rem;
    }

    .right-side-beasties-banner {
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
  }
  .cta-row {
    display: flex;
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
  }
</style>
