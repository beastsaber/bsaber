<script lang="ts">
  import { characteristics, difficulties } from '../maps'
  import type { BeatmapDifficulty } from '../types'

  export let diffs: BeatmapDifficulty[]

  let firstCharacteristic = diffs[0].characteristic // Should always be Standard as long as the map has a Standard diff
  let visibleDiffs = diffs.filter((d) => d.characteristic === firstCharacteristic)
  let extraDiffs = diffs.length - visibleDiffs.length
</script>

<div class="difficulties">
  <img
    class="characteristic"
    src="/characteristics/{characteristics[firstCharacteristic]}.svg"
    alt={firstCharacteristic}
    title={firstCharacteristic}
  />
  {#each visibleDiffs as diff}
    <span
      class="{difficulties[diff.difficulty]?.slug} difficulty short"
      title="{diff.difficulty} {diff.nps.toFixed(1)} NPS"
    >
      {difficulties[diff.difficulty]?.shortName}
    </span>
    <span
      class="{difficulties[diff.difficulty]?.slug} difficulty long"
      title="{diff.difficulty} {diff.nps.toFixed(1)} NPS"
    >
      {diff.difficulty}
      {diff.nps.toFixed(1)}
    </span>
  {/each}
  {#if extraDiffs > 0}
    <span class="more-hint">+ {extraDiffs} more</span>
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .difficulties {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.75rem;

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

  /*
   * We tried transitions but they didn't work with display. We tried different workarounds like scaling to 0
   * and svelte transitions etc. but nothing worked as intended.
   * Thus, we use animations now to make a smooth rollout effect.
   */
  @mixin moveDifficulty($name, $left_offset) {
    @keyframes #{$name} {
      0% {
        left: $left_offset;
      }
      100% {
        left: 0;
      }
    }
  }

  @include moveDifficulty(moveDifficulty2, -3rem);
  @include moveDifficulty(moveDifficulty3, -6rem);
  @include moveDifficulty(moveDifficulty4, -9rem);
  @include moveDifficulty(moveDifficulty5, -12rem);

  @keyframes expandDifficulty {
    0% {
      transform: scaleX(0.2);
    }
    100% {
      transform: scaleX(1);
    }
  }

  @keyframes retractDifficulty {
    0% {
      padding-right: 3.5rem;
    }
    100% {
      padding-right: 0.5rem;
    }
  }

  @keyframes blink {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes blink-not-hovered {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .difficulty.short {
    display: block;
  }

  .difficulty.long {
    display: none;
  }

  @media (min-width: 1300px), (max-width: 992px) and (min-width: 678px) {
    .difficulty.short {
      animation: retractDifficulty 0.3s ease-out;
    }

    .difficulty.long {
      transform-origin: top left;
      position: relative;
    }

    .difficulties {
      position: relative;
    }

    :global(.card:hover .difficulties .difficulty.short) {
      display: none;
    }

    :global(.card:hover .difficulties .difficulty.long) {
      display: block;
      animation: expandDifficulty 0.3s ease-out;
      &:nth-of-type(4) {
        animation: moveDifficulty2 0.3s ease-out, expandDifficulty 0.3s ease-out !important;
      }
      &:nth-of-type(6) {
        animation: moveDifficulty3 0.3s ease-out, expandDifficulty 0.3s ease-out !important;
      }
      &:nth-of-type(8) {
        animation: moveDifficulty4 0.3s ease-out, expandDifficulty 0.3s ease-out !important;
      }
      &:nth-of-type(10) {
        animation: moveDifficulty5 0.3s ease-out, expandDifficulty 0.3s ease-out !important;
      }
    }

    .more-hint {
      animation: blink-not-hovered $transition-long ease-in-out;
    }

    :global(.card:hover .difficulties .more-hint) {
      animation: blink $transition-long ease-in-out;
    }

    .characteristic {
      transition: transform 0.3s ease-out;
    }

    :global(.card:hover .difficulties .characteristic) {
      transform: rotate(10deg) scale(1.1);
    }
  }
</style>
