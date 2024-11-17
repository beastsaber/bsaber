<script lang="ts">
  import type { Post } from '../types'
  import { postCategories } from '../maps'
  import { postEventTypes } from '../maps'
  import Fa from 'svelte-fa/src/fa.svelte'
  import {
    faTrophy,
    faGraduationCap,
    faComments,
    faAward,
    faHeart,
    faTree,
  } from '@fortawesome/free-solid-svg-icons'

  type PostEventType = 'tournament' | 'learning' | 'social' | 'awards' | 'charity' | 'seasonal'
  type ValidNumColumns = `${'3' | '4'}`

  export const FaIcons = {
    tournament: faTrophy,
    learning: faGraduationCap,
    social: faComments,
    awards: faAward,
    charity: faHeart,
    seasonal: faTree,
  }

  export let maxColumns: ValidNumColumns = '4'
  export let posts: Post[]
  export let maxCards: number | undefined = undefined // max amount of cards to show
  export let aspectRatio: number = 1

  function isPostEventType(type: any): type is PostEventType {
    return ['tournament', 'learning', 'social', 'awards', 'charity', 'seasonal'].includes(type)
  }

  let cardsToShow =
    maxCards !== undefined && maxCards >= 0 ? posts.slice(0, Math.round(maxCards)) : posts
  let cardsWithLabel = cardsToShow.map((c) => {
    const postEventType: PostEventType | undefined = isPostEventType(c.type) ? c.type : undefined
    const postCategory = postEventType ? postEventTypes[postEventType] : ''
    const faIcon = postEventType ? FaIcons[postEventType] : null

    return {
      ...c,
      categoryLabel: postCategories[c.category],
      postTypeLabel: postCategory,
      faIcon,
    }
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
        <div class="tags">
          {#if card.section !== undefined}
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
