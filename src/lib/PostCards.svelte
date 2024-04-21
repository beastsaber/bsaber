<script lang="ts">
  import type { Post } from '../types'
  import { postCategories } from '../maps'
  type ValidNumColumns = `${'3' | '4'}`

  export let maxColumns: ValidNumColumns = '4'
  export let posts: Post[]
  export let maxCards: number | undefined = undefined // max amount of cards to show
  export let aspectRatio: number = 1

  let cardsToShow =
    maxCards !== undefined && maxCards >= 0 ? posts.slice(0, Math.round(maxCards)) : posts
  let cardsWithLabel = cardsToShow.map((c) => {
    return { ...c, categoryLabel: postCategories[c.category] }
  })

  const maxColsClass = `max-cols-${maxColumns}`

  function getBackgroundImage(image: string | undefined) {
    if (!image) {
      return 'none'
    }
    return `url(${image}`
  }
</script>

<div class="cards {maxColsClass}" style="--aspect-ratio:{aspectRatio}">
  {#each cardsWithLabel as card}
    <a
      class="card"
      href={`/posts/${card.slug}`}
      style="background-image: {getBackgroundImage(card.image)}"
    >
      <div class="content {maxColsClass}">
        {#if card.section !== undefined}
          <span class="category" title={card.categoryLabel}>{card.categoryLabel}</span>
        {/if}
        <h3 class="title">{card.title ?? ''}</h3>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  @import '../scss/post-cards';

  .category {
    font-size: 0.75rem;
    border-radius: 1.5rem;
    background-color: $color-background-secondary;
    color: white;
    border: 1px solid $color-danger-red;
    padding: 0.125rem 0.5rem;
    margin-bottom: 0.25rem;
    max-width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
