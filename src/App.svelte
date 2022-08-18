<script>
	import { background } from "./components/data/GlovalVariable.js";
	import Nav from "./Nav.svelte";
	import EmbededGame from "./EmbededGame.svelte";
	import Outline from "./Outline.svelte";
	import Comment from "./Comment.svelte";
	import About from "./About.svelte";
	import Footer from "./Footer.svelte";

	let width, media;
	const media_check = () => {
		const size = screen.width;
		if (size < 768) return [size * 0.8, "small"];
		if (size < 1024) return [size * 0.7, "medium"];
		return [size * 0.7, "large"];
	};
	$: [width, media] = media_check();
	$: console.log(width, media, screen.width, window.innerWidth);
</script>

<div
	id="wrapper"
	style:--size={width}
	style:background="radial-gradient(#0000001a, #00000050), url({background.brickwall})"
>
	<div id="inner">
		<Nav />
		<EmbededGame />
		<Outline />
		<Comment />
		<About />
		<Footer />
	</div>
</div>

<style>
	#wrapper {
		font-family: "Galmuri11, Proxima Nova, system-ui, sans-serif";
		width: 100vw;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		z-index: -1;
	}
	#inner {
		width: calc(var(--size) * 0.8px);
		height: inherit;
		background: #404040;
		padding: 0;
	}
</style>
