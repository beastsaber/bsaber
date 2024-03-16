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
  import { faLink } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
  export let data: CommunityHubSSRData
  export let activatedLabelFilters: CommunityLabel[] = []
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
</script>

<MetaHead title="Community Hub" />

<h1>Community Hub</h1>
<div class="grid">
  {#each data.communities as community}
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
              <span class="label" style="border-color: {getLabelObject(label)?.color};"
                >{label}</span
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    padding: 20px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .labels {
    margin-bottom: 0.7rem;
    user-select: none;
    .label {
      padding: 1px 10px;
      margin-right: 5px;
      border: 2px solid transparent;
      border-radius: 20px;
      background-color: #555;
      font-size: 0.8em;
    }
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
