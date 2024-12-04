<script lang="ts">
  import type { Post } from '../types'
  import { processPosts, getBackgroundImage } from './postUtils'
  import Fa from 'svelte-fa/src/fa.svelte'

  export let maxColumns: `${'3' | '4'}` = '4'
  export let posts: Post[]
  export let maxCards: number | undefined = undefined
  export let aspectRatio: number = 1

  const maxColsClass = `max-cols-${maxColumns}`
  const cardsToShow =
    maxCards !== undefined && maxCards >= 0 ? posts.slice(0, Math.round(maxCards)) : posts
  const cardsWithLabel = processPosts(cardsToShow)
</script>

<div class="cards {maxColsClass}" style="--aspect-ratio:{aspectRatio}">
  {#each cardsWithLabel as card}
    <a
      class="card"
      href={`/posts/${card.slug}`}
      style="background-image: {getBackgroundImage(card.image)}"
    >
      <div class="content {maxColsClass}">
        <div class="tags">
          {#if card.categoryLabel}
            <span class="category">{card.categoryLabel}</span>
          {/if}
          {#if card.postTypeLabel}
            <span class="post-event-type">
              <Fa icon={card.faIcon} />
              &nbsp;{card.postTypeLabel}
            </span>
          {/if}
        </div>
        <h3 class="title">{card.title ?? ''}</h3>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  @import '../scss/post-cards';

  .tags {
    display: inline;
    gap: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .category,
  .post-event-type {
    font-size: 0.75rem;
    border-radius: 1.5rem;
    background-color: $color-background-secondary;
    color: white;
    padding: 0.125rem 0.5rem;
    margin-bottom: 0.25rem;
    max-width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .category {
    border: 1px solid $color-danger-red;
  }
  .post-event-type {
    border: 1px solid $color-warning-yellow;
  }
</style>
