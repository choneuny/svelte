<script>
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { round } from "../data/stores.js";
	import Window from "../lib/Window.svelte";
	export let done = false;
	const pkg = {
		func: null,
		icon: "./img/icon/card_back.svg",
		title: "Select Themes!",
	};
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === "none" ? "" : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			};
		},
	});
	let themes = JSON.parse(localStorage.getItem("theme"));
	const threshold = 2 + $round;
	let selected = [];
	const push = (e) => {
		const theme_id = e.target.id === "" ? e.target.parentNode.id : e.target.id;
		const tmp = [...themes];
		console.log(theme_id);
		console.log(tmp.filter((x) => x.id === theme_id)[0]);
		console.log(selected);
		tmp.filter((x) => x.id === theme_id)[0].checked = true;
		if (selected.length >= threshold) {
			console.log(threshold);
			let i = selected.shift();
			i.checked = false;
		}
		selected = [...selected, tmp.filter((x) => x.id === theme_id)[0]];
		themes = tmp;
	};
	let next = false;
	$: done = themes.filter((x) => x.checked).length === threshold;
	$: localStorage.setItem("theme", JSON.stringify(themes));
	const a = new Array(4).fill(0);
</script>

<Window {...pkg}>
	{#if !next}
		<div class="cards">
			{#each themes.filter((x) => !x.checked) as theme, i}
				<div id={theme.id} class="card" transition:receive={{ key: theme.id }} on:click={push}>
					<div class="card-face" style="--deg:{i * 10}deg">
						<h1>{theme.theme.toUpperCase()}</h1>
						<h3>{theme.title}</h3>
						<img class="cardback" src={theme.icon} alt="error!" />
					</div>
				</div>
			{/each}
		</div>
		<div class="selected">
			<h1>SELLECTED</h1>
			{#each selected as item (item.id)}
				<h1 in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip={{ duration: 200 }}>
					{item.title}
				</h1>
			{/each}
			<button on:click={() => (next = true)}>CONTINUE</button>
		</div>
	{:else}
		<div>
			<span />
		</div>
	{/if}
</Window>

<style>
	.selected {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		gap: 10px;

		width: 320px;
		height: 710px;
		left: calc(50% - 320px / 2 + 427px);
		top: calc(50% - 710px / 2 - 17px);

		background: rgba(0, 0, 0, 0.5);
	}
	.cards {
		bottom: 150px;
		left: 250px;
		display: flex;
		flex-direction: row;
		width: fit-content;
		height: fit-content;
		justify-content: flex-start;
		position: absolute;
	}
	.card {
		height: 400px;
		margin: 0 -80px;
		position: relative;
		width: 250px;
	}
	.card-face {
		bottom: 0;
		content: "";
		left: 0;
		background: #fff;
		transform: rotate(var(--deg));
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
		display: flex;
		flex-direction: column;
		justify-self: center;
		align-items: center;
		font-family: "helvetica neue", helvetica, arial, sans-serif;
		font-size: 24px;
		font-weight: bold;
		letter-spacing: -0.025em;
		padding: 15px 0 0 15px;
		box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.card:hover .card-face {
		transform: scale(1.2) translate(0px, -100px);
		z-index: 99;
	}
	.card-face img {
		width: 80%;
	}
</style>
