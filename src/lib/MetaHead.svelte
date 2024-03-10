<script lang="ts">
  import { page } from '$app/stores'

  export let title: string | undefined
  export let description: string | undefined
  export let imageUrl: string | undefined

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

  {#if title}
    <meta property="og:title" content={title} />
  {/if}

  {#if description}
    <meta property="og:description" content={description} />
  {/if}

  {#if normalizedImage}
    <meta property="og:image" content={normalizedImage} />
  {/if}
</svelte:head>
