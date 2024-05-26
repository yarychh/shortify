import { toasts } from 'svelte-toasts';

export async function copyToClipboard(s: string) {
	await navigator.clipboard.writeText(s).then(() => {
		toasts.success('Copied to clipboard', { duration: 1000 });
	});
}
