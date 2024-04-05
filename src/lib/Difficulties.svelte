<script lang="ts">
    import {characteristics, difficulties} from "../maps";
    import type {BeatmapDifficulty} from "../types";

    export let diffs: BeatmapDifficulty[]

    let firstCharacteristic = diffs[0].characteristic // Should always be Standard as long as the map has a Standard diff
    let visibleDiffs = diffs.filter((d) => d.characteristic === firstCharacteristic)
    let extraDiffs = diffs.length - visibleDiffs.length
</script>

<div class="difficulties">
    <img class="characteristic"
         src="/characteristics/{characteristics[firstCharacteristic]}.svg"
         alt="{firstCharacteristic}"
         title="{firstCharacteristic}"/>
    {#each visibleDiffs as diff}
        <span class="{difficulties[diff.difficulty]?.slug} difficulty" title="{diff.difficulty}">
            {difficulties[diff.difficulty]?.shortName}
        </span>
    {/each}
    {#if extraDiffs > 0}
        <span>+ {extraDiffs} more</span>
    {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .difficulties {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: .75rem;

    .characteristic {
      height: 1rem;
      border-radius: 1.5rem;
      padding: 0.25rem;
      background-color: white;
      color: black;
      z-index: 10;
    }

    .difficulty {
      border-radius: 1.5rem;
      padding: 0.125rem 0.5rem 0.125rem 1.25rem;
      margin-left: -1.5rem;

      &.easy {
        background-color: $color-difficulty-green;
        z-index: 5;
      }

      &.normal {
        background-color: $color-difficulty-blue;
        z-index: 4;
      }

      &.hard {
        background-color: $color-difficulty-orange;
        z-index: 3;
      }

      &.expert {
        background-color: $color-difficulty-red;
        z-index: 2;
      }

      &.expert-plus {
        background-color: $color-difficulty-purple;
        z-index: 1;
      }
    }
  }
</style>
