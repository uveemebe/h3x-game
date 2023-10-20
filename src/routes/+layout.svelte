<script>
	import Footer from './footer.svelte';
	import Header from './header.svelte';
</script>


<div>
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		margin: 8px;
		width: calc(100vw - 16px);
	}
	main {
		display: flex;
		flex-direction: column;
	}
</style>
