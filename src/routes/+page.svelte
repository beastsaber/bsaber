<script lang="ts">
  import type { OrganizedPosts, Post } from 'src/types'
  import AnnouncementHeader from '$lib/AnnouncementHeader.svelte'

  import QuickFilters from '$lib/QuickFilters.svelte'
  import Search from '$lib/Search.svelte'
  import PostCards from '$lib/PostCards.svelte'
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
    communityEvents: [],
    mapsOfTheWeek: [],
    others: [],
  }

  let { announcements, communityEvents, mapsOfTheWeek, musicPacks, news } = data
  let announcement = data.announcements?.length > 0 ? announcements[0] : undefined
  const maxNewsCards = 3
  const maxFeaturedPackCards = 4
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

  <Header text="Community Events" icon={faCalendarDay} />
  <PostCards posts={communityEvents} maxColumns="4" maxCards={maxFeaturedPackCards} />

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
