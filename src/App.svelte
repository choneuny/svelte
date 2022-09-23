<script>
	import {
		width as wd,
		set_width,
		media as md,
		set_media,
	} from "./components/data/stores.js";
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
	$: {
		console.log("media size is", screen.width, "px");
		[width, media] = media_check();
		set_width(width);
		set_media(media);
		document.querySelector("html").style.fontSize = $wd * 0.01 + "px";
	}
	$: console.log($wd);
</script>

<div
	id="wrapper"
	style:--size={$wd}
	style:background="radial-gradient(#0000001a, #00000050), url({background.brickwall})"
>
	<div id="inner">
		<Nav {media} />
		<EmbededGame {width} />
		<!-- <Outline />
		<Comment />
		<About /> -->
		<!-- <Footer /> -->
	</div>
</div>

<style>
	#wrapper {
		font-family: "Galmuri11, Proxima Nova, system-ui, sans-serif";
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		z-index: -1;
	}
	#inner {
		width: calc(var(--size) * 1px);
		height: fit-content;
		background: #404040;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: calc(var(--size) * 0.025px);
	}
</style>
