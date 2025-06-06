<script lang="ts">
  import Fa from 'svelte-fa'
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
  {#each pageNumbers as singlePageNumber (singlePageNumber)}
    <a
      class="page-button"
      class:active={singlePageNumber === currentPage}
      href={getPageLink(singlePageNumber)}
      rel={forceExternal ? 'external' : undefined}
    >
      {singlePageNumber}
    </a>
    {#if forceExternal}
      <!-- 
        Solves issue #133.
        Adding an invisible link to ensure the pages are all crawled - anchors with rel="external" are not crawled 
        Ideally you'd want to try to avoid using force external, but in case of community events no other working solution was found
      -->
      <a style="display: none" href={getPageLink(singlePageNumber)}>
        {singlePageNumber}
      </a>
    {/if}
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
