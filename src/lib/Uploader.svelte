<script lang="ts">
  import Fa from 'svelte-fa'
  import { faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
  import { onMount, onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import type { Uploader as UploaderType } from '../types'

  export let uploader: UploaderType
  export let curator: UploaderType | undefined = undefined
  export let collaborators: UploaderType[] = []

  let open = false
  let isNarrow = false
  let anchorEl: HTMLButtonElement | null = null
  let popoverEl: HTMLDivElement | null = null
  let hideTimeout: ReturnType<typeof setTimeout> | null = null

  let popoverStyle = ''
  let placement: 'top' | 'bottom' = 'bottom'

  const uid = Math.random().toString(36).slice(2)
  const mappedById = `${uid}-mapped-by`
  const uploaderLinkId = `${uid}-uploader-link`
  const popoverId = `${uid}-collab-popover`
  const sheetId = `${uid}-collab-sheet`
  const buttonId = `${uid}-collab-button`

  const srList = collaborators.map((c) => c.name).join(', ')
  const BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined'

  function setNarrow() {
    if (!BROWSER) return
    isNarrow = window.innerWidth < 992
  }
  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
  }

  function positionPopover() {
    if (!BROWSER || !anchorEl) return
    const r = anchorEl.getBoundingClientRect()
    const gap = 8
    const vw = window.innerWidth
    const vh = window.innerHeight
    const maxWidth = Math.min(420, vw - 24)
    const spaceBelow = vh - r.bottom
    const spaceAbove = r.top
    placement = spaceBelow >= 200 || spaceBelow >= spaceAbove ? 'bottom' : 'top'
    const top = placement === 'bottom' ? r.bottom + gap : Math.max(8, r.top - gap)
    const left = clamp(r.left, 12, vw - maxWidth - 12)
    popoverStyle = `position:fixed;top:${top}px;left:${left}px;max-width:${maxWidth}px;`
  }

  function openNow() {
    if (hideTimeout) clearTimeout(hideTimeout)
    open = true
    if (!isNarrow) positionPopover()
    lockScroll(true)
  }
  function closeSoon(delay = 110) {
    if (hideTimeout) clearTimeout(hideTimeout)
    hideTimeout = setTimeout(() => {
      open = false
      lockScroll(false)
    }, delay)
  }
  function closeNow() {
    if (hideTimeout) clearTimeout(hideTimeout)
    open = false
    lockScroll(false)
  }

  function lockScroll(lock: boolean) {
    if (!BROWSER || !isNarrow) return
    if (lock) document.documentElement.classList.add('no-scroll')
    else document.documentElement.classList.remove('no-scroll')
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      closeNow()
      anchorEl?.focus()
    }
  }
  function onResize() {
    setNarrow()
    if (open && !isNarrow) positionPopover()
    if (!open) lockScroll(false)
  }

  onMount(() => {
    if (!BROWSER) return
    setNarrow()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', () => !isNarrow && positionPopover(), { passive: true })
    document.addEventListener('keydown', onKeydown)
  })
  onDestroy(() => {
    if (!BROWSER) return
    window.removeEventListener('resize', onResize)
    document.removeEventListener('keydown', onKeydown)
    lockScroll(false)
  })
</script>

