<script lang="ts">
  export let cards
</script>

<div class="cards">
  {#each cards as card}
    <a
      class="card"
      href={`/posts/${card.slug}`}
      style={`background-image: url(${import.meta.env.VITE_DOMAIN_BASE}${card.image})`}
    >
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
    position: relative;
    display: flex;
    aspect-ratio: 1;
    border-radius: 4px;
    background-size: cover;
    background-position: center;
  }

  .card::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: transparent linear-gradient(180deg, #45408800 0%, #000000 100%) 0% 0% no-repeat
      padding-box;
  }

  .title {
    margin-top: auto;
    padding: 20px;
    color: white;
    font-size: 24px;
    z-index: 1;
  }
</style>
