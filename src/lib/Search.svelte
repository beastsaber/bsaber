<script lang="ts">
  import { slide } from 'svelte/transition'

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

  const beatsaverRoot = 'https://beatsaver.com/'
  const beatsaverApiRoot = 'https://api.beatsaver.com/'

  const mapsSearchApiEndpoint = `${beatsaverApiRoot}search/text/`
  const playlistsApiEndpoint = `${beatsaverApiRoot}playlists/search/`

  let searchType: string = dropdownItems[0].name
  let searchQuery: string = ''
  let lastQuery: string = ''

  let dropdownShown: boolean = false

  let previewResults: {
    name: string
    uploader: string
    url: string
    image: string
  }[] = []

  let searchPreviewTimeout

  // Search function that opens a new url in the browser
  function search() {
    if (searchQuery === '') {
      return
    }
    if (searchType === dropdownItems[0].name) {
      const url = `${beatsaverRoot}?q=${searchQuery}`
      window.open(url, '_self')
    } else if (searchType === dropdownItems[1].name) {
      alert('Not yet implemented')
    } else if (searchType === dropdownItems[2].name) {
      alert('Not yet implemented')
    } else {
      alert('Unknown search type')
    }
  }

  function searchPreview(event?, force?: boolean) {
    clearTimeout(searchPreviewTimeout)
    lastQuery = searchQuery
    searchQuery = event ? event.target.value : searchQuery
    console.log(`searchQuery ${searchQuery} lastQuery: ${lastQuery}`) // TOOD: Remove console.log
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
                }
              })
              console.log(data) // TOOD: Remove console.log
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
                }
              })
              console.log(data) // TOOD: Remove console.log
            }
          })
      } else if (searchType === dropdownItems[2].name) {
        alert('Not yet implemented')
      } else {
        alert('Unknown search type')
      }
    }, 400)
  }
</script>

<form on:submit|preventDefault={search}>
  <div class="row">
    <div class="searchForm">
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
      <input
        type="search"
        class="form-control"
        placeholder="Enter Keywords"
        on:input={searchPreview}
      />
      {#if previewResults.length > 0}
        <div
          transition:slide={{ duration: 150 }}
          class="dropdown-menu dropdown-menu-list"
          aria-labelledby="dropdownMenuButton"
        >
          {#each previewResults as preview}
              <a
                class="dropdown-item"
                href={preview.url}
              >
                <img
                  src={preview.image}
                  class="dropdown-item-image"
                  alt="Map Thumbnail"
                />
                <div class="dropdown-item-text">
                  {preview.name}<br />
                  <div class="dropdown-item-text2">{preview.uploader}</div>
                </div></a
              >
          {/each}
        </div>
      {/if}

      <button type="submit" class="btn btn-primary">Search</button>
    </div>
  </div>
</form>

<style>
  form {
    display: grid;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }
  .searchForm {
    position: relative;
    display: grid;
    grid-template-columns: 0.3fr 6fr 0.3fr;
    align-items: center;
    justify-content: center;
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
    vertical-align: 0.255em;
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
    z-index: 1000;
    display: block;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #fff;
    text-align: left;
    list-style: none;
    background-color: #222222;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
  }
  .dropdown-menu-list {
    height: 10rem;
    width: 100%;
    overflow-y: auto;
  }
  .dropdown-menu.filter {
    z-index: 1100;
  }
  .dropdown-item {
    display: flex;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #fff;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
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
    background-color: rgb(42, 81, 121);
  }
  .dropdown-item-image {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
  }
  .dropdown-item-text {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dropdown-item-text2 {
    padding-top: 0.15rem;
    font-size: small;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .form-control {
    display: block;
    width: 1fr;
    float: left;
    padding: 0.375rem 0.75rem;
    margin-right: 0.25rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #303030;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #222;
    appearance: none;
    border-radius: 0 0.25rem 0.25rem 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  div,
  button,
  input {
    overflow: visible;
  }
  input:hover {
    color: #39699c;
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
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn-primary {
    color: #fff;
    background-color: #375a7f;
    border-color: #375a7f;
    margin-left: 0.25rem;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  .btn:hover {
    background-color: #39699c;
  }
</style>
