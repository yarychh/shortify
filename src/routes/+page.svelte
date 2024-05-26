<script lang="ts">
	import Copy from '$lib/assets/copy.svelte';
	import { copyToClipboard } from '$lib/utils/copy-to-clickboard.function.js';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
	import { enhance } from '$app/forms';

	export let form;

	$: shortUrl = form?.body?.shortenedUrl ?? '';
	$: originalUrl = form?.body?.originalUrl ?? '';
</script>

<main class="container">
	<form action="?/createShortLink" method="POST" use:enhance>
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<fieldset role="group">
			<input
				name="originalUrl"
				type="url"
				value={form?.invalidURL ? originalUrl : ''}
				required
				placeholder="paste your link here..."
				aria-invalid={form?.invalidURL}
				aria-describedby="valid-url"
			/>
			<input type="submit" value="Shortify URL" class="outline" />
		</fieldset>
		{#if form?.invalidURL}
			<small id="valid-url">Invalid URL</small>
		{/if}
	</form>

	{#if shortUrl}
		<article>
			<div class="result">
				<input class="shortened-url" name="shortenedUrl" type="text" value={shortUrl} readonly />
				<Copy on:copied={() => copyToClipboard(shortUrl)}></Copy>
			</div>
			<hr />
			<details>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary role="button" class="outline secondary">Original URL</summary>
				<p>{originalUrl}</p>
			</details>
		</article>
	{/if}

	<ToastContainer placement="bottom-right" let:data>
		<FlatToast {data} />
	</ToastContainer>
</main>

<style>
	.container {
		max-width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.result {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.shortened-url {
		margin: 0;
	}
</style>
