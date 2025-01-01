<script lang="ts">
  import { genreTags, styleTags } from '../maps'

  export let tags: string[] | undefined
</script>

{#if tags !== undefined && tags.length !== 0}
  <div class="tags">
    {#each tags as tag}
      {#if tag in styleTags}
        <span class="style tag" title={styleTags[tag]}>{styleTags[tag]}</span>
      {:else if tag in genreTags}
        <span class="genre tag" title={genreTags[tag]}>{genreTags[tag]}</span>
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  @import 'src/scss/variables';

  .tags {
    display: flex;
    gap: 0.5rem;
    overflow: hidden;
    user-select: none;

    .tag {
      font-size: 0.75rem;
      border-radius: 1.5rem;
      background-color: $color-background-secondary;
      border: 1px solid;
      padding: 0.125rem 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.style {
        border-color: $color-info-blue;
      }

      &.genre {
        border-color: $color-success-green;
      }
    }
  }
</style>
