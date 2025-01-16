<script lang="ts">
  import Fa from 'svelte-fa'
  import { faDiscord } from '@fortawesome/free-brands-svg-icons'
  import { faPatreon } from '@fortawesome/free-brands-svg-icons'
  import { faYoutube } from '@fortawesome/free-brands-svg-icons'
  import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

  import { filterNsfw } from './storeNsfwPreference'
  import { nsfwToggleVisibility } from './storeNsfwPreference'

  function toggleNSFW() {
    filterNsfw.update((value) => !value)
  }
</script>

<footer>
  {#if $nsfwToggleVisibility}
    <div class="nsfw-toggle-container">
      <div class="nsfw-component" title="Toggle blur for NSFW covers if present">
        <span class="toggle-title">NSFW Filter:</span>
        <div class="toggle-wrapper" on:click={toggleNSFW}>
          <div class="toggle-pill" class:active={$filterNsfw}>
            <span class="toggle-status">{$filterNsfw ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <hr />
  <div class="footer-content">
    <div>
      <a href="https://bsaber.com">
        <img class="logo" alt="BeastSaber" src="/BeastSaber-LogoW.webp" /></a
      >
    </div>
    <div class="links-container">
      <ul>
        <li>
          <Fa icon={faDiscord} />&nbsp;
          <a class="links" href="https://discord.gg/5VaEjFeuny" target="_blank">Discord</a>
        </li>
        <li>
          <Fa icon={faPatreon} />&nbsp;
          <a class="links" href="https://www.patreon.com/BeastSaberNews" target="_blank">Patreon</a>
        </li>
        <li>
          <Fa icon={faYoutube} />&nbsp;
          <a class="links" href="https://youtube.com/@BeastSaberNews" target="_blank">YouTube</a>
        </li>
        <li>
          <Fa icon={faXTwitter} />&nbsp;<a
            class="links"
            href="https://x.com/BeastSaberNews"
            target="_blank">Twitter</a
          >
        </li>
      </ul>
    </div>
  </div>
</footer>

<style lang="scss">
  @import 'src/scss/variables';
  footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
  .footer-content {
    position: relative;
    text-align: center;
    padding: 1.5rem 0 0.5rem 0;
  }

  hr {
    width: 40%;
    margin: 0 auto;
    filter: brightness(45%);
  }

  .links-container {
    margin: 0.5rem;
  }

  .links {
    color: white;
    font-family: $font-poppins;
    font-size: 16px;
    line-height: 1.5;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .logo {
    height: 25px;
  }

  .nsfw-toggle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nsfw-component {
    text-align: center;
    margin: 0 1.5rem 1.5rem 1.5rem;
    width: max-content;
  }

  .toggle-title {
    color: white;
    font-weight: bold;
  }

  .toggle-wrapper {
    display: inline-block;
    cursor: pointer;
  }

  .toggle-pill {
    width: 60px;
    height: 25px;
    background-color: $color-danger-red;
    border-radius: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    transition: background-color 0.3s;
    margin-left: 5px;
  }

  .toggle-pill.active {
    background-color: $color-success-green;
  }

  .toggle-status {
    position: relative;
    z-index: 1;
  }
</style>
