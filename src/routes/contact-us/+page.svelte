<script lang="ts">
  import type { ContactUsPageSSRData } from './+page.server'
  export let data: ContactUsPageSSRData

  const categories = [
    { name: 'Comment on a Post', value: 'beastsaber-comment-article' },
    { name: 'Report a Bug on BeastSaber', value: 'beastsaber-report-bug' },
    { name: 'Report a Map on BeatSaver', value: 'beatsaver-report-map' },
    { name: 'Report an Account on BeatSaver', value: 'beatsaver-report-account' },
    { name: 'Report a Bug on BeatSaver', value: 'beatsaver-report-bug' },
    { name: 'Say Thank You', value: 'say-thank-you' },
    { name: 'Other', value: 'other' },
  ] as const

  type CategoryValue = (typeof categories)[number]['value']

  const messagLabelMap: Record<CategoryValue, string | null> = {
    'say-thank-you': 'Message',
    'beastsaber-comment-article': 'Comment',
    'beatsaver-report-map': 'Reason',
    'beatsaver-report-account': 'Reason',
    'beatsaver-report-bug': null,
    'beastsaber-report-bug': 'Bug Description',
    other: 'Message',
  }

  type FormData = {
    emailAddress: string
    discordId: string
    message: string
    category: CategoryValue | ''
    post: string
    linkToOffendingResource: string
  }

  let formData: FormData = {
    emailAddress: '',
    discordId: '',
    message: '',
    category: '',
    post: '',
    linkToOffendingResource: '',
  }
</script>

<main>
  <h1>Contact Us</h1>
  <fieldset>
    <legend>Contact Information</legend>
    <div class="form-row">
      <div class="field">
        <label for="discord">Discord</label>
        <input
          id="discord"
          bind:value={formData.discordId}
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="Enter your Discord ID here"
        />
      </div>
      <div class="and-or-connector">and / or</div>
      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          bind:value={formData.emailAddress}
          type="email"
          placeholder="Enter your email address here"
        />
      </div>
    </div>
    <p class="info">
      You need to provide at least one of the above contact methods. You can provide both, just to
      be sure!
    </p>
    <p class="info">
      If you don't know your Discord ID, then <a href="https://mydiscordid.com">MyDiscordId.com</a> can
      help you find it out.
    </p>
  </fieldset>

  <fieldset>
    <legend>Your Concern</legend>
    <div class="field">
      <label for="category">Category<span class="footnote-stars">*</span></label>
      <select id="category" bind:value={formData.category}>
        <option disabled selected value="" style="display:none;">Please Select</option>
        {#each categories as singleCategory (singleCategory.value)}
          <option value={singleCategory.value}>{singleCategory.name}</option>
        {/each}
      </select>
    </div>

    {#if formData.category == 'beastsaber-comment-article'}
      <div class="field">
        <label for="post">Article<span class="footnote-stars">*</span></label>
        <select id="post" bind:value={formData.post}>
          <option disabled selected value="" style="display:none;">Please Select</option>
          {#each data.posts as singlePost (singlePost.slug)}
            <option value={singlePost.slug}>{singlePost.title}</option>
          {/each}
        </select>
      </div>
    {/if}

    {#if formData.category == 'beatsaver-report-map' || formData.category == 'beatsaver-report-account'}
      <div class="field">
        <label for="linkToOffendingResource"
          >Link to the offending {formData.category == 'beatsaver-report-account'
            ? 'Account'
            : 'Map'}<span class="footnote-stars">*</span></label
        >
        <input
          id="linkToOffendingResource"
          bind:value={formData.linkToOffendingResource}
          type="text"
          placeholder="https://beatsaver.com/..."
        />
      </div>
    {/if}

    {#if formData.category != '' && messagLabelMap[formData.category] != null}
      <div class="field">
        <label for="message"
          >{messagLabelMap[formData.category]}<span class="footnote-stars">*</span></label
        >
        <textarea
          rows="12"
          id="message"
          bind:value={formData.message}
          placeholder="Type your {messagLabelMap[formData.category]} here"
        />
      </div>
    {/if}

    {#if formData.category == 'beatsaver-report-bug'}
      <p class="info">
        Please file bugs for BeatSaver on Github. You will need a Github account to do so. You can
        then file a bug here: <a href="https://github.com/beatmaps-io/beatsaver-main/issues/new"
          >https://github.com/beatmaps-io/beatsaver-main/issues/new</a
        >
      </p>{/if}
  </fieldset>
  <p class="info required-note"><span class="footnote-stars">*</span> required</p>
  <button type="submit">Send</button>
</main>

<style lang="scss">
  @import 'src/scss/variables';

  .required-note {
    text-align: right;
  }

  fieldset {
    width: 100%;
    border: 2px solid $accent-color;
    border-radius: $rounding;
    padding: 0 1.75rem 1.75rem 1.75rem;
    box-sizing: border-box;
    margin-bottom: 2rem;

    legend {
      font-size: 1.5rem;
    }
  }

  .footnote-stars {
    color: $color-danger-red;
  }

  main {
    background-color: $background-primary;
    color: $text-secondary;
    font-family: $font-primary-text;

    h1 {
      font-family: $font-header-text;
      color: $color-primary-text;
    }

    .form-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;

      // Add the fieldset rule here
      fieldset {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }

      .field {
        width: 45%;

        label {
          color: $color-primary-text;
          display: block;
          margin-bottom: 10px;

          .footnote-stars {
            color: $color-warning-yellow;
          }
        }

        input[type='text'],
        input[type='email'],
        select {
          width: 100%;
          padding: 10px;
          border-radius: $rounding;
          border: none;
          background-color: $background-tertiary;
          color: $text-secondary;
          box-sizing: border-box;
        }
      }

      .and-or-connector {
        align-self: center;
        text-align: center;
        margin: 0 10px;
        transform: translateY(100%);
      }
    }

    .info {
      color: $color-muted-text;
      margin-top: 0.5rem;

      &:nth-of-type(1) {
        margin-top: 1rem;
      }
    }

    .field {
      label {
        color: $color-primary-text;
        display: block;
        margin-bottom: 10px;
        margin-top: 1rem;
      }

      select,
      input,
      textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border-radius: $rounding;
        border: none;
        background-color: $background-tertiary;
        color: $text-secondary;
      }
    }

    button[type='submit'] {
      box-sizing: border-box;
      display: block;
      width: 100%;
      padding: 0.75rem;
      margin: 2rem 0;
      border-radius: $rounding;
      border: none;
      color: $color-primary-text;
      background-color: $accent-color;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken($accent-color, 10%);
      }
    }

    @media all and (max-width: 768px) {
      .form-row {
        flex-direction: column;
        align-items: center;

        .field {
          width: 100%;
        }

        .and-or-connector {
          margin: 10px 0;
        }
      }
    }
  }

  input,
  textarea,
  select,
  button {
    font-size: 1.1rem;
  }
</style>
