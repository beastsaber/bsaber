<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import Cards from '$lib/Cards.svelte'

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
</section>

<style>
  section {
    max-width: 1332px;
  }
</style>