<div class="uploader">
  <label id={mappedById} for={uploaderLinkId} class="sr-only">Mapped by</label>
  <a
    class="uploader-link"
    id={uploaderLinkId}
    href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${uploader.id}`}
    aria-labelledby={`${mappedById} ${uploaderLinkId}`}
  >
    <img src={uploader.avatar} alt="" aria-hidden="true" />
    {uploader.name}
  </a>
  {#if uploader.verifiedMapper}
    <img class="verified" src="/verified.svg" alt="Verified Mapper" title="Verified" />
  {/if}
  {#if collaborators.length > 0}
    <div class="collaborators-container" role="group">
      <button
        bind:this={anchorEl}
        id={buttonId}
        class="collaborators-button"
        type="button"
        aria-label={`Collaborators: ${srList}`}
        aria-haspopup={isNarrow ? 'dialog' : 'listbox'}
        aria-controls={isNarrow ? sheetId : popoverId}
        aria-expanded={open}
        onmouseenter={() => !isNarrow && openNow()}
        onmouseleave={() => !isNarrow && closeSoon()}
        onclick={() => {
          open = !open
          if (open) {
            if (!isNarrow) positionPopover()
            lockScroll(true)
          } else {
            lockScroll(false)
          }
        }}
      >
        <span class="label">
          <Fa icon={faUserGroup} />
          <span class="collab-count">+{collaborators.length}</span>
        </span>
      </button>

      {#if open && !isNarrow}
        <div
          bind:this={popoverEl}
          class="collaborators-popover {placement}"
          id={popoverId}
          role="listbox"
          tabindex="0"
          style={popoverStyle}
          onmouseenter={openNow}
          onmouseleave={() => closeSoon()}
          transition:fade={{ duration: 100 }}
        >
          <div class="arrow"></div>
          <div class="popover-inner">
            <ul class="collab-columns">
              {#each collaborators as c}
                <li>
                  <a
                    class="uploader-link"
                    href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${c.id}`}
                  >
                    <img src={c.avatar} alt="" aria-hidden="true" />
                    <span class="name">{c.name}</span>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}

      {#if open && isNarrow}
        <div class="sheet-backdrop" role="presentation" onclick={closeNow}></div>
        <div
          class="sheet"
          id={sheetId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${sheetId}-title`}
          transition:fade={{ duration: 120 }}
        >
          <div class="sheet-handle" aria-hidden="true"></div>
          <div class="sheet-header">
            <h3 id={`${sheetId}-title`}>Collaborators</h3>
            <button class="icon-btn" aria-label="Close" onclick={closeNow}>
              <Fa icon={faXmark} />
            </button>
          </div>
          <ul class="sheet-list">
            {#each collaborators as c}
              <li>
                <a
                  class="uploader-link"
                  href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${c.id}`}
                >
                  <img src={c.avatar} alt="" aria-hidden="true" />
                  <span class="name">{c.name}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/if}
  {#if curator !== undefined}
    <span class="curator" aria-hidden="true">-</span>
    <span class="curator">
      <span id="{uid}-curated-by">Curated by </span>
      <a
        aria-labelledby="{uid}-curated-by {uid}-curator-link"
        id="{uid}-curator-link"
        href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${curator.id}`}
        >{curator.name}</a
      >
    </span>
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  :global(html.no-scroll),
  :global(body.no-scroll) {
    overflow: hidden;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .uploader {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;

    .uploader-link {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      overflow-wrap: anywhere;
    }

    img {
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;

      &.verified {
        height: 1rem;
        width: 1rem;
      }
    }

    a {
      font-weight: normal;
      color: $color-danger-red;
      cursor: pointer;
    }

    .curator {
      font-size: 0.75rem;
      color: $color-muted-text;
      display: none;

      @media (min-width: 992px) {
        display: inline-block;
      }
    }
  }

  .collaborators-container {
    position: relative;
    display: inline-block;

    .collaborators-button {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
      background: none;
      border: 1px;
      color: $color-danger-red;
      padding: 0.25rem;
      cursor: pointer;
      border-radius: $rounding-small;

      &:focus-visible {
        outline: 2px solid $color-danger-red;
        outline-offset: 2px;
      }
    }

    .label {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      .collab-count {
        font-weight: bold;
      }
    }
  }

  .collaborators-popover {
    z-index: 10000;
    color: white;
    background: $color-background-tertiary;
    border-radius: $rounding-small;
    box-shadow: 0 10px 28px #00000060;
  }
  .collaborators-popover .popover-inner {
    padding: 0.5rem 0.75rem 0.75rem;
    max-width: 100%;
  }
  .collaborators-popover .arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: $color-background-tertiary;
    transform: rotate(45deg);
  }
  .collaborators-popover.bottom .arrow {
    top: -6px;
    left: 16px;
  }
  .collaborators-popover.top .arrow {
    bottom: -6px;
    left: 16px;
  }

  .collab-columns {
    margin: 0;
    padding: 0;
    column-gap: 1rem;
    column-width: 220px;
  }
  .collab-columns li {
    list-style: none;
    break-inside: avoid;
    padding: 0.25rem 0;
  }
  .collab-columns .uploader-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: $color-danger-red;
    text-decoration: none;
    img {
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
    .name {
      display: inline-block;
      max-width: 240px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      text-decoration: underline;
    }
  }

  .sheet-backdrop {
    position: fixed;
    inset: 0;
    background: #00000080;
    z-index: 10000;
  }
  .sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10001;
    background: $color-background-primary;
    border-top-left-radius: $rounding-large;
    border-top-right-radius: $rounding-large;
    box-shadow: 0 -10px 28px #00000060;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    animation: sheetIn 300ms ease-out;
  }
  @keyframes sheetIn {
    from {
      transform: translateY(8%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .sheet-handle {
    width: 44px;
    height: 4px;
    background: $color-background-secondary;
    border-radius: 999px;
    margin: 8px auto 0;
  }
  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid $color-background-secondary;
    h3 {
      margin: 0;
      font-size: 1rem;
      color: white;
    }
    .icon-btn {
      background: transparent;
      border: 0;
      color: $color-muted-text;
      padding: 0.25rem;
    }
  }
  .sheet-list {
    margin: 0;
    padding: 0.5rem 1rem 1rem;
    overflow: auto;
    li {
      list-style: none;
    }
    .uploader-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      color: $color-danger-red;
      text-decoration: none;
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .name {
        white-space: normal;
      }
    }
  }

  @media (max-width: 991.98px) {
    .collaborators-popover {
      display: none;
    }
  }
</style>
