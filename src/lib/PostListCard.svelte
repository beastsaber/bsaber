<script lang="ts">
  import type { Post } from '../types'
  import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { postSections } from '../maps'

  export let post: Post

  let section = postSections[post.section]
  let date = new Date(post.publish).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
</script>

<div class="card">
  <a href={`/posts/${post.slug}`} class="image-link">
    {#if post.image !== undefined}
      <img src="{post.image}" alt="{post.title}" />
    {:else}
      <div class="image-placeholder">
        <Fa style="height:2rem;width:2rem;" class="fa" fw icon="{faNewspaper}" />
      </div>
    {/if}
  </a>
  <div class="content">
    <a class="title" href={`/posts/${post.slug}`}>{post.title}</a>
    <p class="date">{date}</p>
    <p class="short-description">{post.homepageText}</p>
    {#if section !== undefined}
      <span class="section" title={section}>{section}</span>
    {/if}
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  $image-size: 7.5rem;

  .card {
    position: relative;
    display: flex;
    overflow: hidden;

    .image-link {
      height: $image-size;
      flex: $image-size 0 0;
      margin-right: 0.75rem;

      img {
        border-radius: $card-border-radius;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .image-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $card-border-radius;
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
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .section {
        font-size: 0.75rem;
        border-radius: 1.5rem;
        background-color: $background-secondary;
        border: 1px solid $color-danger-red;
        padding: 0.125rem 0.5rem;
        margin-top: auto;
        max-width: fit-content;
        justify-self: end;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>