<script lang="ts">
  export let currentPage: number
  export let numberOfPages: number
  export let getPageLink: (page: number) => string

  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1)
</script>

<div class="pagination-bar">
  {#each pageNumbers as singlePageNumber}
    <button
      class="page-button"
      class:active={singlePageNumber === currentPage}
      on:click={() => {
        // Not great, but behaves the best I'm afraid - using an a-element with href doesn't update the page
        // nor indicate loading
        window.location.href = getPageLink(singlePageNumber)
      }}
    >
      {singlePageNumber}
    </button>
    <!-- These are used so the build process can parse that it exists -->
    <a class="hidden-pagination-link-button" href={getPageLink(singlePageNumber)}>{singlePageNumber}</a>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .pagination-bar {
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .page-button {
    display: inline-block;
    margin: 0 0.5rem;
    padding: 0.2rem 0.5rem;
    min-width: 0.8rem;
    text-align: center;
    border: 1px solid $color-muted-text;
    border-radius: $card-border-radius;
    background-color: $background-secondary;
    color: $color-muted-text;
    cursor: pointer;
  }

  .page-button.active {
    border: 1px solid $color-primary-text;
    background-color: $background-tertiary;
    color: $color-primary-text;
  }

  .hidden-pagination-link-button {
    display: none;
  }
</style>
