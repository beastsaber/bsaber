<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
  import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

  export let currentPage: number
  export let numberOfPages: number
  export let forceExternal = false
  export let getPageLink: (page: number) => string

  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1)
</script>

<div class="pagination-bar">
  <a
    class="page-button"
    class:hidden-pagination-link-button={currentPage === 1}
    href={currentPage === 1 ? '#' : getPageLink(currentPage - 1)}
    rel={forceExternal ? 'external' : undefined}
  >
    <Fa icon={faAngleLeft} />
  </a>
  {#each pageNumbers as singlePageNumber}
    <a
      class="page-button"
      class:active={singlePageNumber === currentPage}
      href={getPageLink(singlePageNumber)}
      rel={forceExternal ? 'external' : undefined}
    >
      {singlePageNumber}
    </a>
  {/each}
  <a
    class="page-button"
    class:hidden-pagination-link-button={currentPage === numberOfPages}
    href={currentPage === numberOfPages ? '#' : getPageLink(currentPage + 1)}
    rel={forceExternal ? 'external' : undefined}
  >
    <Fa icon={faAngleRight} />
  </a>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .pagination-bar {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .page-button {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    min-width: 0.8rem;
    text-align: center;
    color: $color-muted-text;
    cursor: pointer;

    &:hover {
      color: $color-text-primary;
    }
  }

  .page-button.active {
    color: $color-text-primary;
  }

  .hidden-pagination-link-button {
    visibility: hidden;
  }
</style>
