<script>
	import { fade, crossfade } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { flip } from "svelte/animate";
	import ThemeSelect from "../app/ThemeSelect.svelte";
	import Announce from "../app/Announce.svelte";
	import Transaction from "../app/Transaction.svelte";
	import Portfolio from "../app/Portfolio.svelte";
	import PortfolioMini from "../app/PortfolioMini.svelte";
	import RoundClear from "../lib/RoundClear.svelte";
	import Explain from "../app/Explain.svelte";
	import News from "../app/News.svelte";

	import { round, next_round } from "../data/stores.js";
	export let step_done;
	export let check_done;
	export let increasecount;
	export let current_apps;
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
	let apps = [
		// { id: "themeselect", component: ThemeSelect, props: { check_done }, icon: "./img/icon/card_back.svg" },
		{ id: "announce", component: Announce, props: { check_done }, icon: "./img/icon/internet.svg" },
		// { id: "transaction", component: Transaction, props: { check_done }, icon: "./img/icon/transaction_icon.svg" },
		{ id: "pfl", component: Portfolio, props: { check_done }, icon: "./img/icon/chart.png" },
		// { id: "pfl_mini", component: PortfolioMini, props: { check_done }, icon: "./img/icon/chart.png" },
		{ id: "explain", component: Explain, props: { check_done }, icon: "./img/icon/adtech-7.png" },
		// { id: "news", component: News, props: { check_done }, icon: "./img/icon/internet.svg" },
		// {
		// 	id: "roundclear",
		// 	title: "Round Clear",
		// 	apps: [{ id: "loading", component: RoundClear, props: { increasecount } }],
		// },
	];

	let open = (e) => {
		console.log(e);
		console.log(e.target);
		console.log(e.target.id);
		console.log(e.target.parentNode.id);
		const target = e.target.parentNode.id;
		if (current_apps.find((x) => x.id == target) == undefined) {
			current_apps = [...current_apps, apps.find((x) => x.id == target)];
		} else {
			current_apps = current_apps.filter((x) => x.id != target);
		}
		console.log(current_apps);
	};
	let current = apps.filter((x) => current_apps.map((y) => y.id).includes(x.id));
	let deactivated = apps.filter((x) => !current_apps.map((y) => y.id).includes(x.id));
	$: current = apps.filter((x) => current_apps.map((y) => y.id).includes(x.id));
	$: deactivated = apps.filter((x) => !current_apps.map((y) => y.id).includes(x.id));
</script>

<div class="taskbar">
	<!-- {#each current as app (app.id)}
		<div
			id={app.id}
			class="absolute top-[-770px] w-fit h-fit"
			in:receive={{ key: app.id }}
			out:send={{ key: app.id }}
			animate:flip={{ duration: 500 }}
		>
			<svelte:component this={app.component} {...app.props} />
		</div>
	{/each} -->
	{#each apps as app (app.id)}
		<button
			id={app.id}
			class="custom-button"
			disabled={$round === 0}
			on:click={open}
			in:receive={{ key: app.id }}
			out:send={{ key: app.id }}
			animate:flip={{ duration: 200 }}
		>
			<img class="custom-icon" src={app.icon} alt="error" />
		</button>
	{/each}
	<!-- {#each current as app}
		<button id={app.id} class="custom-button" on:click={open}>
			<img class="custom-icon" src={app.icon} alt="error" />
		</button>
	{/each} -->
	<button class="custom-button" on:click={() => (step_done = !step_done)} />
	<div
		id="arrowAnim"
		class={step_done ? "" : "invisible disabled"}
		on:click={() => {
			increasecount();
			step_done = false;
		}}
	>
		<div class="arrowSliding">
			<div class="arrow" />
		</div>
		<div class="arrowSliding delay1">
			<div class="arrow" />
		</div>
		<div class="arrowSliding delay2">
			<div class="arrow" />
		</div>
		<div class="arrowSliding delay3">
			<div class="arrow" />
		</div>
	</div>
</div>

<style>
	.taskbar {
		position: absolute;
		left: calc(var(--size) * 0.07px);
		bottom: -1px;
		width: calc(var(--size) * 0.65px);
		height: calc(var(--size) * 0.035px);
		background: black;
		opacity: 0.9;
		border-radius: 8px 8px 0 0;

		display: flex;
		gap: 15px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.custom-button {
		position: relative;
		width: calc(var(--size) * 0.03px);
		height: calc(var(--size) * 0.03px);

		background-color: white;
		background-size: cover;
		background-position: center;
		border: 3px solid transparent;
		border-radius: 8px;
		padding: 0;
		z-index: 3;
	}
	.custom-button:hover {
		opacity: 0.7;
	}
	.custom-button:disabled {
		opacity: 0.7;
	}
	.custom-icon {
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	#arrowAnim {
		position: absolute;
		width: 15%;
		height: 80%;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.arrow {
		width: calc(var(--size) * 0.01px);
		height: calc(var(--size) * 0.01px);
		border: calc(var(--size) * 0.005px) solid;
		border-color: transparent white white transparent;
		transform: rotate(-45deg);
		box-sizing: content-box;
	}

	.arrowSliding {
		position: absolute;
		-webkit-animation: slide 4s linear infinite;
		animation: slide 4s linear infinite;
	}

	.delay1 {
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}
	.delay2 {
		-webkit-animation-delay: 2s;
		animation-delay: 2s;
	}
	.delay3 {
		-webkit-animation-delay: 3s;
		animation-delay: 3s;
	}

	@-webkit-keyframes slide {
		0% {
			opacity: 0;
			transform: translateX(-100%);
		}
		20% {
			opacity: 1;
			transform: translateX(-150%);
		}
		80% {
			opacity: 1;
			transform: translateX(60%);
		}
		100% {
			opacity: 0;
			transform: translateX(100%);
		}
	}
	@keyframes slide {
		0% {
			opacity: 0;
			transform: translateX(-100%);
		}
		20% {
			opacity: 1;
			transform: translateX(-150%);
		}
		80% {
			opacity: 1;
			transform: translateX(60%);
		}
		100% {
			opacity: 0;
			transform: translateX(100%);
		}
	}
</style>
