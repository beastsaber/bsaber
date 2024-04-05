<script lang="ts">
  import QuickFilter from '$lib/QuickFilter.svelte'

  import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
  import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'

  const squareListIcon = '/square-list.svg'
</script>

<div class="filters">
  <QuickFilter
    text="Newest Maps"
    icon={faClock}
    type="newest"
    href="https://beatsaver.com/?order=Latest"
  />
  <QuickFilter
    text="All Ranked"
    icon={faStar}
    type="ranked"
    href="https://beatsaver.com/?ranked=true"
  />
  <QuickFilter
    text="All Curated"
    icon={faAward}
    type="curated"
    href="https://beatsaver.com/?order=Curated&curated=true"
  />
  <QuickFilter
    text="All Verified"
    icon={faCheckCircle}
    type="verified"
    href="https://beatsaver.com/?verified=true"
  />
  <QuickFilter
    text="All Playlists"
    iconPath={squareListIcon}
    type="playlists"
    href="https://beatsaver.com/playlists?order=Curated&curated=true"
  />
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .filters {
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    grid-auto-rows: minmax(0, auto);
    width: 100%;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
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
