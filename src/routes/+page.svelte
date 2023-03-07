<script lang="ts">
  import QuickFilters from '$lib/QuickFilters.svelte'
  import Search from '$lib/Search.svelte'
  import Cards from '$lib/Cards.svelte'
  import Listing from '$lib/Listing.svelte'
  import ListingsHeader from '$lib/ListingsHeader.svelte'
  import Leaderboards from '$lib/Leaderboards.svelte'

  import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn'
  import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'
  import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
  import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'

  export let data
  let cards = data.cards
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
  </div>
  <div class="header">
    <ListingsHeader icon={faChartLine} text="Global Leaderboard Rankings" linkUrl="google.ca" linkText="View all leaderboards"/>
  </div>
  <div class="listings">
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

  .header {
    padding: 1rem 0;
  }

  .listings {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 12px;

    &+.listings {
      margin-top: 20px;
    }
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
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
