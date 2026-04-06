<script lang="ts">
  export let title: string | undefined = undefined
  export let authors: string[] | undefined = undefined
  export let section: string | undefined = undefined
  export let category: string | undefined = undefined
  export let publish: string | undefined = undefined
  export let lastUpdated: string | undefined = undefined
  export let homepageText: string | undefined = undefined
  export let image: string | undefined = undefined
  export let showInPostListing: boolean | undefined = undefined
  export let linkToSpecialtyPage: string | undefined = undefined
</script>

<article class="post-content">
  <slot />
</article>
