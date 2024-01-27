<script lang="ts">
  import type { Post } from '../types'
  type ValidNumColumns = `${'3' | '4'}`

  export let maxColumns: ValidNumColumns = '4'
  export let posts: Post[]
  export let maxCards: number | undefined = undefined // max amount of cards to show
  export let aspectRatio: number = 1

  const cardsToShow =
    maxCards !== undefined && maxCards >= 0 ? posts.slice(0, Math.round(maxCards)) : posts
  const maxColsClass = `max-cols-${maxColumns}`
</script>

<div class="cards {maxColsClass}" style="--aspect-ratio:{aspectRatio}">
  {#each cardsToShow as card}
    <a class="card" href={`/posts/${card.slug}`} style={`background-image: url(${card.image})`}>
      <div class="title {maxColsClass}">
        {card.title ?? ''}
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  @import '../scss/post-cards';
</style>
