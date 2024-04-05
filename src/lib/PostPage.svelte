<script lang="ts">
  import { marked } from 'marked'
  import type { Post } from '../types'
  import MetaHead from './MetaHead.svelte'

  export let post: Post
  const { body, title, image } = post
  const imageUrl = image?.substring(image.indexOf('/static/') + 7) // Kinda silly, but it works

  const postRenderer = new marked.Renderer()
  // This will make headings start at 2, because the title will be rendered as an h1
  postRenderer.heading = (text, level) => {
    return `<h${level + 1}>${text}</h${level + 1}>`
  }

  // This will make links hard-reload instead of using SPA navigation
  postRenderer.link = (href, title, text) => {
    if (text == null) {
      text = href
    }

    if (title != null) {
      return `<a href="${href}" title=${title} rel="external">${text}</a>`
    }

    return `<a href="${href}" rel="external">${text}</a>`
  }

  // Injecting !youtube[video-id] tags with the respective iframe by using the paragraph renderer
  // I did attempt using the tokenizer instead, but it just complicated things a lot
  const youtubeRegex = /^!youtube\[([^\]]+)\]/g
  const youtubePlaylistRegex = /^!youtubepl\[([^\]]+)\]/g

  const createYoutubeIFrameFromId = (videoId: string) => `
  <iframe class="markdown-youtube-video" src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
    >
  </iframe>`

  const createYoutubePlaylistIFrameFromId = (playlistId: string) => `
  <iframe class="markdown-youtube-playlist" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
    >
  </iframe>`

  postRenderer.paragraph = (text) => {
    let renderedText = text.replace(youtubeRegex, (_, videoId) => {
      return createYoutubeIFrameFromId(videoId.trim())
    })

    renderedText = renderedText.replace(youtubePlaylistRegex, (_, playlistId) => {
      return createYoutubePlaylistIFrameFromId(playlistId.trim())
    })

    return `<p>${renderedText}</p>`
  }
</script>

<MetaHead
  {title}
  {imageUrl}
  description={post.homepageText}
  canonicalUrl={post.linkToSpecialtyPage}
/>
<article>
  {#if imageUrl !== undefined}
    <header style={`background-image: url(${imageUrl})`}>
      <h1>
        {title}
      </h1>
    </header>
  {:else}
    <h1>
      {title}
    </h1>
  {/if}
  {@html marked(body, { renderer: postRenderer })}
</article>

<style lang="scss">
  @import 'src/scss/variables';

  header {
    margin: -20px -12px 1rem; // compensating for padding on <main>
    background-size: cover;
    background-position: center;

    h1 {
      font-size: 1.5rem;
      padding: 2em 1em;
      text-align: center;
      backdrop-filter: blur(5px) brightness(40%);
    }
  }

  @media (min-width: 992px) {
    header {
      margin: -20px 0 1rem;
      border-radius: 0 0 $rounding-large $rounding-large;

      h1 {
        font-size: 3rem;
        margin: 0;
        border-radius: 0 0 $rounding-large - 2px $rounding-large - 2px; // Ensures the backdrop filter covers the entire image
      }
    }
  }
</style>
