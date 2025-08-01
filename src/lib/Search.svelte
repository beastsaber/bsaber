<script lang="ts">
  import { slide } from 'svelte/transition'
  import { filterNsfw, nsfwToggleVisibility } from '$lib/storeNsfwPreference'
  import { onMount, onDestroy } from 'svelte'
  import { beatSaverClientFactory } from './beatsaver-client'
  import type { Beatmap, BeatmapDifficulty, Playlist } from '../types'
  import Difficulties from './Difficulties.svelte'
  import Fa from 'svelte-fa'
  import {
    faCaretDown,
    faCaretUp,
    faChartLine,
    faFire,
    faUser,
    faUserGroup,
  } from '@fortawesome/free-solid-svg-icons'
  import type { float } from '@opensearch-project/opensearch/api/types.js'

  interface Preview {
    name: string
    uploader: string
    collaborators?: string[] | undefined
    url: string
    image: string
    upvotes: number
    downvotes: number
    score: number
    tags?: string[] | undefined
    diffs?: BeatmapDifficulty[] | undefined
    nsfw?: boolean
  }

  interface BeatmapWithStats extends Beatmap {
    stats: {
      upvotes: number
      downvotes: number
      score: number
    }
  }

  interface PlaylistWithStats extends Playlist {
    stats: {
      upVotes: number
      downVotes: number
      avgScore: number
    }
  }
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

  const beatSaverClient = beatSaverClientFactory.create()

  const beatsaverRoot = import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com' + '/'
  const mapSearchPath = '/search/text/'
  const playlistsPath = '/playlists/search/'

  let { forceSearchType = null } = $props()

  let searchType: string = $state(forceSearchType ?? dropdownItems[0].name)
  let searchQuery: string = $state('')
  let lastQuery: string = ''

  let dropdownShown: boolean = $state(false)
  let searchPreviewTimeout: string | number | NodeJS.Timeout | undefined
  let searchButton: HTMLAnchorElement
  let searchUrl: string = $state('')

  let beatSaverPromise: Promise<Preview[]> | undefined = $state()

  const getSearchUrl = (inputSearchType: string, inputSearchQuery: string) => {
    if (inputSearchType === dropdownItems[0].name) {
      return `${beatsaverRoot}?q=${inputSearchQuery}`
    } else if (inputSearchType === dropdownItems[1].name) {
      return `${beatsaverRoot}playlists?q=${inputSearchQuery}`
    }

    return '/posts/search?q=' + searchQuery
  }

  $effect(() => {
    searchUrl = getSearchUrl(searchType, searchQuery)
  })

  // Search function that opens a new url in the browser
  function search(event: Event) {
    event.preventDefault()
    if (searchQuery === '') {
      return
    }

    searchButton.click()
  }

  function searchPreview(
    event?: (Event & { currentTarget: EventTarget & HTMLInputElement }) | null,
    force?: boolean,
  ) {
    clearTimeout(searchPreviewTimeout)
    beatSaverPromise = undefined
    lastQuery = searchQuery
    searchQuery = event ? event.currentTarget.value : searchQuery
    searchPreviewTimeout = setTimeout(() => {
      // We're checking if the query is the same as the last query to avoid making unnecessary requests
      if (searchQuery === lastQuery && !force) {
        return
      }

      let previewResults: Preview[] = []

      // If the query is empty, we don't need to do anything
      if (searchQuery.length < 1) {
        return
      }
      // TODO: Handle errors and show an appropriate message
      if (searchType === dropdownItems[0].name) {
        beatSaverPromise = beatSaverClient
          .fetch(`${mapSearchPath}0?q=${searchQuery}&sortOrder=Relevance`)
          .then((response) => response.json())
          .then((data) => {
            if (searchQuery !== '') {
              previewResults = data.docs.map((song: BeatmapWithStats) => {
                return {
                  name: song.name,
                  uploader: song.uploader.name,
                  collaborators: song.collaborators?.map((collab) => collab.name),
                  url: `${beatsaverRoot}${searchType.toLowerCase()}/${song.id}`,
                  image: song.versions?.at(-1)?.coverURL ?? '',
                  upvotes: song.stats.upvotes,
                  downvotes: song.stats.downvotes,
                  score: song.stats.score,
                  tags: song.tags,
                  diffs: song.versions[0].diffs,
                  nsfw: song.nsfw ?? false,
                }
              })
            }
            return previewResults
          })
      } else if (searchType === dropdownItems[1].name) {
        beatSaverPromise = beatSaverClient
          .fetch(`${playlistsPath}0?q=${searchQuery}&sortOrder=Relevance`)
          .then((response) => response.json())
          .then((data) => {
            if (searchQuery !== '') {
              previewResults = data.docs.map((playlist: PlaylistWithStats) => {
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
            return previewResults
          })
      } else if (searchType === dropdownItems[2].name) {
        // No Op
      } else {
        alert('Unknown search type')
      }
    }, 400)
  }

  // Ideally I'd do the below using CSS but
  // the svelte compiler seems to remove these css classes

  // Function to calculate color based on percentage takes percentage as float
  function getGradientColor(rating: float) {
    // Map rating percentage (0-100) to hue range (0 = red, 120 = green)
    const hue = rating * 120 // 0% = red, 100% = green
    return `hsl(${hue}, 100%, 50%)` // Full saturation and 50% lightness
  }
</script>

<form onsubmit={search}>
  <div class="search">
    {#if forceSearchType == null}
      <button
        class="filter-dropdown btn btn-primary dropdown-toggle"
        type="button"
        onclick={() => (dropdownShown = !dropdownShown)}
        id="dropdownMenuButton"
        aria-expanded={dropdownShown}
      >
        <i class="fas fa-angle-up"></i>
        <span class="d-none d-lg-inline">{searchType}</span>
      </button>
      <!-- </button> -->
      {#if dropdownShown}
        <div
          transition:slide={{ duration: 150 }}
          class="dropdown-menu filter"
          aria-labelledby="dropdownMenuButton"
        >
          {#each dropdownItems as item (item.name)}
            <button
              type="button"
              class="dropdown-item"
              onclick={() => {
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
      oninput={searchPreview}
    />
  </div>
  <!-- TODO: Possibly only show once we run the search request, though not a big deal if we don't, but it'll show as "No results found" for a brief time -->
  {#if searchQuery !== '' && beatSaverPromise != undefined}
    <div
      transition:slide={{ duration: 150 }}
      class="dropdown-menu dropdown-menu-list"
      aria-labelledby="dropdownMenuButton"
    >
      {#await beatSaverPromise}
        <p class="dropdown-item dropdown-item-map-name">Loading....</p>
      {:then previews}
        {#if previews != undefined && previews.length > 0}
          {#each previews as preview (preview.url)}
            <a class="dropdown-item card" href={preview.url}>
              <div class="image-wrapper">
                <img
                  src={preview.image}
                  class:blur={$filterNsfw && preview.nsfw}
                  alt="Map Thumbnail"
                />
              </div>
              <div class="dropdown-item-map-name">
                {preview.name}<br />
                <div class="dropdown-item-uploader">
                  <Fa
                    icon={preview.collaborators && preview.collaborators.length > 0
                      ? faUserGroup
                      : faUser}
                  />
                  {[preview.uploader, ...(preview.collaborators ?? [])].join(', ')}
                </div>
                <div class="dropdown-item-stats">
                  <Fa icon={faCaretUp} color="green" scale={1.2} style="padding: 0px 4px 0px 3px" />
                  {preview.upvotes}
                  <Fa icon={faCaretDown} color="red" scale={1.2} style="padding: 0px 4px 0px 8px" />
                  {preview.downvotes}
                  <Fa
                    icon={faChartLine}
                    color={getGradientColor(preview.score)}
                    scale={1.2}
                    style="padding: 0px 4px 0px 8px;"
                  />
                  {(preview.score * 100).toFixed(2)}%
                </div>
                <div class="dropdown-item-tags-diffs">
                  {#if preview.diffs}
                    <Difficulties diffs={preview.diffs} />
                  {/if}
                </div>
              </div></a
            >
          {/each}
        {:else}
          <p class="dropdown-item dropdown-item-map-name">No results found</p>
        {/if}
      {:catch error}
        <p class="dropdown-item dropdown-item-map-name">
          An error occured: {error}
        </p>
      {/await}
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
    min-width: fit-content;
    overflow: hidden;
    border-radius: 5px;
  }
  .image-wrapper img {
    width: 6rem;
    height: 6rem;
    border-radius: 5px;
    align-self: center;
  }
  .blur {
    filter: blur(5px);
  }

  a.dropdown-item,
  p.dropdown-item {
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

  p.dropdown-item:hover {
    background-color: inherit;
  }

  .dropdown-item-map-name {
    font-size: 14px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 0.5rem;
    overflow: hidden;

    @media (min-width: 425px) {
      font-size: 16px;
    }
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

  .dropdown-item-tags-diffs {
    margin-top: 5px;
    margin-left: 2px;
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
    transition:
      border-color $transition-short ease-in-out,
      box-shadow $transition-short ease-in-out;
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
    transition:
      color $transition-short ease-in-out,
      background-color $transition-short ease-in-out,
      border-color $transition-short ease-in-out,
      box-shadow $transition-short ease-in-out;
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
