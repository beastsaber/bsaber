<script lang="ts">
  import { marked } from 'marked'
  import type { Author, PostWithAuthorAndContributor, Uploader } from '../types'
  import MetaHead from './MetaHead.svelte'
  import { onMount } from 'svelte'
  import SocialIcon from './SocialIcon.svelte'
  import { postCategories, postEventTypes } from '../maps'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faTrophy } from '@fortawesome/free-solid-svg-icons'
  import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
  import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
  import { faTree } from '@fortawesome/free-solid-svg-icons/faTree'

  export let post: PostWithAuthorAndContributor
  const { body, title, image, authors, credits, publish, lastUpdated } = post
  const imageUrl = image?.substring(image.indexOf('/static/') + 7) // Kinda silly, but it works

  let categoryLabel = postCategories[post.category]
  let eventTypeLabel = post.postEventType ? postEventTypes[post.postEventType] : undefined

  const eventTypeIcons = {
    tournament: faTrophy,
    learning: faGraduationCap,
    social: faComments,
    awards: faAward,
    charity: faHeart,
    seasonal: faTree,
  }

  const postRenderer = new marked.Renderer()
  // This will make headings start at 2, because the title will be rendered as an h1
  postRenderer.heading = (text, level) => {
    const idMatch = text.match(/ {\$([a-zA-Z0-9\-_]+)}/)
    const finalText = idMatch ? text.replace(idMatch[0], '') : text
    const id = idMatch ? idMatch[1] : undefined
    if (id) {
      return `<h${level + 1} id="${id}" class="header-smooth-scroll">${finalText}</h${level + 1}>`
    }

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
  <div class="meta-data-line">
    <div class="category-author">
      <div class="labels">
        {#if categoryLabel !== undefined}
          <span class="category" title={categoryLabel}>{categoryLabel}</span>
        {/if}
        {#if eventTypeLabel !== undefined}
          <span class="event-type" title={eventTypeLabel}>
            <Fa icon={eventTypeIcons[post.postEventType]} />
            {eventTypeLabel}
          </span>
        {/if}
      </div>
      <span>
        {#if authors.length > 0}
          <span class="author-information"
            >Written by {@html prettyNameConcatenation(authors, scrollifyPerson)}
          </span>
        {/if}
      </span>
    </div>
    {#if authors.length > 0}
      <div class="spacer">|</div>
    {/if}
    <div class="publish-update">
      {#if lastUpdated}
        <span class="last-updated-time">Last updated on {formatDate(lastUpdated)}</span>
      {:else}
        <span class="hide-on-small">Published on </span>{formatDate(publish)}
      {/if}
    </div>
  </div>
  {@html marked(body, { renderer: postRenderer })}
</article>
{#if authors.length > 0}
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
          <img class="author-profile-picture" src={author.avatar} alt={author.name} />
          <div class="author-box-person-info">
            <div class="header-line">
              <h4 class="author-name">
                {author.name}
              </h4>
              <div class="social-links">
                {#each author.socialLinks ?? [] as social}
                  <SocialIcon social={social.platform} id={social.id} />
                {/each}
              </div>
            </div>
            {#if author.bio !== undefined}
              {@html marked(author.bio)}
            {:else}
              <p>Writing for BeastSaber as a guest.</p>
            {/if}

            <div class="social-links-mobile">
              {#each author.socialLinks ?? [] as social}
                <SocialIcon social={social.platform} id={social.id} />
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  @import 'src/scss/variables';

  :global(article > p, article > ul, article > ol, article > blockquote) {
    font-size: 1.1rem;
  }

  :global(article kbd) {
    font-size: 0.95rem;
    padding: 0.25rem;
    border-radius: $rounding-small;
    background-color: $color-background-tertiary;
  }

  header {
    margin: -20px -12px 1rem; // compensating for padding on <main>
    background-size: cover;
    background-position: center;
    user-select: none;

    h1 {
      font-size: 1.5rem;
      padding: 2em 1em;
      text-align: center;
      backdrop-filter: blur(5px) brightness(40%);
    }
  }

  .meta-data-line {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: solid 3px $color-background-tertiary;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 552px) {
    .meta-data-line {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }
  }
  @media (min-width: 553px) {
    .spacer {
      display: none;
    }
  }
  .spacer {
    text-align: center;
  }
  .publish-update {
    text-align: right;
    color: $color-muted-text;
    margin-right: 0.5rem;
  }
  .category-author {
    display: flex;
  }
  .labels {
    margin: 0 0.5rem;
    gap: 5px;
    display: flex;
  }
  .event-type,
  .category {
    font-size: 0.75rem;
    border-radius: 1.5rem;
    background-color: $color-background-secondary;
    padding: 0.125rem 0.5rem;
    margin-bottom: 0.25rem;
    max-width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
  .category {
    border: 1px solid $color-danger-red;
  }
  .event-type {
    border: 1px solid $color-warning-yellow;
  }

  // Needs to be global so because it's rendered in with @html
  :global(a.post-person-link) {
    color: $color-danger-red;
  }

  $pfp-diameter: 128px;
  .author-box {
    margin-top: 2rem;
    border-radius: $rounding-small;
    background-color: $color-background-secondary;
    .author-box-header {
      margin-bottom: 1rem;
      padding: 0.4rem 1.5rem 0.4rem 1rem;
      border-radius: $rounding-small $rounding-small 0 0;
      background-color: $color-background-tertiary;
    }
    .author-box-content {
      padding: 0rem 1.5rem 1rem 1rem;
      text-align: justify;
      .author-box-person {
        display: flex;
        .author-profile-picture {
          width: $pfp-diameter;
          height: $pfp-diameter;
          border-radius: 50%;
          object-fit: cover;
        }
        .author-box-person-info {
          margin-left: 1rem;
          width: 100%;
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
  }
  :global(.author-box-person-info > p) {
    margin-top: 1rem;
  }
  :global(a.faux-scroll-link) {
    cursor: pointer;
  }

  .hide-on-small {
    display: none;
  }

  // Separation between different authors
  .author-box-person + .author-box-person {
    padding-top: 1.2rem;
    margin-top: 1.4rem;
    border-top: 1px solid $color-background-tertiary;
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

    .hide-on-small {
      display: inline;
    }
  }

  .social-links {
    display: flex;
    justify-content: end;
  }

  .social-links-mobile {
    display: none;
  }

  @media (max-width: 500px) {
    .social-links {
      display: none;
    }

    .author-box-person {
      flex-direction: column;
      align-items: center;

      .header-line {
        h4 {
          font-size: 1.3rem !important;
        }
        margin-top: 1rem;
        justify-content: center;
      }
    }

    .social-links-mobile {
      height: 1.2rem;
      display: flex;
      margin-top: 1.5rem;
      justify-content: center;
    }
  }
</style>
