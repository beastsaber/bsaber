<script lang="ts">
  import type { OrganizedPosts, CommunityEvent } from '../../src/types'
  import AnnouncementHeader from '$lib/AnnouncementHeader.svelte'

  import QuickFilters from '$lib/QuickFilters.svelte'
  import Search from '$lib/Search.svelte'
  import PostCards from '$lib/PostCards.svelte'
  import EventCards from '$lib/EventCards.svelte'
  import Header from '$lib/Header.svelte'
  import Leaderboards from '$lib/Leaderboards.svelte'

  import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
  import { faRectangleList } from '@fortawesome/free-solid-svg-icons/faRectangleList'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
  import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'

  export let data: OrganizedPosts = {
    announcements: [],
    news: [],
    musicPacks: [],
    mapsOfTheWeek: [],
    others: [],
  }

  let { announcements, mapsOfTheWeek, musicPacks, news } = data
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

<svelte:head>
  <title>BeastSaber</title>
</svelte:head>

<section>
  {#if announcement}
    <div class="announcement">
      <AnnouncementHeader {announcement} />
    </div>
  {/if}
  <QuickFilters />
  <hr />
  <!-- Search to be moved to Navbar later -->
  <Search />
  <hr />

  <Header text="Latest News" icon={faNewspaper} />
  <PostCards posts={news} maxColumns="3" maxCards={maxNewsCards} aspectRatio={21 / 16} />

  <Header
    text="Featured Packs"
    icon={faRectangleList}
    linkUrl="/posts"
    linkText="See all curated packs"
  />
  <PostCards posts={musicPacks} maxColumns="4" maxCards={maxFeaturedPackCards} />

  <Header
    text="Community Events"
    icon={faCalendarDay}
    linkUrl="/community-events"
    linkText="See all community events"
  />
  <EventCards events={communityEvents} maxCards={maxCommunityEventsCards} />

  <Header text="Map of the Week" icon={faCalendarDay} />
  <!-- new component goes here -->

  <Header text="Recently Curated Maps" icon={faAward} />
  <!-- new component goes here -->

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
    margin-bottom: 20px;
  }

  .leaderboards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 20px;
  }

  @media (min-width: 678px) {
    .leaderboards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1356px) {
    .leaderboards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
