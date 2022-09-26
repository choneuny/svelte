<script>
	import { image } from "./components/data/GlobalVariable.js";
	import { width as wd, set_width } from "./components/data/stores.js";
	import Intro from "./components/Intro.svelte";
	import Room from "./components/Room.svelte";
	import Screen from "./components/Screen.svelte";
	import SetLocalStorage from "./components/lib/SetLocalStorage";
	export let width = 1920;
	const height_ratio = 0.52875;
	let page = "intro";
	let isfull;
	document.addEventListener("fullscreenchange", () => {
		isfull = document.fullscreen;
		isfull ? set_width(screen.width) : set_width(width);
		isfull ? console.log(screen.width) : console.log(width);
	});
	function toggleFullScreenMode(event) {
		const doc = event.target.parentElement;
		if (isfull) return document.exitFullscreen();
		return doc.requestFullscreen();
	}

	SetLocalStorage();
	let setPage = (newpage) => {
		setTimeout(() => {
			page = newpage;
		}, 500);
	};
</script>

<!-- svelte-ignore missing-declaration -->
<div
	id="embededgame"
	class="gamewrapper nodrag"
	style:width={$wd + "px"}
	style:height={(isfull ? window.innerWidth : width) * height_ratio + "px"}
	style:padding={"0 " + (isfull ? 0 : width * 0.03) + "px"}
>
	{#if page === "intro"}
		<Intro bind:setPage />
	{:else if page === "room"}
		<Room bind:setPage {page} />
	{:else if page === "screen"}
		<Screen />
	{/if}
	<!-- <button
		class="fullscreen"
		style:background="url({image.fullscreen}) center center no-repeat"
		style:background-size="cover"
		on:click={(e) => toggleFullScreenMode(e)}
	/> -->
</div>

<style>
	* {
		font-family: "Galmuri", "갈무리", "Galmuri11";
	}

	.gamewrapper {
		position: relative;
		z-index: 3;
		border: none;
		align-items: center;
		background-color: #111111;
		overflow: hidden;
		box-shadow: 0px -8px 5px rgba(0, 0, 0, 0.2);
	}
	/* 
	button.fullscreen {
		position: absolute;
		width: calc(var(--size) * 0.025px);
		height: calc(var(--size) * 0.025px);
		right: calc(var(--size) * 0.0025px);
		bottom: calc(var(--size) * 0.0025px);
		background-size: cover;
		padding: 0;
		border: 0;
		z-index: 999;
		filter: invert(100%);
	}
	button.fullscreen:hover {
		opacity: 0.5;
	}
	button.fullscreen:active {
		opacity: 0.5;
	} */
</style>
