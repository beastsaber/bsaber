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
  export let rotationDeg = 0
  export let positionName: PositionName = 'top-center'
  export let positionDate: PositionName = 'bottom-center'
  const height = '12rem'
  const width = '12rem'

  // set width and height css variables
  onMount(() => {
    window.document.documentElement.style.setProperty('--card-width', width)
    window.document.documentElement.style.setProperty('--card-height', height)
  })
  let hovering = false
</script>

<div
  on:click
  class="member-box"
  style={`background: url(${image}); background-size: cover; height: ${height}; width: ${width}; background-repeat: no-repeat; background-position: center; transform: ${
    hovering ? 'scale(1.1) ' : ''
  }rotate(${hovering ? '0' : rotationDeg}deg);`}
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
>
  <div class={`name ${positionName}`}>{name}</div>
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

  .date,
  .name {
    color: white;
    background-color: rgba(0, 0, 0, 1);
    text-align: center;
    padding: 0.2rem 1rem;
    font-size: 1rem;
  }

  .date {
    margin: 0 auto;
    color: #371226;
    background-color: white;

    &.bottom-right {
      transform: translateY(1rem) translateX(3rem) rotate(5deg);
    }

    &.bottom-left {
      transform: translateY(1rem) translateX(-2rem) rotate(-5deg);
    }

    &.top-center {
      transform: translateY(calc((-1 * var(--card-height)) + 1rem));
    }
  }

  .name {
    margin: 0 auto;
    border-radius: 5px;

    &.top-left {
      transform: translateY(-1rem) translateX(-2rem) rotate(-16deg);
    }

    &.top-right {
      transform: translateY(-1rem) translateX(3rem) rotate(16deg);
    }
  }
</style>
