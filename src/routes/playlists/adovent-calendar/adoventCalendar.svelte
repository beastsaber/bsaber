<script context="module" lang="ts">
  export type Day = {
    number: number
    title?: string
    url?: string
    cover?: string
  }

  export type Bonus = {
    label: string
    title?: string
    url?: string
    cover?: string
  }

  export type Credit = { name: string; role: string }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let days: Day[] = []
  export let bonus: { label: string; title?: string; url?: string; cover?: string }[] = []
  export let credits: {
    name: string
    url?: string
    photo?: string
    alt?: string
    role?: string
  }[] = []

  const dispatch = createEventDispatcher<{ reorder: { days: Day[]; bonus: Bonus[] } }>()

  function move<T>(list: T[], from: number, to: number): T[] {
    const copy = list.slice()
    const [item] = copy.splice(from, 1)
    copy.splice(to, 0, item)
    return copy
  }

  let dragIndex: number | null = null
  let dragGroup: 'days' | 'bonus' | null = null

  function onDragStart(e: DragEvent, index: number, group: 'days' | 'bonus') {
    dragIndex = index
    dragGroup = group
    e.dataTransfer?.setData('text/plain', `${group}:${index}`)
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
    ;(e.currentTarget as HTMLElement)?.classList.add('dragging')
  }
  function onDragOver(e: DragEvent, _index: number, group: 'days' | 'bonus') {
    if (dragGroup === group) {
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
      ;(e.currentTarget as HTMLElement)?.classList.add('drag-over')
    }
  }
  function onDragLeave(e: DragEvent) {
    ;(e.currentTarget as HTMLElement)?.classList.remove('drag-over')
  }
  function onDrop(e: DragEvent, dropIndex: number, group: 'days' | 'bonus') {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement)?.classList.remove('drag-over')
    if (dragIndex == null || dragGroup !== group) return

    if (group === 'days') {
      const next = move(days, dragIndex, dropIndex).map((d, i) => ({ ...d, number: i + 1 }))
      dispatch('reorder', { days: next, bonus })
    } else {
      const next = move(bonus, dragIndex, dropIndex)
      dispatch('reorder', { days, bonus: next })
    }
    dragIndex = null
    dragGroup = null
  }
  function onDragEnd() {
    dragIndex = null
    dragGroup = null
    document
      .querySelectorAll('.dragging,.drag-over')
      .forEach((el) => el.classList.remove('dragging', 'drag-over'))
  }
</script>

