<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        title: `${status} -: ${error.message}`,
        errorCode: `${status}`,
        errorMessage: error.message,
        stackTrace: error.stack,
      },
    }
  }
</script>

<script>
  export let title
  export let errorCode
  export let errorMessage
  export let stackTrace = ''
  // Having the message in a variable as it seems they get seperated on each line that starts with a html tag
  let helpfullMessages = [
    `<b>Verify url and typos</b> - The web page you were attempting to view may not exist or may have moved - try <em>checking the web address for typos</em>.`,
    `<b>Visit our Discord</b> - If you followed a link from somewhere, please let us know at <code>#site-development</code> on the <a href=\"https://discord.gg/5VaEjFeuny\">BeastSaber Discord</a>. Tell us where you came from and what you were looking for, and we'll do our best to fix it.`,
  ]
</script>

<section>
  <body id="error-page" class="error">
    <div class="message">
      <blockquote>
        <center
          ><a class="logoimg" href="/"
            ><img src="/BeastSaber-LogoW.webp" class="logoimg" alt="BeastSaber" /></a
          ></center
        >
        <h2>
          <center>Error {errorCode} {errorMessage}</center>
        </h2>
        <p>
          Our apologies for the temporary inconvenience. The server was unable to process the
          requested URL. We suggest you do the following:
        </p>
        <ul>
          {#each helpfullMessages as message}
            <li>{@html message}</li>
          {/each}
        </ul>
        <center
          ><a
            href="https://www.youtube.com/watch?v=64f34Injgas"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="/error.gif" class="logoimg" alt="Error gif, Beat Saber lost tracking" /></a
          ></center
        >
        <small
          ><center
            ><a href="https://www.youtube.com/watch?v=64f34Injgas">Original Video</a> by Bobbie</center
          ></small
        >
        <h3><center><a href="/">Back to the Homepage</a></center></h3>
        {#if stackTrace !== ''}
          <div class="debugging-info">
            Stacktrace:
            <code class="block">{stackTrace}</code>
          </div>
        {/if}
      </blockquote>
    </div>
  </body>
</section>

<style lang="scss">
  @import 'src/scss/variables';

  section {
    margin: 0;
  }

  body.error {
    background: #1c1c1c;
    color: LightGray;
    min-width: min-content;
    min-height: fit-content;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
  }
  img.logoimg {
    margin-top: 20px;
    max-width: 100%;
    margin-bottom: 20px;
  }
  h2 {
    color: LightGray;
    font-weight: bold;
    font-size: 1.5em;
    padding-bottom: 2%;
  }
  h3 {
    padding-bottom: 1em;
  }
  .message {
    width: 100%;
    border-radius: $rounding-small;
    background-color: $color-background-secondary;
  }
  p,
  ul {
    font-size: 16px;
    padding: 0% 5% 1% 5%;
  }
  p {
    font-size: 15px;
  }
  ul {
    padding: 0% 10% 0% 10%;
  }
  div.debugging-info {
    color: LightGray;
    font-size: 1em;
    padding: 2em;
    padding-top: 0.5em;
  }
  code.block {
    display: block;
    background: #1c1c1c;
    border-radius: 3px;
    color: LightGray;
    font-family: monospace;
    font-size: 1em;
    margin: 0.5rem;
    padding: 0.2em 0.4em;
  }
</style>
