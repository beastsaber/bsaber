<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
  import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

  export let currentPage: number
  export let numberOfPages: number
  export let getPageLink: (page: number) => string

  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1)
</script>

<div class="pagination-bar">
  <a
    class="page-button"
    class:hidden-pagination-link-button={currentPage === 1}
    href={getPageLink(currentPage - 1)}>
    <Fa icon={faAngleLeft}/>
  </a>
  {#each pageNumbers as singlePageNumber}
    <a
      rel="external"
      class="page-button"
      class:active={singlePageNumber === currentPage}
      href={getPageLink(singlePageNumber)}
    >
      {singlePageNumber}
    </a>
  {/each}
  <a
    class="page-button"
    class:hidden-pagination-link-button={currentPage === numberOfPages}
    href={getPageLink(currentPage + 1)}>
    <Fa icon={faAngleRight}/>
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
      color: $color-primary-text;
    }
  }

  .page-button.active {
    color: $color-primary-text;
  }

  .hidden-pagination-link-button {
    visibility: hidden;
  }
</style>
