<script lang="ts">
  import { marked } from 'marked'
  import type { Post } from '../types'

  export let post: Post
  const { body, title, image } = post
  const imageUrl = image?.substring(image.indexOf('/static/') + 7) // Kinda silly, but it works
  const postRenderer = new marked.Renderer()
  // This will make headings start at 2, because the title will be rendered as an h1
  postRenderer.heading = (text, level) => {
    return `<h${level + 1}>${text}</h${level + 1}>`
  }

  // this will make links hard-reload instead of
  postRenderer.link = (href, title, text) => {
    return `<a href="${href}" title="${title}" rel="external">${text}</a>`
  }
</script>

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
      border-radius: 0 0 $card-border-radius $card-border-radius;

      h1 {
        font-size: 3rem;
        margin: 0;
        border-radius: 0 0 $card-border-radius - 2px $card-border-radius - 2px; // Ensures the backdrop filter covers the entire image
      }
    }
  }
</style>
