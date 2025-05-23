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

  interface Props {
    data: RootPageSSRData
  }

  let { data }: Props = $props()

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

  {#if currentMapOfTheWeek != undefined}
    <MapOfTheWeekSection showHeader={true} mapOfTheWeek={currentMapOfTheWeek} />
  {/if}

  <Header
    text="Featured Packs"
    icon={faRectangleList}
    linkUrl="/playlists/page/1"
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
