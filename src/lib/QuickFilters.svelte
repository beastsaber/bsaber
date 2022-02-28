<script lang="ts">
  import QuickFilter from '$lib/QuickFilter.svelte'

  import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
  import { faListSquares } from '@fortawesome/free-solid-svg-icons/faListSquares'
</script>

<div class="filters">
  <QuickFilter
    text="ALL RANKED"
    icon={faStar}
    color="#f39c12"
    href="https://beatsaver.com/?ranked=true"
  />
  <QuickFilter
    text="ALL CURATED"
    icon={faAward}
    color="#00bc8c"
    href="https://beatsaver.com/?curated=true"
  />
  <QuickFilter text="ALL VERIFIED" icon={faCheckCircle} color="#3498db" href="#" />
  <QuickFilter
    text="ALL PLAYLISTS"
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
    width: 50%;
    gap: 12px;
    margin-bottom: 12px;
  }

  @media (min-width: 420px) {
    .filters {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 840px) {
    .filters {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
