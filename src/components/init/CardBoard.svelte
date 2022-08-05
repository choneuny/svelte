<script>
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { onDestroy } from "svelte";
	import { round } from "../data/stores.js";
	import ThemeCard from "../lib/ThemeCard.svelte";
	import Card from "../lib/Card.svelte";
	export let done = false;
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
	const themes = JSON.parse(localStorage.getItem("theme"));
	const threshold = 2 + $round;
	$: done = themes.filter((x) => x.checked).length === threshold;
	$: localStorage.setItem("theme", JSON.stringify(themes));
</script>

<div class="cardboard">
	<div class="cardstack">
		{#each themes.filter((x) => !x.checked) as theme (theme.id)}
			<div
				in:receive={{ key: theme.id }}
				out:send={{ key: theme.id }}
				animate:flip={{ duration: 200 }}
				on:click={() => (theme.checked = true)}
			>
				<ThemeCard bind:theme />
			</div>
		{/each}
	</div>
	<div class="holding">
		{#each themes.filter((x) => x.checked) as theme (theme.id)}
			<div
				in:receive={{ key: theme.id }}
				out:send={{ key: theme.id }}
				animate:flip={{ duration: 200 }}
				on:click={theme.fixed ? null : () => (theme.checked = false)}
			>
				<ThemeCard bind:theme />
			</div>
		{/each}
	</div>
</div>

<style>
	div.cardboard {
		position: relative;
		width: inherit;
		height: 75%;

		display: grid;
		grid-template-columns: 3fr;

		padding: 20px 20px 0 20px;
		box-sizing: border-box;
		background: "transparent";
		opacity: 1;
	}

	div.cardstack {
		display: flex;
		height: calc(var(--size) * 0.25px);
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		white-space: nowrap;

		opacity: 0.8;
	}

	div.holding {
		display: flex;
		height: calc(var(--size) * 0.15px);
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: -20px;

		white-space: nowrap;
		margin: 0 200px;
		padding: 10px;
		box-sizing: border-box;
		opacity: 0.8;
	}
</style>
