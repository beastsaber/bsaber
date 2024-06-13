<script lang="ts">
  import { marked } from 'marked'

  export let name: string
  export let id: number
  export let roles: { verifiedMapper: boolean; curator: boolean; seniorCurator: boolean }
  export let description: string
  export let avatar: string
</script>

<div class="curator-card">
  <div class="header">
    <img class="image" src={avatar} alt={name} />
    <div class="info">
      <a
        class="name"
        href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/profile/${id}`}
        >{name}</a
      >
      <p class="roles">
        {(roles.seniorCurator ? 'Senior Curator' : 'Curator') +
          (roles.verifiedMapper ? ', Verified Mapper' : '')}
      </p>
    </div>
  </div>
  <div class="bottom">
    <article class="description">
      {@html marked(description.replace(/\n/g, '  \n'))}
    </article>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .curator-card {
    background-color: $color-background-secondary;
    border-radius: $rounding-small;
    overflow: hidden;
    flex-basis: 30%;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      align-items: center;
      padding: 0 12px;

      .image {
        border-radius: 50%;
        height: 2.5rem;
        margin: 12px 12px 12px 0;
      }

      .info {
        .name {
          display: block;
          font-weight: bold;
          color: white;
        }

        .roles {
          font-size: 0.75rem;
          color: $color-text-secondary;
        }
      }
    }

    .bottom {
      padding: 12px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
