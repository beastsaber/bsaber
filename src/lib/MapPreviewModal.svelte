<script lang="ts">
  export let key: string | null = null

  const close = () => (key = null)
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close()
      document.removeEventListener('keydown', onKeydown)
    }
  }
  document.addEventListener('keydown', onKeydown)
</script>

<div class="preview-container">
  <div class="backdrop" on:click={close} />
  <div class="content">
    <iframe
      src="https://allpoland.github.io/ArcViewer/?id={key}"
      title="Map Preview"
      height="100%"
      width="100%"
      allowfullscreen="true"
    />
  </div>
</div>

<style lang="scss">
  .preview-container {
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: #000c;
    }
    $fill-percentage: 80;
    $aspect-ratio: 16/9;
    .content {
      z-index: 101;
      aspect-ratio: $aspect-ratio;
      max-width: calc(#{$fill-percentage} * $aspect-ratio * 1vh);
      width: #{$fill-percentage}vw;
    }
  }
</style>
