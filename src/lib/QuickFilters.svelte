<script lang="ts">
  import QuickFilter from '$lib/QuickFilter.svelte'

  import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
  import { faListSquares } from '@fortawesome/free-solid-svg-icons/faListSquares'
  import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
</script>

<div class="filters">
  <QuickFilter
    text="Newest Maps"
    icon={faClock}
    color="#e74c3c"
    href="https://beatsaver.com/?ranked=true"
  />
  <QuickFilter
    text="All Ranked"
    icon={faStar}
    color="#f39c12"
    href="https://beatsaver.com/?ranked=true"
  />
  <QuickFilter
    text="All Curated"
    icon={faAward}
    color="#00bc8c"
    href="https://beatsaver.com/?curated=true"
  />
  <QuickFilter text="All Verified" icon={faCheckCircle} color="#3498db" href="#" />
  <QuickFilter
    text="All Playlists"
    icon={faListSquares}
    color="#454088"
    href="https://bsaber.com/category/official-playlists/"
  />
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .filters {
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    grid-auto-rows: minmax(0, auto);
    width: 100%;
    gap: 12px;
    margin-bottom: 12px;
  }

  @media (min-width: 420px) and (max-width: 839px) {
    .filters {
      grid-template-columns: repeat(2, 1fr);
      
      // if odd number of items, last item goes full width
      :global(:last-child:not(:only-child)) { 
        grid-column: 1 / -1;
      }
    }
  }

  @media (min-width: 840px) {
    .filters {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
