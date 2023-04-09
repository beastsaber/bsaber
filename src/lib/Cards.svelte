<script lang="ts">
  import type { CardData } from '../types'
  type ValidNumColumns = `${'3' | '4'}`

  export let maxColumns: ValidNumColumns = '4'
  export let cards: CardData[]
  export let maxCards: number | undefined = undefined // max amount of cards to show
  export let aspectRatio: number = 1

  const cardsToShow =
    maxCards !== undefined && maxCards >= 0 ? cards.slice(0, Math.round(maxCards)) : cards
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
  @import 'src/scss/variables';
  $card-border-radius: 10px;

  @mixin big-title {
    padding: 1.25rem;
    font-size: 2rem;
    line-height: 2.375rem;
  }

  @mixin little-title {
    padding: 0.75rem;
    font-size: 1.5rem;
    line-height: 1.75rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 0.75rem;

    .title {
      @include big-title;
      margin-top: auto;
      color: white;
      font-weight: bold;
      z-index: 1;
    }

    &.max-cols-3 {
      @media (min-width: 420px) {
        .title {
          @include little-title;
        }
      }

      @media (min-width: 560px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 840px) {
        .title {
          @include big-title;
        }
      }
    }

    &.max-cols-4 {
      @media (min-width: 420px) {
        grid-template-columns: repeat(2, 1fr);
        .title {
          @include little-title;
        }
      }

      @media (min-width: 640px) {
        .title {
          @include big-title;
        }
      }

      @media (min-width: 840px) {
        grid-template-columns: repeat(4, 1fr);
        .title {
          @include little-title;
        }
      }

      @media (min-width: 1100px) {
        .title {
          @include big-title;
        }
      }
    }
  }

  .card {
    position: relative;
    display: flex;
    border-radius: $card-border-radius;
    background-size: 100%;
    background-position: center;
    transition: 0.5s;
    aspect-ratio: var(--aspect-ratio);

    &:hover {
      background-size: 110%;
    }

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: $card-border-radius;
      background: linear-gradient(180deg, rgba(69, 64, 136, 0) 0%, #000000 100%);
    }
  }
</style>
