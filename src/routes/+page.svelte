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

  import type { RootPageSSRData } from '../types'
  import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
  import EventCards from '$lib/EventCards.svelte'

  export let data: RootPageSSRData

  let { announcements, currentMapOfTheWeek, articles, events } = data
  let announcement = data.announcements?.length > 0 ? announcements[0] : undefined
  const maxNewsCards = 3
  const maxFeaturedPackCards = 4
  const maxCommunityEventsCards = 6

  // These are sample events to use for dev until the event storage/retrieval workflow is sorted out
  const communityEvents = [
    {
      title: 'Awesome Tournament Title',
      category: 'tournament' as const,
      slug: 'test-event-1',
      publishDateISO: '2023-05-21T19:23:25Z',
      hostUsername: 'BeatKhana',
      dateParams: {
        startDateUTC: '2023-11-15',
        endDateUTC: '2023-11-17',
      },
    },
    {
      title: 'Squatty Party Fitness Map Stream',
      category: 'social' as const,
      slug: 'test-event-2',
      publishDateISO: '2023-05-21T19:23:25Z',
      hostUsername: 'BeatKhana',
      dateParams: {
        startDateUTC: '2023-11-15',
        startTimeUTC: '18:00:00',
      },
    },
    {
      title: 'Beginner Mapping Tutorial Stream',
      category: 'learning' as const,
      slug: 'test-event-3',
      publishDateISO: '2023-05-21T19:23:25Z',
      hostUsername: 'Beat Saber Mapping',
      dateParams: {
        startDateUTC: '2023-11-15',
        endTimeUTC: '10:00:00',
      },
    },
    {
      title: 'Diamonds in the Rought, Vol. 5',
      category: 'generic' as const,
      slug: 'test-event-4',
      publishDateISO: '2023-05-21T19:23:25Z',
      hostUsername: 'Beat Saber Mapping',
      dateParams: {
        startDateUTC: '2023-06-01',
        endDateUTC: '2023-08-04',
      },
    },
    {
      title: 'BSMG Halloween Contest',
      category: 'competition' as const,
      slug: 'test-event-5',
      publishDateISO: '2023-05-21T19:23:25Z',
      hostUsername: 'Beat Saber Modding Group',
      dateParams: {
        startDateUTC: '2023-10-01',
        endDateUTC: '2023-10-31',
      },
    },
    {
      title: 'BeastSaber Mapping Awards Finalist Drop',
      category: 'competition' as const,
      slug: 'test-event-6',
      publishDateISO: '2023-05-21T19:23:25Z',
      hostUsername: 'BeastSaber',
      dateParams: {
        startDateUTC: '2023-12-31',
        endTimeUTC: '21:00:00',
      },
    },
  ]
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

  {#if currentMapOfTheWeek != undefined}
    <MapOfTheWeekSection showHeader={true} mapOfTheWeek={currentMapOfTheWeek} />
  {/if}

  <Header
    text="Featured Packs"
    icon={faRectangleList}
    linkUrl={`${
      import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'
    }/playlists?curated=true`}
    linkText="See all curated packs"
  />
  <PlaylistCards maxCards={maxFeaturedPackCards} />

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
  <MapCards sortOrder="CURATED" />

  <Header
    text="Recent Maps by Verified Mappers"
    icon={faCircleCheck}
    linkUrl={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/?verified=true`}
    linkText="See all maps by verified mappers"
  />
  <MapCards verified={true} />

  {#if import.meta.env.VITE_HIDE_EVENTS !== 'true'}
    <Header
      text="Community Events"
      icon={faCalendarDay}
      linkUrl="#"
      linkText="See all community events"
    />
    <EventCards events={communityEvents} maxCards={maxCommunityEventsCards} />
  {/if}

  <Header icon={faChartLine} text="Global Ranking Leaderboards" />
  <div class="leaderboards">
    <Leaderboards />
  </div>
</section>

<style lang="scss">
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
</style>
