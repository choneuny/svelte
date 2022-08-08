<script>
	import About from "./About.svelte";
	import App from "./App.svelte";
	import Window from "./components/lib/Window.svelte";
	const pkg = {
		func: null,
		icon: "./img/icon/internet.svg",
		title: "Internet",
	};
</script>

<div class="wrapper">
	<Window {...pkg} />
</div>
