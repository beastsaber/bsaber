<script lang="ts">
  import type { CommunityLabel } from '../../types'
  import type { CommunityHubSSRData } from './+page.server'
  import MetaHead from '$lib/MetaHead.svelte'
  import {
    faDiscord,
    faFacebook,
    faInstagram,
    faTwitch,
    faXTwitter,
    faYoutube,
    faReddit,
    faGithub,
  } from '@fortawesome/free-brands-svg-icons'
  import { faLink, faCaretDown } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
  import Fuse from 'fuse.js'

  const filterCommunities = (
    communities: CommunityHubSSRData['communities'],
    labelSettings: CommunityHubSSRData['availableLabels'],
    filteredForSocials: string[],
    filterForNameAndDescription: string,
  ) => {
    const activeLabels = labelSettings.filter((label) => label.activated)

    const hardFilteredCommunities = communities.filter((community) => {
      const hasAllActiveLabels = activeLabels.every((activeLabel) =>
        community.labels.includes(activeLabel.label),
      )
      const hasAllFilteredSocials = filteredForSocials.every((social) =>
        community.socials.some((x) => x.name === social),
      )

      return hasAllActiveLabels && hasAllFilteredSocials
    })
    if (filterForNameAndDescription === '') {
      return hardFilteredCommunities
    }

    const fuse = new Fuse(hardFilteredCommunities, {
      keys: ['name', 'description'],
      includeScore: true,
      threshold: 0.3,
    })

    return fuse.search(filterForNameAndDescription).map(({ item }) => {
      return {
        ...item,
      }
    })
  }

  export let data: CommunityHubSSRData
  let nameAndDescriptionFilter = ''
  let filteredForSocials: string[] = []
  let filteredCommunities = filterCommunities(
    data.communities,
    data.availableLabels,
    filteredForSocials,
    nameAndDescriptionFilter,
  )
  let showFilterdropdown = false

  const iconMapping = {
    Discord: faDiscord,
    'Twitter/X': faXTwitter,
    Facebook: faFacebook,
    Instagram: faInstagram,
    Twitch: faTwitch,
    YouTube: faYoutube,
    Reddit: faReddit,
    GitHub: faGithub,
    Website: faLink,
  }

  const getLabelObject = (labelName: string) => {
    return data.availableLabels.find((label) => label.label === labelName)
  }

  const toggleLabelFilter = (label: string) => () => {
    const foundLabel = data.availableLabels.find((x) => x.label == label)
    if (foundLabel) {
      foundLabel.activated = !foundLabel.activated
      data.availableLabels = [...data.availableLabels]
      console.log(data.availableLabels)
    }

    filteredCommunities = filterCommunities(
      data.communities,
      data.availableLabels,
      filteredForSocials,
      nameAndDescriptionFilter,
    )
  }

  const toggleSocialFilter = (social: string) => () => {
    if (filteredForSocials.includes(social)) {
      filteredForSocials = filteredForSocials.filter((x) => x !== social)
    } else {
      filteredForSocials = [...filteredForSocials, social]
    }

    filteredCommunities = filterCommunities(
      data.communities,
      data.availableLabels,
      filteredForSocials,
      nameAndDescriptionFilter,
    )
  }

  let debounceTimeout: any = null
  const updateNameAndDescriptionFilter = (event: InputEvent) => {
    if (debounceTimeout != null) {
      clearTimeout(debounceTimeout)
    }
    nameAndDescriptionFilter = (event.target as HTMLInputElement).value
    debounceTimeout = setTimeout(() => {
      console.log(nameAndDescriptionFilter)
      filteredCommunities = filterCommunities(
        data.communities,
        data.availableLabels,
        filteredForSocials,
        nameAndDescriptionFilter,
      )
    }, 300)
  }

  // Located here to be able to remove the event listener
  const outsideDropdownClickEventListener = (event: MouseEvent) => {
    const dropdown = document.querySelector('.filter-dropdown') as HTMLDivElement
    const clickedOutside = !dropdown.contains(event.target as Node)

    if (clickedOutside) {
      document.body.removeEventListener('click', outsideDropdownClickEventListener)
      showFilterdropdown = false
    }
  }

  const openFilterDropdown = () => {
    showFilterdropdown = true

    // Requeueing the addition of the event listener to the next event loop
    // Otherwise, it will not open the dropdown, as it triggers immediately after the click event
    setTimeout(() => {
      document.body.addEventListener('click', outsideDropdownClickEventListener)
    }, 0)
  }

  const closeFilterDropdown = () => {
    showFilterdropdown = false
    document.body.removeEventListener('click', outsideDropdownClickEventListener)
  }

  const toggleFilterDropdown = () => {
    if (showFilterdropdown) {
      closeFilterDropdown()
    } else {
      openFilterDropdown()
    }
  }
</script>

<MetaHead title="Community Hub" />

