<script lang="ts">
  import type { Post } from '../types'

  import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn'
  import Fa from 'svelte-fa/src/fa.svelte'

  const icon = faBullhorn
  export let announcement: Post
  let homepageText: string | undefined = announcement.homepageText ?? undefined
  let title: string = announcement.title
  let slug: string = announcement.slug
  const content = homepageText ?? title
</script>

<div class="container">
  <div class="icon">
    <Fa style="width: 100%; height: 100%;" class="fa" fw {icon} />
  </div>
  <p>
    <strong class="start">Announcement: </strong>{content} <a href="/posts/{slug}">Read more.</a>
  </p>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .container {
    display: flex;
    align-items: center;
    justify-content: start;
    width: auto;
    background: #eeeeee;
    border-radius: 10px;
    padding: 8px 30px;
    p {
      font-family: $font-poppins;
      color: #222222;
      font-size: 20px;
      line-height: 24px;
    }
  }

  .icon {
    display: block;
    width: 24px;
    min-width: 24px;
    height: auto;
    color: #777777;
    margin-right: 9px;
    padding-top: 4px;
  }

  .start {
    text-transform: uppercase;
  }
</style>
