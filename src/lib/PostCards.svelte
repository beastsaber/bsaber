<script lang="ts">
  import type { Post } from '../types'
  import { postCategories, postEventTypes } from '../maps'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faTrophy } from '@fortawesome/free-solid-svg-icons'
  import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
  import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
  import { faTree } from '@fortawesome/free-solid-svg-icons/faTree'

  type ValidNumColumns = `${'3' | '4'}`

  export let maxColumns: ValidNumColumns = '4'
  export let posts: Post[]
  export let maxCards: number | undefined = undefined // Max amount of cards to show
  export let aspectRatio: number = 1

  let cardsToShow =
    maxCards !== undefined && maxCards >= 0 ? posts.slice(0, Math.round(maxCards)) : posts
  let cardsWithLabel = cardsToShow.map((c) => {
    return {
      ...c,
      categoryLabel: postCategories[c.category],
      eventTypeLabel: postEventTypes[c.postEventType],
    }
  })

  const maxColsClass = `max-cols-${maxColumns}`

  const eventTypeIcons = {
    tournament: faTrophy,
    learning: faGraduationCap,
    social: faComments,
    awards: faAward,
    charity: faHeart,
    seasonal: faTree,
  }

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
        <div class="labels">
          <div class="categoryLabel">
            {#if card.section !== undefined}
              <span class="category" title={card.categoryLabel}>{card.categoryLabel}</span>
            {/if}
          </div>
          <div class="eventTypeLabel">
            {#if card.eventTypeLabel !== undefined}
              <span class="event-type" title={card.eventTypeLabel}>
                <Fa icon={eventTypeIcons[card.postEventType]} />
                {card.eventTypeLabel}
              </span>
            {/if}
          </div>
        </div>
        <h3 class="title">{card.title ?? ''}</h3>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  @import '../scss/post-cards';
  .labels {
    gap: 5px;
    display: flex;
  }
  .event-type,
  .category {
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
  .event-type {
    border: 1px solid $color-warning-yellow;
  }
</style>
