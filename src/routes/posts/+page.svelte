<script lang="ts">
  export let data
  let posts = data.posts
</script>

{#each posts as post}
  <a href={`/posts/${post.slug}`}>{post.title}</a>
{/each}
