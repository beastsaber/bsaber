<script lang="ts">
  import { marked } from 'marked'
  import type { PostWithAuthorAndContributor, Uploader } from '../types'
  import { onMount } from 'svelte'

  export let post: PostWithAuthorAndContributor
  const { body, title, image, authors, credits, publish } = post
  const imageUrl = image?.substring(image.indexOf('/static/') + 7) // Kinda silly, but it works
  const h2HeaderStartRenderer = new marked.Renderer()
  h2HeaderStartRenderer.heading = (text, level) => {
    return `<h${level + 1}>${text}</h${level + 1}>`
  }

  const linkifyPerson = (person: Uploader) => {
    return `<a class="post-person-link" href="https://beatsaver.com/profile/${person.id}">${person.name}</a>`
  }

  const scrollifyPerson = (person: Uploader) => {
    return `<a class="faux-scroll-link post-person-link">${person.name}</a></div>`
  }

  const prettyNameConcatenation = (people: Uploader[], transformationFunction = linkifyPerson) => {
    // Special cases
    if (people.length === 0) return ''
    if (people.length === 1) return transformationFunction(people[0])

    // Usual case: First n-1 people concatenaded with commas, and the last one with an "and"
    const lastPerson = people.pop()!
    return `${people.map(linkifyPerson).join(', ')} and ${transformationFunction(lastPerson)}`
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  function formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString)
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  let authorBox: HTMLElement
  onMount(() => {
    if (authorBox) {
      document.querySelectorAll('.faux-scroll-link').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault()
          authorBox.scrollIntoView({ behavior: 'smooth' })
        })
      })
    }
  })
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
  <div class="meta-data-line">
    <span class="author-information"
      >Written by {@html prettyNameConcatenation(authors, scrollifyPerson)}</span
    >
    |
    <span class="publication-time">{formatDate(publish)}</span>
    <!-- ToDo: Put Post Category Tags here - might make a good component as they are used in three locations including this one -->
    <!-- <span class="category-labels"></span> -->
  </div>
  {@html marked(body, { renderer: h2HeaderStartRenderer })}
</article>

<div class="author-box">
  <div class="author-box-header">
    {#if authors.length > 2}
      <h3>About the Authors</h3>
    {:else}
      <h3>About the Author</h3>
    {/if}
  </div>
  <div class="author-box-content" bind:this={authorBox}>
    {#each authors as author}
      <div class="author-box-person">
        <img src={author.avatar} alt={author.name} />
        <div class="author-box-person-info">
          <div class="header-line">
            <h4 class="author-name">
              {author.name}
            </h4>
            <div class="social-links">
              {#each author.socialLinks ?? [] as social}
                {#if social.platform === 'beatsaver'}
                  <a href="https://beatsaver.com/profile/{social.id}">
                    <!-- ToDo: Provide BeatSaver icon -->
                    <!-- <img src={'/beat-saver.svg'} alt="BeatSaver" /> -->
                    BeatSaver
                  </a>
                {/if}
                {#if social.platform === 'discord'}
                  <a href="https://discordapp.com/users/{social.id}">
                    <!-- ToDo: Provide Discord icon -->
                    <!-- <img src={'/discord.svg'} alt="Discord" /> -->
                    Discord
                  </a>
                {/if}
              {/each}
            </div>
          </div>
          {#if author.bio !== undefined}
            {@html marked(author.bio)}
          {:else}
            <p>Writting for Beast Saber as guest.</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

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

  .meta-data-line {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: solid 3px $background-tertiary;
    width: 100%;
  }

  // Needs to be global so because it's rendered in with @html
  :global(a.post-person-link) {
    color: $color-danger-red;
  }

  .author-information {
    margin-right: 0.5rem;
  }

  .publication-time {
    margin-left: 0.5rem;
    color: $color-muted-text;
  }

  $pfp-diameter: 128px;
  .author-box {
    margin-top: 2rem;
    border-radius: $card-border-radius;
    background-color: $background-secondary;

    .author-box-header {
      margin-bottom: 1rem;
      padding: 0.4rem 1.5rem 0.4rem 1rem;
      border-radius: $card-border-radius $card-border-radius 0 0;
      background-color: $background-tertiary;
    }

    .author-box-content {
      padding: 0rem 1.5rem 1rem 1rem;

      .author-box-person {
        img {
          float: left;
          width: $pfp-diameter;
          height: $pfp-diameter;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1.5rem;
        }

        .author-box-person-info {
          margin-left: $pfp-diameter + 30px;
          h4 {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  .header-line {
    display: flex;
    justify-content: space-between;
    height: 1.2rem;

    .social-links {
      display: flex;
      justify-content: end;

      a {
        margin-left: 2rem;
      }
    }
  }

  :global(.author-box-person-info > p) {
    margin-top: 1rem;
  }

  :global(a.faux-scroll-link) {
    cursor: pointer;
  }
</style>
