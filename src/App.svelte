<script>
	import { onMount } from "svelte";
	import About from "./About.svelte";
	import Develop_set from "./Develop.js";
	import Develop from "./Develop.svelte";
	import Nav from "./Nav.svelte";
	import Header from "./Header.svelte";
	import EmbededGame from "./EmbededGame.svelte";
	import Outline from "./Outline.svelte";
	import Comment from "./Comment.svelte";
	import Footer from "./Footer.svelte";
	import "./assets/font/galmuri.css";
	let size = screen.width;
	$: size = screen.width;
	// onMount(async () => {
	// 	Develop_set();
	// });
	let develop_mode = false;
	develop_mode = develop_mode;
	let pagination = "main";
</script>

<div id="wrapper" style="--size:{size}">
	<div id="inner">
		<button
			on:click={() => {
				pagination = "develop";
				console.log(pagination);
			}}>{pagination}</button
		>
		{#if pagination === "develop"}
			<Develop />
		{:else if pagination === "about"}
			<Nav />
			<About />
		{:else}
			<Nav />
			<EmbededGame />
			<Outline />
			<Comment />
			<Footer />
		{/if}
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
		width: calc(var(--size) * 0.8px);
		height: inherit;
		background: #404040;
		padding: 0;
	}
</style>
