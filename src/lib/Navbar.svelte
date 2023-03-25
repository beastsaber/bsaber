<script lang="ts">
  import { slide } from 'svelte/transition'

  let navbarMenu: HTMLElement | null = null
  let showMobileNavbar: boolean = false
  let windowSize: number
  let expandedDropdownId: string | null = null

  interface DropdownItem {
    name?: string
    expanded?: boolean
    Items?: any[]
  }

  let navbarDropdownItems: {
    name: string
    expanded?: boolean
    href?: string
    Items?: {
      name: string
      href: string
      dividerAfter?: boolean
      expanded?: boolean
      Items?: {
        name: string
        href: string
        dividerAfter?: boolean
      }[]
    }[]
  }[] = [
    {
      name: 'Get Started',
      href: '/getting-started',
    },
    {
      name: 'Find Maps',
      expanded: false,
      Items: [
        {
          name: 'Curator Recommended',
          href: 'https://beatsaver.com/?curated=true',
        },
        {
          name: 'Verified Mappers',
          href: 'https://beatsaver.com/?verified=true',
        },
        {
          name: 'Ranked',
          href: 'https://beatsaver.com/?ranked=true',
        },
        {
          name: 'Browse by Genre',
          href: '/browse', // future app page
        },
        {
          name: 'Curated Playlists',
          href: 'https://beatsaver.com/playlists?curated=true',
        },
        {
          name: 'All Playlists',
          href: 'https://beatsaver.com/playlists',
        },
      ],
    },
    {
      name: 'Find Playlists',
      expanded: false,
      Items: [
        {
          name: 'Curated Playlists',
          href: 'https://beatsaver.com/playlists?curated=true',
        },
        {
          name: 'All Playlists',
          href: 'https://beatsaver.com/playlists',
        },
      ],
    },
    {
      name: 'Models',
      expanded: false,
      Items: [
        {
          name: 'Avatars',
          href: '',
        },
        {
          name: 'Sabers',
          href: '',
        },
        {
          name: 'Blocks',
          href: '',
        },
        {
          name: 'Walls',
          href: '',
        },
      ],
    },
    {
      name: 'News & Info',
      expanded: false,
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
      name: 'Community Hub',
      expanded: false,
      Items: [
        {
          name: 'Mappers',
          href: 'https://beatsaver.com/mappers',
        },
        {
          name: 'Curators',
          href: '/curation-team',
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
      ],
    },
  ]

  const toggleDropdown = (selectedItem: DropdownItem, dropdownId: string) => {
    if (selectedItem.expanded) {
      selectedItem.expanded = false
      navbarDropdownItems = navbarDropdownItems
      return
    }
    collapseAllDropdowns()
    expandDropdown(selectedItem, dropdownId, true)
  }

  const expandDropdown = (dropdownItem: DropdownItem, dropdownId: string, forceUpdate = false) => {
    dropdownItem.expanded = true
    expandedDropdownId = dropdownId
    if (forceUpdate) navbarDropdownItems = navbarDropdownItems
  }

  const collapseAllDropdowns = (forceUpdate = false) => {
    navbarDropdownItems.forEach((item) => (item.expanded = false))
    expandedDropdownId = null
    if (forceUpdate) navbarDropdownItems = navbarDropdownItems
  }

  const closeDropdownMenus = (e: Event) => {
    // Mobile navbar not being shown
    if (windowSize > 1100) {
      const dropdownMenu = navbarMenu?.querySelector(`#${expandedDropdownId}`)
      if (dropdownMenu?.contains(e?.target as Node)) return
    } else if (showMobileNavbar) {
      // width <= 1100px and mobile menu is visible
      const menu = navbarMenu?.querySelector('.navbar-list')
      const menuContainsClickedTarget = menu?.contains(e?.target as Node)
      const targetIsToggler = (e?.target as Element)?.hasAttribute('data-toggler')
      if (menuContainsClickedTarget || targetIsToggler) return
    }
    collapseAllDropdowns(true)
    showMobileNavbar = false
  }
</script>

<svelte:window bind:innerWidth={windowSize} on:click={closeDropdownMenus} />

<nav class="navbar">
  <div class="container">
    <a id="home-link" href="/">
      <img alt="BeastSaber" src="/beastsaber-logo.svg" />
    </a>
    <button
      type="button"
      class="navbar-toggler"
      on:click={() => (showMobileNavbar = !showMobileNavbar)}
      data-target="navbar-menu"
      data-toggler=""
      aria-controls="navbar-menu"
      aria-expanded={showMobileNavbar ? 'true' : 'false'}
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" data-toggler="" />
    </button>
    {#if windowSize > 1100 || showMobileNavbar}
      <div
        transition:slide={{ duration: 150 }}
        class:fixed-nav={windowSize <= 1100}
        id="navbar-menu"
        bind:this={navbarMenu}
      >
        <ul class="navbar-list">
          {#each navbarDropdownItems as item, index}
            {#if item.Items}
              <li class="nav-item">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a
                  href=""
                  class="nav-link dropdown-toggle"
                  on:click|preventDefault|stopPropagation={() =>
                    toggleDropdown(item, `dropdown-menu-${index}`)}>{item.name}</a
                >
                {#if item.expanded}
                  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                  <div
                    transition:slide={{ duration: 150 }}
                    id="dropdown-menu-{index}"
                    class="dropdown-menu"
                  >
                    {#each item.Items as navItem}
                      <a href={navItem.href} class="dropdown-item">{navItem.name}</a>
                      {#if navItem.dividerAfter}
                        <div class="dropdown-divider" />
                      {/if}
                      {#if navItem.Items}
                        {#each navItem.Items as navSubItem}
                          <a href={navSubItem.href} class="dropdown-item sub-item"
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

<style lang="scss">
  @import 'src/scss/variables';

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  button,
  [type='button'] {
    &:not(:disabled) {
      cursor: pointer;
    }
  }

  .navbar {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: $navbar-height;
    background: linear-gradient(90deg, #b52a1c 0%, #454088 27.08%, #454088 72.92%, #1268a1 100%);
    z-index: 2;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1356px;
    max-width: 100%;
    padding: 0 0.75rem;
    margin: 0 auto;
  }

  .fixed-nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 16rem;
    padding: 1rem 0;
    margin-top: calc($navbar-height - 10px);
    margin-right: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: $rounding;
    background: $background-primary;
  }

  .dropdown-menu {
    position: static;
    display: flex;
    flex-direction: column;
    min-width: 10rem;
    color: $color-primary-text;
    background-color: $background-primary;
    list-style: none;
    z-index: 2;
  }

  .dropdown-item {
    width: 100%;
    font-weight: 400;
    color: $color-primary-text;
    text-decoration: none;
    padding: 0.5rem 2rem;

    &:hover,
    &:focus {
      background-color: #5f58b9;
    }
    &.sub-item {
      padding-left: 3rem;
    }
  }

  .dropdown-divider {
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  .navbar-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
    gap: 1.25rem;
  }

  .nav-item {
    font-size: 1.25rem;
    line-height: 1.4375rem;
  }

  .nav-link {
    display: block;
    padding: 0 1rem;
    font-weight: 600;
    font-family: $font-poppins;
    text-transform: uppercase;
    text-decoration: none;
    color: $color-primary-text;

    &:hover,
    &:focus {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
    }
  }

  .dropdown-toggle {
    white-space: nowrap;
    &:after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: '';
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
  }

  .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.25rem;
    transition: box-shadow 0.15s ease-in-out;
    color: rgba(255, 255, 255, 0.55);

    &:focus {
      outline: 0;
      text-decoration: none;
      box-shadow: 0 0 0 0.25rem;
    }
  }

  .navbar-toggler-icon {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    background-image: url('/navbar_menu_icon.svg');
  }

  @media (min-width: 1100px) {
    #home-link {
      margin-right: 1.25rem;
      > img {
        height: 1.75rem;
      }
    }

    .container {
      justify-content: flex-start;
    }

    .navbar {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }

    .navbar-toggler {
      display: none;
    }

    .navbar-list {
      flex-direction: row;
    }

    .nav-item {
      font-size: 1rem;
      line-height: 1.1875rem;
    }

    .nav-link {
      padding: unset;
    }

    .dropdown-menu {
      position: absolute;
      padding: 1rem 0;
      margin-top: 0.5rem;
      text-align: left;
      list-style: none;
      background-color: #222222;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: $rounding;
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      &.sub-item {
        padding-left: 1.75rem;
      }
    }
  }

  @media (min-width: 1356px) {
    .navbar-list {
      gap: 2.5rem;
    }

    #home-link {
      margin-right: 2.5rem;
      > img {
        height: 2.25rem;
      }
    }
  }
</style>
