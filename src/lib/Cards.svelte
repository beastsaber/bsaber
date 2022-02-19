<script>
  export let cards
</script>

<div class="cards">
  {#each cards as card}
    <a class="card" href={`/posts/${card.slug}`}>
      <div class="title">
        {card.title ?? ''}
      </div>
    </a>
  {/each}
</div>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 12px;
  }

  @media (min-width: 420px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 840px) {
    .cards {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .card {
    display: flex;
    aspect-ratio: 1;
    border-radius: 4px;
    background: transparent linear-gradient(180deg, #45408800 0%, #000000 100%) 0% 0% no-repeat
      padding-box;
  }

  .title {
    margin-top: auto;
    padding: 20px;
    color: white;
    font-size: 24px;
  }
</style>
