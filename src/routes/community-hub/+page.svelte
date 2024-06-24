<script lang="ts">
  import type { LanguageKeys } from '../../types'
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
  import { faLink, faBook } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa/src/fa.svelte'
  import Fuse from 'fuse.js'
  import SocialIcon from '$lib/SocialIcon.svelte'
  import { iconMapping } from '$lib/iconMapping'

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

  const getLabelObject = (labelName: string) => {
    return data.availableLabels.find((label) => label.label === labelName)
  }

  const toggleLabelFilter = (label: string) => () => {
    const foundLabel = data.availableLabels.find((x) => x.label == label)
    if (foundLabel) {
      foundLabel.activated = !foundLabel.activated
      data.availableLabels = [...data.availableLabels]
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

  const LanguageFlag: Record<LanguageKeys, string> = {
    en: 'gb',
    de: 'de',
    fr: 'fr',
    es: 'es',
    it: 'it',
    ja: 'jp',
    ko: 'kr',
    nl: 'nl',
    pl: 'pl',
    pt: 'pt',
    ru: 'ru',
    zh: 'cn',
    sv: 'se',
    no: 'no',
    da: 'dk',
    fi: 'fi',
    hu: 'hu',
    cs: 'cz',
    tr: 'tr',
    th: 'th',
    ar: 'sa',
    he: 'il',
    el: 'gr',
    id: 'id',
    vi: 'vn',
    ro: 'ro',
    bg: 'bg',
    uk: 'ua',
    ms: 'my',
    hr: 'hr',
    sk: 'sk',
    sl: 'si',
    et: 'ee',
    lv: 'lv',
    lt: 'lt',
    sr: 'rs',
    tl: 'ph',
    is: 'is',
    ga: 'ie',
    sq: 'al',
    bs: 'ba',
    mk: 'mk',
    mt: 'mt',
    cy: 'cy',
    be: 'by',
  }

  const LanguageName: Record<LanguageKeys, string> = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    nl: 'Dutch',
    pl: 'Polish',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
    sv: 'Swedish',
    no: 'Norwegian',
    da: 'Danish',
    fi: 'Finnish',
    hu: 'Hungarian',
    cs: 'Czech',
    tr: 'Turkish',
    th: 'Thai',
    ar: 'Arabic',
    he: 'Hebrew',
    el: 'Greek',
    id: 'Indonesian',
    vi: 'Vietnamese',
    ro: 'Romanian',
    bg: 'Bulgarian',
    uk: 'Ukrainian',
    ms: 'Malay',
    hr: 'Croatian',
    sk: 'Slovak',
    sl: 'Slovenian',
    et: 'Estonian',
    lv: 'Latvian',
    lt: 'Lithuanian',
    sr: 'Serbian',
    tl: 'Tagalog',
    is: 'Icelandic',
    ga: 'Irish',
    sq: 'Albanian',
    bs: 'Bosnian',
    mk: 'Macedonian',
    mt: 'Maltese',
    cy: 'Welsh',
    be: 'Belarusian',
  }
</script>

<MetaHead title="Community Hub" />

<div class="header">
  <h1>Community Hub</h1>
  <div class="filter-dropdown-anchor">
    <div class="filter-button" on:click={() => toggleFilterDropdown()}>Filter</div>
    <div class="filter-dropdown" style={showFilterdropdown ? 'display: block' : 'display: none;'}>
      <input
        class="search-text-field"
        type="text"
        placeholder="Search"
        on:input={updateNameAndDescriptionFilter}
      />
      <div class="labels">
        {#each data.availableLabels as label}
          <div
            class={label.activated ? 'label active' : 'label'}
            style="border-color: {getLabelObject(label.label)?.color};"
            on:click={toggleLabelFilter(label.label)}
          >
            {label.label}
          </div>
        {/each}
      </div>
      <div class="social-filter-bar">
        {#each Object.entries(iconMapping) as [name, icon]}
          <span
            class="social-filter-button {filteredForSocials.includes(name) ? 'active' : 'inactive'}"
            title={name}
            on:click={toggleSocialFilter(name)}
          >
            <SocialIcon social={name} noLink={true} />
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>
<hr class="fade" />
<p>
  Want to be featured in our Community Hub? <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSdX7t87EOWahI_n8Tlhi_bkaq1xcp-55po-gNtYSbyPiBQK5w/viewform"
    >Fill out this form!</a
  >
</p>
<br />
<div class="grid">
  {#each filteredCommunities as community, communityIndex (community)}
    <div class="community-card activity-{community.activityLevel}">
      <h2>
        {community.name}

        {#each community.languages as language}
          {#if language != 'en'}
            &nbsp;<span
              title="{LanguageName[language]} speaking server"
              class="fi fi-{LanguageFlag[language]}"
            />
          {/if}
        {/each}
      </h2>
      <div class="community-content">
        <div class="community-image">
          {#if community.image}
            <img
              class={community.circleFrameImage ? 'circle-radius-cut' : ''}
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
              <span class="label" style="border-color: {getLabelObject(label)?.color};"
                >{label}</span
              >
            {/each}
          </div>
          <p class="community-description">{community.description}</p>
        </div>
      </div>
      <div class="social-icons">
        {#each community.socials as social, socialIndex (`${communityIndex}-${socialIndex}-${social.name}`)}
          <SocialIcon social={social.name} link={social.url} titleOverwrite={social.title} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/variables';
  @import '/node_modules/flag-icons/css/flag-icons.min.css';

  .filter-dropdown-anchor {
    position: relative;
  }

  .flag {
    cursor: default;
  }

  $dialogPadding: 0.7rem;
  $dialogOverhangingWith: 3rem;
  .filter-dropdown {
    position: absolute;
    top: 2.5rem;
    left: -($dialogPadding * 2) - $dialogOverhangingWith - 4rem;
    width: 10rem + $dialogOverhangingWith;
    background-color: $color-background-secondary;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid $color-background-tertiary;
    border-radius: $rounding-small;
    padding: $dialogPadding;
    z-index: 1;

    .labels {
      flex-wrap: wrap;

      .label {
        text-align: center;
        background-color: $color-background-secondary;
        margin: 0;
        flex-grow: 1;

        transition: background-color $transition-short;

        &:hover {
          cursor: pointer;
          background-color: mix($color-background-secondary, $color-background-tertiary, 50%);
        }

        &.active {
          background-color: $color-background-tertiary;
        }
      }
    }
  }

  $searchPadding: 0.5rem;
  .search-text-field {
    width: 10rem + $dialogOverhangingWith - (2 * $searchPadding);
    padding: 0.5rem;
    margin-bottom: 0.75rem;
    border-radius: $rounding-small;
    border: none;
  }

  .header {
    display: flex;
    align-items: center;
  }

  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
  }

  .social-filter-bar {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .social-filter-button {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    color: $color-text-primary;
    transition: background-color $transition-short;
    border-radius: $rounding-small;

    &:hover {
      cursor: pointer;
      background-color: mix($color-background-secondary, $color-background-tertiary, 50%);
    }

    &.active {
      background-color: $color-background-tertiary;
    }
  }

  h1 {
    flex: 1;
    font-size: 2rem;
    text-align: left;
  }

  .filter-button {
    background-color: $color-bsaber-purple;
    border-radius: $rounding-small;
    padding: 0.3rem 1rem;

    transition: background-color $transition-short;

    &::after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.15em;
      content: '';
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }

    &:hover {
      cursor: pointer;
      background-color: lighten($color-bsaber-purple, 5%);
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
    gap: 0.75rem;
  }

  .community-card {
    background: $color-background-secondary;
    border-radius: $rounding-large;
    overflow: hidden;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    &.activity-high {
      animation: colorTransition 3s linear infinite alternate;
    }

    @keyframes colorTransition {
      0%,
      100% {
        box-shadow: 0 0 15px 5px $color-bsaber-purple;
      }
      50% {
        box-shadow: 0 0 15px 5px $color-difficulty-purple;
      }
    }
  }

  .community-content {
    display: flex;
    flex-grow: 1;
  }

  .community-image {
    margin-right: 20px;
    flex-shrink: 0;

    img {
      &.circle-radius-cut {
        border-radius: 50%;
        object-fit: cover;
      }

      width: 100px;
      height: 100px;
    }
  }

  .community-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .labels {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    user-select: none;
  }

  .label {
    font-size: 0.75rem;
    border-radius: 1.5rem;
    background-color: $color-background-tertiary;
    border: 1px solid;
    padding: 0.125rem 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .community-description {
    flex-grow: 1;
  }

  .social-icons {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    color: inherit;
    gap: 0.25rem;
  }
</style>