<div class="header-line">
  <h1>Community Hub</h1>
  <div class="filter-dropdown-anchor">
    <div class="filter-button" on:click={() => toggleFilterDropdown()}>
      Filter by Type &nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown} />
    </div>
    <div class="filter-dropdown" style={showFilterdropdown ? 'display: block' : 'display: none;'}>
      <input class="search-text-field" type="text" on:input={updateNameAndDescriptionFilter} />
      {#each data.availableLabels as label}
        <div
          class={label.activated ? 'label active' : 'label inactive'}
          style="border-color: {getLabelObject(label.label)?.color};"
          on:click={toggleLabelFilter(label.label)}
        >
          {label.label}
        </div>
      {/each}
      <div class="social-filter-bar">
        {#each Object.entries(iconMapping) as [name, icon]}
          <span
            class="social-filter-button {filteredForSocials.includes(name) ? 'active' : 'inactive'}"
            title={name}
            on:click={toggleSocialFilter(name)}
          >
            <FontAwesomeIcon {icon} />
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>
<div class="grid">
  {#each filteredCommunities as community}
    <div class="community-card">
      <h2>{community.name}</h2>
      <div>
        <div class="community-image">
          {#if community.image}
            <img
              src={community.image.substring(community.image.indexOf('/static/') + 7)}
              alt={community.name}
            />
          {:else}
            <img src="/beastsaber-logo-fullsize-square.jpg" alt="No Image available" />
          {/if}
        </div>
        <div class="community-info">
          <div class="labels">
            {#each community.labels as label}
              <span
                class={data.availableLabels.find((x) => x.label == label)?.activated
                  ? 'label active'
                  : 'label inactive'}
                style="border-color: {getLabelObject(label)?.color};">{label}</span
              >
            {/each}
          </div>
          <p class="community-description">{community.description}</p>
          <div class="social-icons">
            {#each community.socials as social}
              <a href={social.url} title={social.name}
                ><FontAwesomeIcon icon={iconMapping[social.name]} /></a
              >
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .filter-dropdown-anchor {
    position: relative;
  }

  $dialogPadding: 0.7rem;
  $dialogOverhangingWith: 3rem;
  .filter-dropdown {
    position: absolute;
    top: 2.5rem;
    left: -($dialogPadding * 2) - $dialogOverhangingWith;
    width: 10rem + $dialogOverhangingWith;
    background-color: #777;
    box-shadow: 0px 1px 5px 0px #999;
    border-radius: $card-border-radius;
    padding: $dialogPadding;
    z-index: 1;

    .label {
      text-align: center;
      $backgroundActive: #999;
      $backgroundInactive: #555;
      margin-top: 0.5rem;

      transition-property: background-color;
      transition-duration: 0.2s;

      &.active {
        background-color: $backgroundActive;
      }

      &.inactive {
        background-color: $backgroundInactive;
      }

      &.inactive:hover {
        cursor: pointer;
        background-color: $backgroundActive;
      }

      &.active:hover {
        cursor: pointer;
        background-color: $backgroundInactive;
      }
    }
  }

  $searchPadding: 0.5rem;
  .search-text-field {
    width: 10rem + $dialogOverhangingWith - (2 * $searchPadding);
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: $card-border-radius;
    border: none;
  }

  .header-line {
    display: flex;
    border-bottom: 1px solid white;
    margin-bottom: 2rem;
    align-items: center;
  }

  .social-filter-bar {
    margin-top: 1rem;
  }

  .social-filter-button {
    display: inline-block;
    padding: 1rem;
    width: 1rem;
    margin: 0.05rem;
    color: #fff;
    transition-property: background-color color;
    transition-duration: 0.2s;
    border-radius: $card-border-radius;

    &.active {
      background-color: $color-bsaber-purple;
    }

    &:hover {
      cursor: pointer;
      color: #ccc;
      background-color: $color-bsaber-purple;
    }
  }

  h1 {
    flex: 1;
    flex-grow: 1;
    margin-bottom: 0.3rem;
    font-size: 2rem;
    text-align: left;
  }

  .filter-button {
    background-color: $color-bsaber-purple-highlight;
    border-radius: $card-border-radius;
    padding: 0.3rem 1rem;

    transition-property: background-color;
    transition-duration: 0.2s;

    &:hover {
      cursor: pointer;
      background-color: $color-bsaber-purple;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
  }

  .community-card {
    background: $background-tertiary;
    border-radius: $card-border-radius;
    overflow: hidden;
    padding: 1.2rem;
    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }

  .community-image img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
    float: left;
  }

  .community-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .labels {
    margin-bottom: 0.7rem;
    user-select: none;
  }

  .label {
    padding: 1px 10px;
    margin-right: 5px;
    border: 2px solid transparent;
    border-radius: 20px;
    background-color: #555;
    font-size: 0.8em;
  }

  .community-description {
    flex: 1;
    flex-grow: 1;
  }

  .social-icons {
    margin-top: 1rem;
    display: flex;
    align-content: end;
    justify-content: end;
    color: inherit;
    a {
      margin-right: 10px;
      color: inherit;
    }
  }
</style>
