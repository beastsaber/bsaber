<script lang="ts">
  import type { Post } from '../types'
  import Fa from 'svelte-fa/src/fa.svelte'
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'

  export let posts: Post[]
  export let maxCards: number = 6 // max amount of cards to show, ideally divisble by 3
  export let icon: IconDefinition | undefined = undefined
  export let img: string | undefined = undefined

  const cardsToShow = posts.slice(0, Math.round(maxCards))
</script>

<div class="cards">
  {#each cardsToShow as card}
    <a class="card" href={`/posts/${card.slug}`}>
      <div class="title">
        {card.title ?? ''}
      </div>
      <div class="info-container">
        <div class="icon-circle">
          {#if icon}
            <Fa fw {icon} />
          {:else if img}
            <img class="img" src={img} alt="" />
          {/if}
        </div>

        <div class="text-container">
          <span class="host">Hosted by <a href="#">host name</a></span>
          <span class="date">October 1, 2022 - October 31, 2022</span>
        </div>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/variables';
  $card-border-radius: 10px;

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 1.25rem;

    @media (min-width: 560px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: $font-dm-sans;
    padding: 0.75rem;
    gap: 10px;
    border-radius: $card-border-radius;
    background-color: #333333;
    background-size: 100%;
    background-position: center;
    transition: 0.5s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .title {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.4375rem;
    margin-top: auto;
    color: white;
    font-weight: bold;
    z-index: 1;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .icon-circle {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    background: #d9d9d9;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    line-height: 1.5625rem;
  }

  .date {
    color: $color-muted-text;
  }
</style>
