<script>
  import Fa from 'svelte-fa/src/fa.svelte'

  export let text
  export let color
  export let icon
  export let href
</script>

<a class="quick-filter" style="background-color: {color}" {href}>
  <div class="content">
    <div class="background">
      <Fa size="5x" {icon} />
    </div>
    <div class="foreground">
      <Fa size="1.5x" {icon} />
      <h4>{text}</h4>
    </div>
  </div>
</a>

<style lang="scss">
  @import 'src/scss/variables';

  .quick-filter {
    height: 64px;
    color: $text-primary;
    border-radius: 4px;
    overflow: hidden;

    .content {
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .background {
      position: absolute;
      opacity: 20%;
      display: flex;
      place-content: center;
      z-index: 0;
      transition: 0.5s;
      transform: scale(0.8);
    }

    .foreground {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: 0.5s;
    }

    &:hover {
      text-decoration: none;

      .background {
        transform: scale(1);
        opacity: 50%;
      }

      .foreground {
        opacity: 0%;
      }
    }
  }
</style>
