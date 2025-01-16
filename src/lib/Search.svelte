<script lang="ts">
  import { slide } from 'svelte/transition'
  import { filterNsfw } from './storeNsfwPreference'
  import { nsfwToggleVisibility } from './storeNsfwPreference'
  import { onMount, onDestroy } from 'svelte'

  onMount(() => {
    nsfwToggleVisibility.set(true)
  })

  onDestroy(() => {
    nsfwToggleVisibility.set(false)
  })

  const dropdownItems: {
    name: string
  }[] = [
    {
      name: 'Maps',
    },
    {
      name: 'Playlists',
    },
    {
      name: 'Content',
    },
  ]

  const beatsaverRoot = import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com' + '/'
  const beatsaverApiRoot =
    import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com' + '/'

  const mapsSearchApiEndpoint = `${beatsaverApiRoot}search/text/`
  const playlistsApiEndpoint = `${beatsaverApiRoot}playlists/search/`

  export let forceSearchType: string | null = null

  let searchType: string = forceSearchType ?? dropdownItems[0].name
  let searchQuery: string = ''
  let lastQuery: string = ''

  let dropdownShown: boolean = false

  let previewResults: {
    name: string
    uploader: string
    url: string
    image: string
    upvotes: number
    downvotes: number
    score: number
    nsfw?: boolean
  }[] = []

  let searchPreviewTimeout
  let searchButton: HTMLAnchorElement
  let searchUrl: string

  const getSearchUrl = (inputSearchType: string, inputSearchQuery: string) => {
    if (inputSearchType === dropdownItems[0].name) {
      return `${beatsaverRoot}?q=${inputSearchQuery}`
    } else if (inputSearchType === dropdownItems[1].name) {
      return `${beatsaverRoot}playlists?q=${inputSearchQuery}`
    }

    return '/posts/search?q=' + searchQuery
  }

  $: searchUrl = getSearchUrl(searchType, searchQuery)

  // Search function that opens a new url in the browser
  function search() {
    if (searchQuery === '') {
      return
    }

    searchButton.click()
  }

  function searchPreview(event?, force?: boolean) {
    clearTimeout(searchPreviewTimeout)
    lastQuery = searchQuery
    searchQuery = event ? event.target.value : searchQuery
    searchPreviewTimeout = setTimeout(() => {
      // We're checking if the query is the same as the last query to avoid making unnecessary requests
      if (searchQuery === lastQuery && !force) {
        return
      }
      // If the query is empty, we don't need to do anything
      previewResults = []
      if (searchQuery.length < 1) {
        return
      }
      if (searchType === dropdownItems[0].name) {
        fetch(`${mapsSearchApiEndpoint}0?q=${searchQuery}&sortOrder=Relevance`)
          .then((response) => response.json())
          .then((data) => {
            if (searchQuery !== '') {
              previewResults = data.docs.map((song) => {
                return {
                  name: song.name,
                  uploader: song.uploader.name,
                  url: `${beatsaverRoot}${searchType.toLowerCase()}/${song.id}`,
                  image: song.versions.at(-1).coverURL,
                  upvotes: song.stats.upvotes,
                  downvotes: song.stats.downvotes,
                  score: song.stats.score,
                  nsfw: song.nsfw,
                }
              })
            }
          })
      } else if (searchType === dropdownItems[1].name) {
        fetch(`${playlistsApiEndpoint}0?q=${searchQuery}&sortOrder=Relevance`)
          .then((response) => response.json())
          .then((data) => {
            if (searchQuery !== '') {
              previewResults = data.docs.map((playlist) => {
                return {
                  name: playlist.name,
                  uploader: playlist.owner.name,
                  url: `${beatsaverRoot}${searchType.toLowerCase()}/${playlist.playlistId}`,
                  image: playlist.playlistImage,
                  upvotes: playlist.stats.upVotes,
                  downvotes: playlist.stats.downVotes,
                  score: playlist.stats.avgScore,
                }
              })
            }
          })
      } else if (searchType === dropdownItems[2].name) {
        // No Op
      } else {
        alert('Unknown search type')
      }
    }, 400)
  }
</script>

