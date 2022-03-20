<script lang="ts">
  import { width } from '@fortawesome/free-solid-svg-icons/faStar'
  import { slide } from 'svelte/transition'

  let navbarDropdownItems: {
    name: string
    show?: boolean
    href?: string
    Items?: {
      name: string
      href: string
      dividerAfter?: boolean
      show?: boolean
      Items?: {
        name: string
        href: string
        dividerAfter?: boolean
      }[]
    }[]
  }[] = [
    {
      name: 'Get Started',
      href: '',
    },
    {
      name: 'Find Maps',
      show: false,
      Items: [
        {
          name: 'Curator Recommended',
          href: 'https://beatsaver.com/?curated=true',
        },
        {
          name: 'Verified Mappers',
          href: '',
        },
        {
          name: 'Ranked',
          href: 'https://beatsaver.com/?ranked=true',
        },
        {
          name: 'Browse by Genre',
          href: '',
        },
      ],
    },
    {
      name: 'Playlists',
      show: false,
      Items: [
        {
          name: 'Cureated Playlists',
          href: '',
        },
        {
          name: 'All Playlists',
          href: '',
        },
      ],
    },
    {
      name: 'News & Info',
      show: false,
      Items: [
        {
          name: 'News',
          href: '',
        },
        {
          name: 'Interviews',
          href: '',
        },
        {
          name: 'Tutorials',
          href: '',
          Items: [
            {
              name: 'Mapping Resources',
              href: '',
            },
          ],
        },
        {
          name: 'Events',
          href: '',
        },
        {
          name: 'Videos',
          href: '',
        },
      ],
    },
    {
      name: 'Community',
      show: false,
      Items: [
        {
          name: 'Community Hub',
          href: '#',
        },
        {
          name: 'Mappers',
          href: 'https://beatsaver.com/mappers',
        },
        {
          name: 'Curators',
          href: '',
          Items: [
            {
              name: 'About Curation',
              href: '',
            },
          ],
        },
        {
          name: 'The Beasties',
          href: '',
          Items: [
            {
              name: 'Past Winners',
              href: '',
            },
          ],
        },
      ],
    },
    {
      name: 'Help',
      Items: [
        {
          name: 'Terms of Service',
          href: '#',
        },
        {
          name: 'BSMG Wiki',
          href: 'https://bsmg.wiki',
        },
        {
          name: 'BSMG Discord',
          href: 'https://discord.gg/beatsabermods',
        },
        {
          name: 'BeastSaber Discord',
          href: 'https://discord.gg/VJZHUbt',
          dividerAfter: true,
        },
        {
          name: 'GitHub',
          href: 'https://github.com/beastsaber/bsaber',
        },
      ],
    },
  ]

  // Function that toggles all other dropdown items to false
  function toggleDropdown(in_item: { name?: string; show?: boolean; Items?: any[] }) {
    let tempArray = navbarDropdownItems // Copy the array because svelte doesn't like to change arrays
    tempArray.forEach(function (item, index) {
      if (item !== in_item) {
        this[index].show = false
      } else {
        this[index].show = !in_item.show
        console.log(in_item)
        console.log(this[index].show)
      }
    }, tempArray)
    navbarDropdownItems = tempArray
  }

  let showNavbarMobile = false

  let windowSize

  function toggleOff() {
    let tempArray = navbarDropdownItems
    tempArray.forEach(function (item, index) {
      this[index].show = false
    }, tempArray)
    navbarDropdownItems = tempArray
  }
</script>

<svelte:window bind:innerWidth={windowSize} />

<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
  <div class="container">
    <a href="/" class="navbar-brand" id="home-link"
      ><img alt="BeatSaver" src="/BeastSaber-LogoW.webp" title="BeatSaver" height="23px" /></a
    >
    <button
      type="button"
      class="navbar-toggler"
      id="navbar-button"
      on:click={() => (showNavbarMobile = !showNavbarMobile)}
      data-toggle="collapse"
      data-target="navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"><span class="navbar-toggler-icon" /></button
    >
    {#if windowSize > 992 || showNavbarMobile}
      <div transition:slide class="collapse navbar-collapse show" id="navbar">
        <ul class="navbar-nav me-auto">
          {#each navbarDropdownItems as item}
            {#if item.Items}
              <li class="nav-item dropdown">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a
                  href=""
                  class="nav-link dropdown-toggle show"
                  on:click={() => toggleDropdown(item)}>{item.name}</a
                >
                {#if item.show}
                  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                  <div
                    transition:slide
                    class="dropdown-menu {item.show ? 'show' : ''}"
                    on:mouseleave={() => toggleOff()}
                  >
                    {#each item.Items as navItem}
                      <a href={navItem.href} class="dropdown-item">{navItem.name}</a>
                      {#if navItem.dividerAfter}
                        <div class="dropdown-divider" />
                      {/if}

                      {#if navItem.Items}
                        {#each navItem.Items as navSubItem}
                          <a href={navSubItem.href} class="dropdown-item subItem"
                            >{navSubItem.name}</a
                          >

                          {#if navSubItem.dividerAfter}
                            <div class="dropdown-divider" />
                          {/if}
                        {/each}
                      {/if}
                    {/each}
                  </div>
                {/if}
              </li>
            {:else}
              <li class="nav-item">
                <a href={item.href} class="nav-link">{item.name}</a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</nav>

<style>
  .container {
    width: 100%;
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    margin-right: auto;
    margin-left: auto;
  }
  .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .dropdown-menu {
    position: absolute;
    z-index: 1000;
    display: block;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0;
    font-size: 1rem;
    color: #fff;
    text-align: left;
    list-style: none;
    background-color: #222222;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
  }
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: #fff;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }
  .dropdown-item:hover {
    background-color: #5f58b9;
  }
  .dropdown-item.subItem {
    padding-left: 2rem;
  }
  @media (min-width: 992px) {
    .navbar-expand-lg {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-lg .navbar-nav .nav-link {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
    .navbar-expand-lg .navbar-nav {
      flex-direction: row;
    }
    .navbar-expand-lg .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-lg .navbar-toggler {
      display: none;
    }
  }
  .fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
  .navbar-nav {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .bg-primary {
    --bs-bg-opacity: 1;
    background-color: #454088 !important;
  }
  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
  }
  .dropdown-toggle {
    white-space: nowrap;
  }
  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
  @media (min-width: 1400px) {
    .container {
      max-width: 1320px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  button:not(:disabled),
  [type='button']:not(:disabled) {
    cursor: pointer;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  /* a:hover {
    text-decoration: underline;
    text-decoration-line: underline;
    text-decoration-thickness: initial;
    text-decoration-style: initial;
    text-decoration-color: initial;
  } */
  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
    .navbar-expand-lg .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }
  }
  .navbar > .container {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
  }
  .navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
  }
  .navbar-brand {
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
  }
  .navbar-brand {
    color: #fff;
  }
  .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.55);
  }
  .navbar-nav .nav-link:hover {
    color: #fff;
  }
  button:focus:not(:focus-visible) {
    outline: 0;
    outline-color: initial;
    outline-style: initial;
    outline-width: 0px;
  }
  .navbar-nav .dropdown-menu {
    position: static;
  }
  .navbar-toggler:focus {
    text-decoration: none;
    outline: 0;
    box-shadow: 0 0 0 0.25rem;
  }
  .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: box-shadow 0.15s ease-in-out;
  }
  .navbar-dark .navbar-toggler {
    color: rgba(255, 255, 255, 0.55);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .navbar-toggler-icon {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .navbar-dark .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
  .dropdown-divider {
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
</style>
