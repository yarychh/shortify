<script>
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { enhance } from '$app/forms';

	export let form;

	let shortUrl = '';
	let originalUrl = '';

	async function copyToClipboard() {
		await navigator.clipboard.writeText(shortUrl).then(() => {
			toasts.success('Copied to clipboard', { duration: 1000 });
		});
	}
</script>

<main class="container">
	<form
		action="?/createShortLink"
		method="POST"
		use:enhance={({ formElement }) => {
			return async ({ result, update }) => {
				shortUrl = result.data.body?.shortenedUrl ?? '';
				originalUrl = result.data.body?.originalUrl ?? '';
				update({ reset: !!shortUrl.length });
			};
		}}
	>
		<fieldset role="group">
			<input
				name="originalUrl"
				type="url"
				value={form?.originalUrl ?? ''}
				required
				placeholder="paste your link here..."
				aria-invalid={form?.invalidURL}
				aria-describedby="valid-url"
			/>
			<input type="submit" value="Shortify URL" class="outline" />
		</fieldset>
		{#if form?.invalidURL}
			<small id="valid-url">Incorrect URL</small>
		{/if}
	</form>

	{#if shortUrl}
		<article>
			<p>{originalUrl}</p>
			<div class="result">
				<input class="shortened-url" name="shortenedUrl" type="text" value={shortUrl} readonly />
				<svg
					class="copy-icon"
					on:click={copyToClipboard}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					><path d="M0 0h24v24H0z" fill="none" /><path
						d="M16 1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4v2H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2v-2h4c1.1 0 2-.9 2-2V9l-6-8zm0 4l4 4h-4V5zm2 15H6V3h9v5h5v12zM8 17h8v-1H8v1zm0-4h8v-1H8v1zm0-4h8V8H8v1z"
					/></svg
				>
			</div>
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
	.copy-icon {
		cursor: pointer;
	}
</style>