<div class="layout">
  <div class="calendar" aria-label="ADOvent calendar">
    <div class="days-grid">
      {#each days as d, i (d.number)}
        <a
          class="tile"
          href={d.url || '#'}
          target="_blank"
          rel="noopener"
          aria-label={d.title ? `${d.number}: ${d.title}` : `Day ${d.number}`}
          draggable="true"
          on:dragstart={(e) => onDragStart(e, i, 'days')}
          on:dragover={(e) => onDragOver(e, i, 'days')}
          on:dragleave={onDragLeave}
          on:drop={(e) => onDrop(e, i, 'days')}
          on:dragend={onDragEnd}
        >
          {#if d.cover}
            <span class="bg" style={`background-image:url('${d.cover}')`}></span>
            <span class="scrim" aria-hidden="true"></span>
          {/if}

          <span class="num">{d.number}</span>

          {#if d.title}
            <span class="overlay"><span class="overlay-text">{d.title}</span></span>
          {/if}
        </a>
      {/each}
    </div>

    <hr class="fade" />

    <div class="bonus-grid">
      {#each bonus as b, i (b.label)}
        <a
          class="tile bonus"
          href={b.url || '#'}
          target="_blank"
          rel="noopener"
          aria-label={b.title ? `${b.label}: ${b.title}` : b.label}
          draggable="true"
          on:dragstart={(e) => onDragStart(e, i, 'bonus')}
          on:dragover={(e) => onDragOver(e, i, 'bonus')}
          on:dragleave={onDragLeave}
          on:drop={(e) => onDrop(e, i, 'bonus')}
          on:dragend={onDragEnd}
        >
          {#if b.cover}
            <span class="bg" style={`background-image:url('${b.cover}')`}></span>
            <span class="scrim" aria-hidden="true"></span>
          {/if}

          <span class="num">{b.label}</span>

          {#if b.title}
            <span class="overlay">{b.title}</span>
          {/if}
        </a>
      {/each}
    </div>
  </div>

  <aside class="credits">
    <h3 style="text-align: center;">Artist Credits</h3>
    <ul class="credit-list">
      {#each credits as c}
        <li class="credit-item">
          {#if c.photo}
            <img
              class="avatar"
              src={c.photo}
              alt={c.alt ?? `${c.name} avatar`}
              loading="lazy"
              width="40"
              height="40"
              decoding="async"
            />
          {:else}
            <span class="avatar fallback" aria-hidden="true">
              {c.name?.[0]?.toUpperCase() ?? '•'}
            </span>
          {/if}

          <div class="credit-text">
            <div class="credit-name">
              {#if c.url}
                <a href={c.url} target="_blank" rel="noopener">{c.name}</a>
              {:else}
                {c.name}
              {/if}
            </div>
            {#if c.role}
              <div class="credit-role">{c.role}</div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </aside>
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.25rem;
    align-items: start;
  }

  .calendar {
    display: grid;
    gap: 0.75rem;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    border: 2px solid #2e2e2e;
    border-radius: 14px;
    padding: 0.75rem;
  }
  .days-grid .tile:nth-child(5),
  .days-grid .tile:nth-child(9),
  .days-grid .tile:nth-child(13),
  .days-grid .tile:nth-child(17),
  .days-grid .tile:nth-child(21) {
    grid-column: 1;
  }
  hr.fade {
    border: none;
    height: 2px;
    margin-block: 0.75rem 1.5rem;
    background: linear-gradient(90deg, #99999900 0%, #999 50%, #99999900 100%);
    margin-bottom: auto;
    margin-top: auto;
  }

  .bonus-grid {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    margin-top: 0.25rem;
  }
  @media (max-width: 720px) {
    .bonus-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 400px) {
    .bonus-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .tile {
    font-family: 'Times New Roman', Times, serif;
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 1 / 1;
    border: 2px solid #2e2e2e;
    border-radius: 14px;
    text-decoration: none;
    background: #061c4b;
    background-image: url(/uploads/playlists/adovent/adoroes.png);
    background-position: center;
    background-size: 75%;
    background-repeat: no-repeat;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      border-color 160ms ease,
      opacity 120ms ease;
    touch-action: manipulation;
  }
  .tile:active {
    cursor: grabbing;
  }
  .tile:hover,
  .tile:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    border-color: #061c4b;
  }
  .tile.dragging {
    opacity: 0.85;
    transform: translateY(-4px) scale(0.995);
  }
  .tile.drag-over {
    outline: 2px dashed #fff;
    outline-offset: -6px;
  }
  .bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.06);
    filter: blur(1px) brightness(0.75);
    opacity: 0;
    transition: opacity 160ms ease;
    z-index: 0;
  }
  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25));
    opacity: 0;
    transition: opacity 160ms ease;
    z-index: 1;
  }
  .tile:hover .bg,
  .tile:focus-visible .bg,
  .tile:hover .scrim,
  .tile:focus-visible .scrim {
    opacity: 1;
  }
  @media (max-width: 720px) {
    .tile .bg,
    .tile .scrim {
      opacity: 1;
    }
  }

  .tile .num {
    position: relative;
    font-size: 3rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.02em;
    z-index: 2;
    pointer-events: none;
    transition: all 160ms ease;
  }
  .tile:hover .num,
  .tile:focus-visible .num {
    position: absolute;
    bottom: 8px;
    left: 8px;
    font-size: 0.9rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.55);
  }

  .tile .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    text-align: center;
    font-weight: 700;
    font-size: 0.95rem;
    line-height: 1.25rem;
    color: #ffffff;
    opacity: 0;
    transform: translateY(6%);
    transition:
      opacity 160ms ease,
      transform 160ms ease;
    z-index: 2;
  }
  .tile:hover .overlay,
  .tile:focus-visible .overlay {
    opacity: 1;
    transform: translateY(0);
  }
  .overlay-text {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    max-width: 90%;
  }
  @media (max-width: 720px) {
    .tile .overlay {
      opacity: 1;
      transform: none;
      background: rgba(0, 0, 0, 0.55);
    }
    .tile .num {
      position: absolute;
      bottom: 8px;
      left: 8px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.55);
    }
  }

  .tile.bonus {
    border-style: dashed;
    border-color: #5a5a5a;
    background: #061c4b;
    background-image: url(/uploads/playlists/adovent/adoroes.png);
    background-position: center;
    background-size: 75%;
    background-repeat: no-repeat;
  }
  .tile.bonus:hover {
    border-color: #061c4b;
  }

  .credit-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
  .credit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.4rem;
  }
  .avatar {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border: 1px solid #2e2e2e;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    background: #0e0e0e;
  }
  .credit-name a {
    color: #ffffff;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms ease;
  }
  .credit-name a:hover {
    text-decoration: underline #ffffff;
  }
  .credit-role {
    font-size: 0.85rem;
    color: #cfcfcf;
    line-height: 1.2;
  }

  @media (max-width: 1200px) {
    .layout {
      grid-template-columns: 1fr 260px;
    }
    .avatar {
      width: 200px;
      height: 200px;
    }
  }
  @media (max-width: 1024px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .credits {
      position: static;
      order: 2;
    }
    .avatar {
      width: 180px;
      height: 180px;
    }
  }
  @media (max-width: 720px) {
    .days-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .days-grid .tile:nth-child(5),
    .days-grid .tile:nth-child(9),
    .days-grid .tile:nth-child(13),
    .days-grid .tile:nth-child(17),
    .days-grid .tile:nth-child(21) {
      grid-column: auto;
    }
    .tile .num {
      font-size: 1.6rem;
    }
    .avatar {
      width: 140px;
      height: 140px;
    }
  }
  @media (max-width: 400px) {
    .days-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .avatar {
      width: 120px;
      height: 120px;
    }
  }
</style>
