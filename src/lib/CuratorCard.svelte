<script>
  export let name
  export let slug
  export let role
  export let tags
  export let bio
  export let fav_map
  export let image
</script>

<div class="curator-card">
  <div class="header">
    <img class="image" src={image} alt={slug} />
    <div class="info">
      <h3>{name}</h3>
      <p class="role">{role}</p>
      <div class="tags">
        {#each tags as tag}
          <span class="style-tag">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
  <div class="bottom">
    <div>
      <p class="bio">{bio}</p>
    </div>
    <div class="fav-map">
      <h4>Favorite Map:</h4>
      <p><a href={fav_map.url}>{fav_map.name}</a></p>
    </div>
  </div>
</div>

<style lang="scss">
  @import 'src/scss/variables';

  .curator-card {
    background-color: $background-secondary;
    border-radius: 4px;
    overflow: hidden;
    flex-basis: 30%;
    margin: 12px;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      align-items: center;
      background-color: $background-tertiary;
      padding: 0 12px;

      .image {
        border-radius: 50%;
        height: 5rem;
        margin: 12px 12px 12px 0;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .role {
          color: $text-secondary;
        }

        .style-tag {
          font-size: 0.75rem;
          font-weight: bold;
          border-radius: 4px;
          padding: 0 4px;
          background-color: #1268a1;
          margin-right: 8px;
        }
      }
    }

    .bottom {
      padding: 12px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bio {
        margin: 0 0 12px 0;
        text-align: justify;
      }
    }
  }
</style>
