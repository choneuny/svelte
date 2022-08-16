<script>
	import { onMount } from "svelte";
	import Develop from "./Develop.svelte";
	import Nav from "./Nav.svelte";
	import EmbededGame from "./EmbededGame.svelte";
	import Outline from "./Outline.svelte";
	import Comment from "./Comment.svelte";
	import About from "./About.svelte";
	import Footer from "./Footer.svelte";
	import "./assets/font/galmuri.css";
	let size = screen.width;
	$: size = screen.width;
	let develop_mode = false;
	develop_mode = develop_mode;
	let pagination = "main";
</script>

<div id="wrapper" style="--size:{size}">
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
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		background: radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url("./img/background/brickwall.webp");
		z-index: -1;
	}
	#inner {
		scroll-behavior: smooth;
		width: calc(var(--size) * 0.8px);
		height: inherit;
		background: #404040;
		padding: 0;
	}
</style>
