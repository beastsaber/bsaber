<script>
  import MetaHead from '$lib/MetaHead.svelte'
  import ErrorPage from './__error.svelte'
</script>

<MetaHead title="Not Found" description="This page has not been found." />

<ErrorPage title="Not Found" errorCode="404" errorMessage="Not Found" />
