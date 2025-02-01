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

<div class="page-header">
  <h1>Community Events</h1>
</div>
<hr class="fade" />
<p>
  Want to have your Beat Saber event listed here? <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSdmrDu-KHqk2mvwhiJXZ8isnfa1rnoG1A-o2aEVTRaE0YoR_g/viewform"
    >Fill out this form!</a
  >
</p>
<br />
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

  .page-header h1 {
    text-align: left;
  }
  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
  }
</style>
