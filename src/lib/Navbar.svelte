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
      expanded: false,
      Items: [
        {
          name: 'Beat Saber',
          href: '/getting-started',
        },
        {
          name: 'Custom Songs',
          href: '/getting-started/custom-songs',
        },
        {
          name: 'Custom Mods',
          href: '/installing-the-mod-guide-necessary-for-any-custom-songs',
        },
        {
          name: 'Mapping',
          href: '/posts/getting-started-with-mapping',
        },
      ],
    },
    {
      name: 'Find Maps',
      expanded: false,
      Items: [
        {
          name: 'Curator Recommended',
          href: 'https://beatsaver.com/?order=Curated&curated=true',
        },
        {
          name: 'Verified Mappers',
          href: 'https://beatsaver.com/?verified=true',
        },
        {
          name: 'Ranked',
          href: 'https://beatsaver.com/?ranked=true',
        },
      ],
    },
    {
      name: 'Find Playlists',
      expanded: false,
      Items: [
        {
          name: 'Curated Playlists',
          href: 'https://beatsaver.com/playlists?order=Curated&curated=true',
        },
        {
          name: 'All Playlists',
          href: 'https://beatsaver.com/playlists',
        },
      ],
    },
    {
      name: 'The Beasties',
      expanded: false,
      Items: [
        {
          name: 'About the Awards',
          href: '/the-beastsaber-mapping-awards',
        },
        {
          name: 'Voting',
          href: 'https://forms.gle/v69wKinCfZzVHfZ17',
        },
        {
          name: '2023 Winners',
          href: '/posts/the-beasties-2023-winners',
        },
        {
          name: '2022 Winners',
          href: '/posts/the-beasties-2022-winners',
        },
        {
          name: '2021 Winners',
          href: '/posts/the-beasties-2021-winners',
        },
      ],
    },
    {
      name: 'Models',
      expanded: false,
      Items: [
        {
          name: 'Avatars',
          href: 'https://modelsaber.com/Avatars/',
        },
        {
          name: 'Sabers',
          href: 'https://modelsaber.com/Sabers/',
        },
        {
          name: 'Notes',
          href: 'https://modelsaber.com/Bloqs/',
        },
        {
          name: 'Platforms',
          href: 'https://modelsaber.com/Platforms/',
        },
      ],
    },
    {
      name: 'Posts & Info',
      expanded: false,
      Items: [
        {
          name: 'Posts',
          href: '/posts/page/1',
        },
        {
          name: 'Mappers',
          href: 'https://beatsaver.com/mappers',
        },
        {
          name: 'About Curation',
          href: '/curation',
          Items: [
            {
              name: 'Curators',
              href: '/curation-team',
            },
          ],
        },
      ],
    },
    {
      name: 'Community Hub',
      href: '/community-hub',
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

  const slideInOnMobile = (element: Element) => {
    if (windowSize > 1100) return {} // undefined would be a type issue...
    return slide(element, { duration: 150 }) as __sveltets_2_SvelteTransitionReturnType
  }
</script>

<svelte:window
  bind:innerWidth={windowSize}
  on:touchstart={closeDropdownMenus}
  on:click={closeDropdownMenus}
/>

<nav class="navbar">
  <div class="container">
    <a id="home-link" rel="external" href="/">
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
        transition:slideInOnMobile
        class:fixed-nav={windowSize <= 1100}
        id="navbar-menu"
        bind:this={navbarMenu}
      >
        <ul class="navbar-list">
          {#each navbarDropdownItems as item, index}
            {#if item.Items}
              <li class="nav-item">
                <div class="nav-link">
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a
                    href=""
                    rel="external"
                    on:click|preventDefault|stopPropagation={() =>
                      toggleDropdown(item, `dropdown-menu-${index}`)}
                    ><span
                      >{item.name}
                      <div class="dropdown-toggle" /></span
                    >
                  </a>
                </div>
                {#if item.expanded}
                  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                  <div
                    transition:slide={{ duration: 150 }}
                    id="dropdown-menu-{index}"
                    class="dropdown-menu"
                  >
                    {#each item.Items as navItem}
                      <a href={navItem.href} rel="external" class="dropdown-item">{navItem.name}</a>
                      {#if navItem.dividerAfter}
                        <div class="dropdown-divider" />
                      {/if}
                      {#if navItem.Items}
                        {#each navItem.Items as navSubItem}
                          <a href={navSubItem.href} rel="external" class="dropdown-item sub-item"
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
                <a href={item.href} rel="external" class="nav-link">{item.name}</a>
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
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: $navbar-height;
    background: linear-gradient(90deg, #b52a1c 0%, #454088 27.08%, #454088 72.92%, #1268a1 100%);
    z-index: 20;
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
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: $rounding-small;
    background: $color-background-secondary;
  }

  .dropdown-menu {
    position: static;
    display: flex;
    flex-direction: column;
    min-width: 10rem;
    color: $color-text-primary;
    background-color: $color-background-primary;
    list-style: none;
    z-index: 2;
  }

  .dropdown-item {
    width: 100%;
    font-weight: 400;
    color: $color-text-primary;
    text-decoration: none;
    padding: 0.5rem 2rem;

    &:hover,
    &:focus {
      background-color: lighten($color-bsaber-purple, 5%);
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
    line-height: 1.25rem;

    .nav-link {
      display: block;
      padding: 0 1rem;
      font-weight: 600;
      font-family: $font-poppins;
      text-transform: uppercase;
      text-decoration: none;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
      color: $color-text-primary;
      a {
        color: $color-text-primary;
      }
      box-sizing: content-box;

      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
      }
    }
  }

  .dropdown-toggle {
    white-space: nowrap;
    display: inline-block;
    vertical-align: 0.255em;
    height: 100%;
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
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
      .nav-link {
        padding: unset;
      }
    }

    .dropdown-menu {
      position: absolute;
      padding: 0.5rem 0;
      margin-top: 0.5rem;
      text-align: left;
      list-style: none;
      background-color: $color-background-secondary;
      background-clip: padding-box;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: $rounding-small;
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
