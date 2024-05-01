<script lang="ts">
  import type { CommunityEventsPagePaginatedSSRData } from './+page.server'
  import PaginationBar from '$lib/PaginationBar.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
  import EventCards from '$lib/EventCards.svelte'
  import { isCurrentEvent } from '$lib/isCurrentEvent'

  export let data: CommunityEventsPagePaginatedSSRData
  const currentEvents = data.communityEvents.filter(isCurrentEvent).reverse()
  const passedEvents = data.communityEvents.filter((x) => !isCurrentEvent(x))

  const resortedCommunityEvents = [...currentEvents, ...passedEvents]
  const getPageLink = (page: number) => `/community-events/${page}`
</script>

<MetaHead
  title="Community Events"
  description="See a listing of highlighted events from across the Beat Saber community including tournaments, training sessions, social events, contests, and more!"
/>

<h1 class="page-header">Community Events</h1>
<EventCards
  events={resortedCommunityEvents}
  maxCards={data.pageSize}
  keyPrefix={'page-' + data.currentPage}
/>

<div class="pagination-bar-container">
  <PaginationBar
    currentPage={data.currentPage}
    numberOfPages={data.pageCount}
    forceExternal={true}
    {getPageLink}
  />
</div>

<style>
  .pagination-bar-container {
    margin-top: 1.3rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }
</style>
