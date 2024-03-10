<script lang="ts">
  import { page } from '$app/stores'

  export let title: string | undefined = undefined
  const finalTitle = title != null ? title + ' - Beast Saber' : 'Beast Saber'
  export let description: string =
    'The hub of the Beat Saber community: your guide to top-tier map recommendations and essential insights. Uncover a rich selection of curated maps and learn more about Beat Saber and its community through our articles to enhance your gaming experience.'
  export let imageUrl: string = '/beastsaber-logo-fullsize-square.jpg'

  // Hardcoded for now - should be changed or hardcoded to bsaber.com
  const origin = 'https://deploy-preview-62--bsaber.netlify.app/'

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
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={origin + $page.url.pathname} />
  <meta property="og:title" content={title ?? 'Beast Saber'} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={normalizedImage} />
</svelte:head>
