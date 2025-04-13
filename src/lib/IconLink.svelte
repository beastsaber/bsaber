<script lang="ts">
  export let linkUrl = ''
  export let linkText = ''
</script>

<span class="link">
  <div class="icon"></div>
  <a href={linkUrl}>{linkText}</a>
</span>

<style lang="scss">
  @import 'src/scss/variables';
  .link {
    display: flex;
    align-items: center;
  }

  a {
    font-family: $font-dm-sans;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-transform: uppercase;
    color: $color-danger-red;
  }

  .icon {
    height: 15px;
    width: 8px;
    margin-right: 9px;
    content: url('/red-triangle.svg');
  }
</style>
