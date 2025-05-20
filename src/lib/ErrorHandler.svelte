<script lang="ts">
    interface Props {
      error: unknown
      reset: () => void
    }

      const { error, reset }: Props = $props()
</script>

<div class="error">
  <h2>Oops! Something went wrong.</h2>
  <p>Try refreshing the page or check your internet connection.</p>
  <p>If the problem persists, please report it to us and provide the below error details.</p>
  <div class="error-details">
    <pre>{error}</pre>
  </div>
  <button onclick={reset} class="retry-button">Retry</button>
</div>


<style lang="scss">
  @import 'src/scss/variables';
    
  .error {
    background: #1c1c1c;
    color: LightGray;
    width: 80vw;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
    padding: 2rem;
    text-align: center;
    margin: auto;
    border-radius: $rounding-small;

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .error-details {
      background-color: #333;
      padding: 1rem;
      border-radius: $rounding-small;
      text-align: left;
      pre {
        margin: 0;
        font-size: 0.9rem;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
  button.retry-button {
    background-color: $color-danger-red;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color $transition-short;

    margin: 1rem;
    &:hover {
      background-color: darken($color-danger-red, 10%);
    }
  }
</style>