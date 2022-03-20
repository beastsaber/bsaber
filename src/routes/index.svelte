<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import QuickFilters from '$lib/QuickFilters.svelte'
  import Search from '$lib/Search.svelte'
  import Cards from '$lib/Cards.svelte'
  import Listing from '$lib/Listing.svelte'
  import Leaderboards from '$lib/Leaderboards.svelte'

  import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn'
  import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'

  export let cards
</script>

<svelte:head>
  <title>BeastSaber</title>
</svelte:head>

<section>
  <div class="filters-search">
    <QuickFilters />
    <Search />
  </div>
  <Cards {cards} />
  <hr />
  <div class="listings">
    <Listing title="Latest News" icon={faBullhorn} />
    <Listing title="Featured Videos" icon={faYoutube} />
    <Listing title="Upcoming Events" icon={faCalendarDay} />
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

  .listings {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 12px;
  }

  .filters-search {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 12px;
  }

  @media (max-width: 740px) {
    .filters-search {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (min-width: 678px) {
    .listings {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1356px) {
    .listings {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
