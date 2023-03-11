<script lang="ts">
  import QuickFilters from '$lib/QuickFilters.svelte'
  import Search from '$lib/Search.svelte'
  import Cards from '$lib/Cards.svelte'
  import Header from '$lib/Header.svelte'
  import Leaderboards from '$lib/Leaderboards.svelte'

  import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
  import { faList } from '@fortawesome/free-solid-svg-icons/faList'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
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

  <Header text="Latest News" icon={faNewspaper} />

  <Header text="Featured Packs" icon={faList} />

  <Header text="Community Events" icon={faCalendarDay} />

  <!-- map of the week section goes here -->

  <Header text="Recently Curated Maps" icon={faAward} />

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

  .leaderboards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 20px;
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
