<script context="module" lang="ts">
  export const prerender = true
</script>

<script>
  import ErrorPage from './__error.svelte'
</script>

<ErrorPage title="Not Found" errorCode="404" errorMessage="Not Found" />
