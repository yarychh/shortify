export async function load({ fetch }) {
	return {
		joke: await fetch('https://icanhazdadjoke.com', {
			method: 'GET',
			headers: { Accept: 'application/json' }
		}).then((r) => r.json())
	};
}
