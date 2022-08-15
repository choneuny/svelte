<script>
	// @ts-nocheck
	import { fade, crossfade } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import Taskbar from "./lib/Taskbar.svelte";
	import Typer from "./lib/Typer.svelte";
	import ThemeSelect from "./app/ThemeSelect.svelte";
	import Announce from "./app/Announce.svelte";
	import Transaction from "./app/Transaction.svelte";
	import PortfolioMini from "./app/PortfolioMini.svelte";
	import Portfolio from "./app/Portfolio.svelte";
	import RoundClear from "./lib/RoundClear.svelte";
	import Explain from "./app/Explain.svelte";
	import News from "./app/News.svelte";
	import Fairy from "./lib/Fairy.svelte";
	import InitDialog from "./data/InitDialog.js";

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
	let diag_open = true;
	let step_done = false;
	let check_done = () => {
		step_done = true;
		console.log("done");
	};
	let count = 0;
	let increasecount = () => {
		if (count < step.length - 1) {
			count++;
		} else {
			count = 0;
		}
		current_step = step[count];
		diag = InitDialog[current_step.id];
		if (diag.length > 0) {
			diag_open = true;
		}
		console.log(count);
	};

	let step = [
		{
			id: "select",
			title: "Select Theme",
			apps: [{ id: "themeselect", component: ThemeSelect, props: { check_done } }],
		},
		{
			id: "announce",
			title: "Announce",
			apps: [{ id: "announce", component: Announce, props: { check_done } }],
		},
		{
			id: "transaction",
			title: "Transaction",
			apps: [
				{ id: "transaction", component: Transaction, props: { check_done } },
				{ id: "pfl_mini", component: PortfolioMini, props: { check_done } },
			],
		},
		{
			id: "roundclear",
			title: "Round Clear",
			apps: [{ id: "loading", component: RoundClear, props: { increasecount } }],
		},
		{
			id: "roundstart",
			title: "Round Start",
			apps: [
				{ id: "pfl", component: Portfolio, props: { check_done } },
				{ id: "explain", component: Explain, props: { check_done } },
			],
		},
		{
			id: "news",
			title: "News",
			apps: [{ id: "news", component: News, props: { check_done } }],
		},
	];

	let current_step = step[count];
	let diag = InitDialog[current_step.id];
</script>

<div class="screen" transition:fade>
	<div class="wallpaper">
		<Fairy />
		{#each current_step.apps as app (app.id)}
			<div class="w-fit h-fit" in:receive={{ key: app.id }} out:send={{ key: app.id }}>
				<svelte:component this={app.component} {...app.props} />
			</div>
		{/each}
		{#if diag_open}
			<Typer bind:dialog={diag} bind:isopen={diag_open} />
		{/if}
		<Taskbar bind:step_done {check_done} {increasecount} bind:current_apps={current_step.apps} />
	</div>
</div>

<style>
	.screen {
		position: relative;
		width: inherit;
		height: inherit;
		background: url(./img/background/monitor.png) no-repeat;
		background-size: cover;
	}
	.wallpaper {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 99%;
		height: 98.5%;
		transform: translate(-50%, -50%);
		background: url(./img/background/gradient.png);
		background-size: contain;
	}
</style>
