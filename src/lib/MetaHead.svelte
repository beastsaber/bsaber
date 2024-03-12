<script lang="ts">
  import { page } from '$app/stores'

  export let title: string | undefined = undefined
  const finalTitle = title != null ? title + ' - Beast Saber' : 'Beast Saber'
  export let description: string =
    'The hub of the Beat Saber community: your guide to top-tier map recommendations and essential insights. Uncover a rich selection of curated maps and learn more about Beat Saber and its community through our articles to enhance your gaming experience.'
  export let imageUrl: string = '/beastsaber-logo-fullsize-square.jpg'
  export let keywords: string | undefined = undefined

  const origin = DEPLOY_PRIME_URL || 'https://bsaber.com'

  let normalizedImage = imageUrl
  if (normalizedImage && !normalizedImage.startsWith('http') && normalizedImage.startsWith('/')) {
    normalizedImage = origin + imageUrl
  } else if (
    normalizedImage &&
    !normalizedImage.startsWith('/') &&
    !normalizedImage.startsWith('http')
  ) {
    if ($page.url.href.endsWith('/')) {
      normalizedImage = $page.url.href + imageUrl
    } else {
      normalizedImage = $page.url.href + '/' + imageUrl
    }
  }
</script>

<svelte:head>
  <!-- Standard Meta Attributes-->
  <title>{finalTitle}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={origin + $page.url.pathname} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={normalizedImage} />
</svelte:head>
