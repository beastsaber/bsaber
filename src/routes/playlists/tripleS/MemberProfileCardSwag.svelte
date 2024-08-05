<script lang="ts">
  import { onMount } from 'svelte'

  type PositionName =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'

  export let date: string
  export let image: string
  export let name: string
  export let sNumber: number
  export let rotationDeg = 0
  export let positionName: PositionName = 'top-center'
  export let positionDate: PositionName = 'bottom-center'
  const height = '20rem'
  const width = '15rem'

  // set width and height css variables
  onMount(() => {
    window.document.documentElement.style.setProperty('--triples-card-width', width)
    window.document.documentElement.style.setProperty('--triples-card-height', height)
  })
  let hovering = false
</script>

<div
  on:click
  class={`member-box`}
  style={`background: url(${image}); background-size: ${width} ${height}; height: ${height}; width: ${width}; background-repeat: no-repeat; background-position: center; transform: ${
    hovering ? 'scale(1.1) ' : ''
  }rotate(${hovering ? '0' : rotationDeg}deg);`}
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
>
  <div class={`name ${positionName}`}>S{sNumber} {name}</div>
  <div class={`date ${positionDate}`}>{date}</div>
</div>

<style lang="scss">
  div.member-box {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    justify-content: space-between;

    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }

  h2 {
    font-size: 1.5rem;
  }

  .date,
  .name {
    color: white;
    background-color: rgba(0, 0, 0, 1);
    text-align: center;
    // margin: 0 auto;
    padding: 0.2rem 1rem;
    font-size: 1.4rem;
  }

  .date {
    margin: 0 auto;
    color: #ffd700;

    &.bottom-right {
      transform: translateY(1rem) translateX(5rem) rotate(-16deg);
    }

    &.top-left {
      transform: translateY(calc((-1 * var(--triples-card-height)) + 1rem)) translateX(-5rem)
        rotate(-16deg);
    }

    &.top-right {
      transform: translateY(calc((-1 * var(--triples-card-height)) + 1rem)) translateX(5rem)
        rotate(16deg);
    }

    &.bottom-left {
      transform: translateY(1rem) translateX(-5rem) rotate(16deg);
    }

    &.top-center {
      transform: translateY(calc((-1 * var(--triples-card-height)) + 1rem));
    }

    &.bottom-center {
      transform: translateY(1rem);
    }
  }

  .name {
    margin: 0 auto;
    border-radius: 5px;

    &.bottom-right {
      transform: translateY(calc((var(--triples-card-height)) - 1rem)) translateX(5rem)
        rotate(-18deg);
    }

    &.top-left {
      transform: translateY(-1rem) translateX(-5rem) rotate(-18deg);
    }

    &.top-right {
      transform: translateY(-1rem) translateX(5rem) rotate(18deg);
    }

    &.bottom-left {
      transform: translateY(calc((var(--triples-card-height)) - 1rem)) translateX(-5rem)
        rotate(18deg);
    }

    &.top-center {
      transform: translateY(-1rem);
    }

    &.bottom-center {
      transform: translateY(calc((var(--triples-card-height)) - 1rem));
    }
  }
</style>
