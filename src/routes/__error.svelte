<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status} -: ${error.message}`,
				errorCode: `${status}`,
				errorMessage: error.message,
				stackTrace: error.stack
			}
		};
	}
</script>

<script>
	export let title;
	export let errorCode;
	export let errorMessage;
	export let stackTrace;
	// Having the message in a variable as it seems they get seperated on each line that starts with a html tag
	let helpfullMessages = [
		`<b>Verify url and typos</b> - The web page you were attempting to view may not exist or may have moved - try <em>checking the web address for typos</em>.`, 
		`<b>Visit our Discord</b> - If you followed a link from somewhere, please let us know at <code>#site-bugs</code> on the <a href=\"https://discord.gg/VJZHUbt\">BeastSaber Discord</a>. Tell us where you came from and what you were looking for, and we'll do our best to fix it.`
		]
</script>

<svelte:head>
	<title>Error {title}</title>
</svelte:head>
<section>
	<body id="error-page" class="error">
		<div class="message">
		<blockquote>
			<center><a class="logoimg" href="https://bsaber.com"><img src="/BeastSaber-LogoW.webp" class="logoimg" alt="BeastSaber"></a></center>
			<h2>
				<center>Error {errorCode} {errorMessage}</center>
			</h2>
			<p>Our apologies for the temporary inconvenience. The server was unable to process the requested URL. We suggest you do the following:</p>
			<ul>
				{#each helpfullMessages as message}
					<li>{@html message}</li>
				{/each}
			</ul>
			<center><a href="https://www.youtube.com/watch?v=64f34Injgas" target="_blank" rel="noopener noreferrer"><img src="https://cdn.discordapp.com/attachments/752003683780395069/837791582127652904/404.gif" class="logoimg" alt="404 Error gif, Beat Saber lost tracking"></a></center>
			<small><center>Made by Bobbie <a href="https://www.youtube.com/watch?v=64f34Injgas">Orignal Video</a></center></small>
			<h3><center><a href="https://bsaber.com">Back to the Homepage</a></center></h3>
			<div class="debugging-info">
				Stacktrace:
				<code class="block">{stackTrace}</code>
			</div>
		</blockquote>
		</div>
	</body>
</section>

<style lang="scss">
	@import 'src/scss/variables';
	/* * {
		background: #262626;
		display: block;
		font-family: arial,sans-serif;
	}*/
	body.error {
		background: #1c1c1c;
		color: LightGray;
		min-width: min-content;
		-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
	}
	img.logoimg {
		margin-top: 20px;
		max-width: 100%;
		margin-bottom: 20px;
	}
	h2 {
		color: LightGray;
		font-weight: bold;
		font-size: 1.5em;
		padding-bottom: 2%;
	}
	.message {
		width: 100%;
		border-radius: $rounding;
		background-color: $background-secondary;
	}
	p, ul {
		font-size: 16px;
		padding: 0% 5% 1% 5%;
	}
	ul {
		padding: 0% 10% 0% 10%;
	}
	div.debugging-info {
		color: LightGray;
		font-size: 1em;
		padding: 2em;
	}
	code.block {
		display: block;
		background: #1c1c1c;
		border-radius: 3px;
		color: LightGray;
		font-family: monospace;
		font-size: 1em;
		margin: 0.5rem;
		padding: 0.2em 0.4em;
	}/*
	b {
		font-weight: bold;
	}
	@media screen and (max-width: 400px) {
		.message{
			padding-bottom: 0px;
		}
	}
	#error-page p, #error-page .message {
		font-size: 14px;
		line-height: 1.5;
		margin: 25px 0 20px;
	}
	ul {
		padding: 0% 5% 0% 5%;
	}
	ul li {
		margin-bottom: 10px;
	}
	a:link {color: DodgerBlue; }
	a:hover {color: DeepSkyBlue; }
	a:visited {color: RoyalBlue; }
	a:active {color: SteelBlue; }
	a.logoimg {
		padding-top: 20px;
		max-width: 100%;
	}
	img { border:none; }
	*/
</style>
