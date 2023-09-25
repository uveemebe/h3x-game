<script>
	import '../app.postcss';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
</script>

<main>
	<Header />
	<slot />
	<Footer />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
		margin-top: 8px;
		min-width: 320px;
	}
</style>
