<script lang="ts">
  import type { Post } from '../types'
  import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faTrophy } from '@fortawesome/free-solid-svg-icons'
  import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
  import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'
  import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
  import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
  import { faTree } from '@fortawesome/free-solid-svg-icons/faTree'
  import { postCategories, postEventTypes } from '../maps'

  export let post: Post

  let section = postCategories[post.category]
  let eventTypeLabel = post.postEventType ? postEventTypes[post.postEventType] : undefined
  let date = new Date(post.publish).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const eventTypeIcons = {
    tournament: faTrophy,
    learning: faGraduationCap,
    social: faComments,
    awards: faAward,
    charity: faHeart,
    seasonal: faTree,
  }
</script>

<div class="card">
  <a href={`/posts/${post.slug}`} class="image-link">
    {#if post.image !== undefined}
      <img src={post.image} alt={post.title} />
    {:else}
      <div class="image-placeholder">
        <Fa style="height:2rem;width:2rem;" class="fa" fw icon={faNewspaper} />
      </div>
    {/if}
  </a>
  <div class="content">
    <div class="labels">
      {#if section !== undefined}
        <span class="category" title={section}>{section}</span>
      {/if}
      {#if eventTypeLabel !== undefined}
        <span class="event-type" title={eventTypeLabel}>
          <Fa icon={eventTypeIcons[post.postEventType]} />
          {eventTypeLabel}
        </span>
      {/if}
    </div>
    <!-- Forcing rel="external" to allow scripts to load properly within Post pages -->
    <a class="title" href={`/posts/${post.slug}`} rel="external" title={post.title}>{post.title}</a>
    <p class="date">{date}</p>
    <p class="short-description">{post.homepageText}</p>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  $image-size: 8rem;

  .card {
    position: relative;
    display: flex;
    overflow: hidden;

    .image-link {
      height: $image-size;
      flex: $image-size 0 0;
      margin-right: 0.75rem;

      img {
        border-radius: $rounding-large;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .image-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $rounding-large;
        height: 100%;
        width: 100%;
        background-color: $color-bsaber-purple;
        color: white;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      overflow: hidden;

      .title {
        display: block;
        font-weight: bold;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .date {
        font-size: 0.75rem;
      }

      .short-description {
        display: -webkit-box;
        color: $color-muted-text;
        font-size: 0.75rem;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .labels {
        display: flex;
        gap: 5px;
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
    }
  }
</style>
