<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import Cards from '$lib/Cards.svelte'
  import Listing from '$lib/Listing.svelte'
  import Leaderboards from '$lib/Leaderboards.svelte'

  import faBullhorn from '@fortawesome/free-solid-svg-icons/faBullhorn'
  import faYoutube from '@fortawesome/free-brands-svg-icons/faYoutube'
  import faCalendarDay from '@fortawesome/free-solid-svg-icons/faCalendarDay'

  let cards = []

  getCards()

  async function getCards() {
    cards = await Promise.all(
      Object.entries(import.meta.glob('/src/routes/**/*.md')).map(async ([path, module]) => {
        const { metadata } = await module()
        const slug = path.split('/').reverse()[0].split('.')[0]
        return { slug, ...metadata }
      }),
    )
    cards = cards.sort(function (a, b) {
      return b.publish.localeCompare(a.publish)
    })
  }
</script>

<svelte:head>
  <title>BeastSaber</title>
</svelte:head>

<section>
  <Cards {cards} />
  <hr />
  <div class="listings">
    <Listing title="Latest News" icon={faBullhorn} />
    <Listing title="Featured Videos" icon={faYoutube} />
    <Listing title="Upcoming Events" icon={faCalendarDay} />
    <Leaderboards />
  </div>
</section>

<style>
  section {
    max-width: 1356px;
  }

  hr {
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    background-color: #707070;
  }

  .listings {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 12px;
  }

  @media (min-width: 678px) {
    .listings {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1356px) {
    .listings {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
