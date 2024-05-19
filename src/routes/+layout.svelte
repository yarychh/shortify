<script>
	export let data;
	const joke = data.joke.joke;
</script>

<div class="layout">
	<nav class="header">
		<ul>
			<li>
				<h2>
					<a href="/" class="contrast logo">Shortify</a>
				</h2>
			</li>
		</ul>
	</nav>

	<div class="wrapper">
		<slot></slot>
	</div>

	<footer class="footer">
		<blockquote>
			{joke}
			<footer>
				<cite>— Dad</cite>
			</footer>
		</blockquote>
	</footer>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.header {
		padding: 0 1rem;
	}
	.header h2 {
		margin: 0;
	}
	.logo {
		text-decoration: none;
	}
	.wrapper {
		flex: 1;
	}
	.footer {
		width: 100%;
	}
	.footer blockquote {
		margin: 0;
	}
</style>