<form on:submit|preventDefault={search}>
  <div class="search">
    {#if forceSearchType == null}
      <button
        class="filter-dropdown btn btn-primary dropdown-toggle"
        type="button"
        on:click={() => (dropdownShown = !dropdownShown)}
        id="dropdownMenuButton"
        aria-expanded={dropdownShown}
      >
        <i class="fas fa-angle-up" />
        <span class="d-none d-lg-inline">{searchType}</span>
      </button>
      <!-- </button> -->
      {#if dropdownShown}
        <div
          transition:slide={{ duration: 150 }}
          class="dropdown-menu filter"
          aria-labelledby="dropdownMenuButton"
        >
          {#each dropdownItems as item}
            <button
              type="button"
              class="dropdown-item"
              on:click={() => {
                searchType = item.name
                dropdownShown = false
                searchPreview(null, true)
              }}
            >
              {item.name}</button
            >
          {/each}
        </div>
      {/if}
    {/if}
    <input
      type="search"
      class="form-control"
      placeholder="Enter Keywords"
      on:input={searchPreview}
    />
  </div>
  {#if previewResults.length > 0}
    <div
      transition:slide={{ duration: 150 }}
      class="dropdown-menu dropdown-menu-list"
      aria-labelledby="dropdownMenuButton"
    >
      {#each previewResults as preview}
        <a class="dropdown-item" href={preview.url}>
          <div class="image-wrapper">
            <img src={preview.image} class:blur={$filterNsfw && preview.nsfw} alt="Map Thumbnail" />
          </div>
          <div class="dropdown-item-map-name">
            {preview.name}<br />
            <div class="dropdown-item-uploader">Uploaded by: {preview.uploader}</div>
            <div class="dropdown-item-stats">
              Upvotes: {preview.upvotes} - Downvotes: {preview.downvotes} - Rating: {(
                preview.score * 100
              ).toFixed(2)}%
            </div>
          </div></a
        >
      {/each}
    </div>
  {/if}
  <a class="btn btn-primary btn-search" href={searchUrl} bind:this={searchButton}>Search</a>
</form>

<style lang="scss">
  @import 'src/scss/variables';

  form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }
  .search {
    display: flex;
    flex-grow: 2;
  }
  .filter-dropdown {
    max-width: fit-content;
    background: none;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 0.25rem 0 0 0.25rem !important;
    text-align: left;
  }
  .dropdown-toggle {
    white-space: nowrap;
  }
  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.15em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
  .dropdown-menu {
    max-width: 100%;
    position: absolute;
    top: 2rem;
    left: 0;
    z-index: 1000;
    display: block;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #fff;
    text-align: left;
    list-style: none;
    background-color: $color-background-secondary;
    background-clip: padding-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.25rem;
  }
  .dropdown-menu-list {
    max-height: 25rem;
    width: 100%;
    overflow-y: auto;
  }
  .dropdown-menu.filter {
    z-index: 1100;
  }
  .dropdown-item {
    display: flex;
    width: 100%;
    padding: 0.5rem 1rem;
    clear: both;
    font-weight: 400;
    color: #fff;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }
  .image-wrapper {
    display: flex;
    overflow: hidden;
    border-radius: 5px;
  }
  .image-wrapper img {
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
  }
  .blur {
    filter: blur(5px);
  }
  a.dropdown-item {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a.dropdown-item:hover {
    text-decoration: none;
  }
  .dropdown-item:hover {
    background-color: lighten($color-bsaber-purple, 5%);
  }
  .dropdown-item-map-name {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 0.5rem;
  }
  .dropdown-item-uploader {
    padding-top: 0.15rem;
    font-size: small;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 5.5px;
  }
  .dropdown-item-stats {
    padding-top: 0.15rem;
    font-size: small;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 4.5px;
  }
  .form-control {
    display: block;
    flex-grow: 1;
    float: left;
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #303030;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #222;
    appearance: none;
    border-radius: 0 0.25rem 0.25rem 0;
    transition: border-color $transition-short ease-in-out, box-shadow $transition-short ease-in-out;
  }
  div,
  a,
  input {
    overflow: visible;
  }
  input:hover {
    color: lighten($color-bsaber-purple, 5%);
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    border-radius: 0.25rem;
    transition: color $transition-short ease-in-out, background-color $transition-short ease-in-out,
      border-color $transition-short ease-in-out, box-shadow $transition-short ease-in-out;
  }

  .btn-search {
    flex: 1 1 5rem;
  }

  .btn-primary {
    color: #fff;
    background-color: $color-bsaber-purple;
    border-color: $color-bsaber-purple;
    transition: background-color $transition-short;

    &:hover {
      background-color: lighten($color-bsaber-purple, 5%);
    }
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
</style>
