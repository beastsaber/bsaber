<script lang="ts">
  import Fa from 'svelte-fa'
  import { faDiscord, faPatreon, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons'

  import { filterNsfw, nsfwToggleVisibility } from './storeNsfwPreference'

  function toggleNSFW() {
    filterNsfw.update((value) => !value)
  }
</script>

<footer class="site-footer">
  {#if $nsfwToggleVisibility}
    <div class="footer-utility">
      <button
        type="button"
        class="nsfw-toggle"
        class:active={$filterNsfw}
        onclick={toggleNSFW}
        role="switch"
        aria-checked={$filterNsfw}
        aria-label={$filterNsfw ? 'Disable NSFW filter' : 'Enable NSFW filter'}
        title="Toggle blur for NSFW covers if present"
      >
        <span class="toggle-title">NSFW Filter:</span>
        <span class="toggle-pill">
          <span class="toggle-status">{$filterNsfw ? 'ON' : 'OFF'}</span>
        </span>
      </button>
    </div>
  {/if}

  <div class="footer-content">
    <div class="footer-brand">
      <a href="https://bsaber.com" aria-label="BeastSaber">
        <img class="logo" alt="BeastSaber" src="/BeastSaber-LogoW.webp" />
      </a>
    </div>

    <nav class="footer-links" aria-label="Social media links">
      <ul>
        <li>
          <a
            href="https://discord.gg/5VaEjFeuny"
            target="_blank"
            rel="noopener noreferrer"
            title="Discord"
            aria-label="BeastSaber Discord"
          >
            <Fa icon={faDiscord} />
            <span>Discord</span>
          </a>
        </li>

        <li>
          <a
            href="https://www.patreon.com/BeastSaberNews"
            target="_blank"
            rel="noopener noreferrer"
            title="Patreon"
            aria-label="BeastSaber Patreon"
          >
            <Fa icon={faPatreon} />
            <span>Patreon</span>
          </a>
        </li>

        <li>
          <a
            href="https://youtube.com/@BeastSaberNews"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            aria-label="BeastSaber YouTube"
          >
            <Fa icon={faYoutube} />
            <span>YouTube</span>
          </a>
        </li>

        <li>
          <a
            href="https://x.com/BeastSaberNews"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            aria-label="BeastSaber Twitter"
          >
            <Fa icon={faXTwitter} />
            <span>Twitter</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</footer>

<style lang="scss">
  @import 'src/scss/variables';

  .site-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 0 0 auto;
    height: auto;
    min-height: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
    color: white;
    font-family: $font-poppins;
  }

  .footer-utility {
    display: flex;
    justify-content: center;
    margin-bottom: 0.85rem;
  }

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0 0.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  .footer-brand {
    display: flex;
    align-items: center;
    min-width: max-content;
  }

  .footer-brand a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  .logo {
    display: block;
    height: 25px;
    width: auto;
  }

  .footer-links ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.85rem;
  }

  .footer-links li {
    display: flex;
    align-items: center;
  }

  .footer-links a {
    color: white;
    font-family: $font-poppins;
    font-size: 16px;
    line-height: 1.5;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: opacity 0.15s ease-out;
  }

  .footer-links a:hover {
    opacity: 0.75;
  }

  .nsfw-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0;
    background: transparent;
    border: 0;
    color: white;
    font: inherit;
    cursor: pointer;
    white-space: nowrap;
  }

  .nsfw-toggle:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
    border-radius: 999px;
  }

  .toggle-title {
    color: white;
    font-weight: bold;
  }

  .toggle-pill {
    width: 60px;
    height: 25px;
    background-color: $color-danger-red;
    border-radius: 15px;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    transition:
      background-color 0.3s,
      opacity 0.15s ease-out;
  }

  .nsfw-toggle.active .toggle-pill {
    background-color: $color-success-green;
  }

  .nsfw-toggle:hover .toggle-pill {
    opacity: 0.85;
  }

  .toggle-status {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .footer-utility {
      margin-bottom: 0.75rem;
    }

    .footer-content {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      gap: 0.75rem;
      padding-top: 1rem;
    }

    .footer-links ul {
      justify-content: center;
      gap: 1rem;
    }

    .footer-links a {
      font-size: 18px;
      gap: 0;
    }

    .footer-links span {
      display: none;
    }

    .logo {
      height: 23px;
    }

    .toggle-title {
      font-size: 14px;
    }

    .toggle-pill {
      width: 56px;
      height: 24px;
      font-size: 13px;
    }
  }
</style>
