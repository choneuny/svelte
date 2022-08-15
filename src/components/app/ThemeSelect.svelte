<script>
	import { onDestroy, tick } from "svelte";
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";
	import { fade, crossfade } from "svelte/transition";
	import { round } from "../data/stores.js";
	import Window from "../lib/Window.svelte";
	import Corpmaster from "../data/Corpmaster.js";
	import Carousel from "../lib/Carousel.svelte";
	export let check_done;
	let user = JSON.parse(localStorage.getItem("user"));
	let themes = JSON.parse(localStorage.getItem("theme"));
	let next;
	let cont = false;
	const threshold = 2 + $round;
	let selected = [];
	let width = 1286;
	const pkg = {
		icon: "./img/icon/card_back.svg",
		title: "Select Themes!",
		left: 0,
		top: 0,
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
	const check_only_one = (e) => {
		const target = e.target;
		const id = target.id;
		const childs = [...target.parentNode.parentNode.children];
		childs.forEach((element) => {
			const input = element.querySelector("input");
			input.checked = false;
			console.log(user.find((x) => x.id == input.id));
			user.find((x) => x.id == input.id).amount = 0;
		});
		target.checked = true;
		if ($round === 0) {
			user.find((x) => x.id == id).amount = 5;
			user.filter((x) => x.amount > 0).length === threshold ? check_done() : null;
		} else {
			user.find((x) => x.id == id).amount = 2;
			user.filter((x) => x.amount > 0).length === threshold ? check_done() : null;
		}
		localStorage.setItem("user", JSON.stringify(user));
	};
	const push = (e) => {
		const theme_id = e.target.id === "" ? e.target.parentNode.id : e.target.id;
		const tmp = [...themes];
		console.log(tmp.filter((x) => x.id === theme_id)[0]);
		tmp.filter((x) => x.id === theme_id)[0].checked = true;
		const max = $round === 0 ? 2 : 1;
		if (selected.length >= max) {
			let i = selected.shift();
			i.checked = false;
		}
		selected = [...selected, tmp.filter((x) => x.id === theme_id)[0]];
		themes = tmp;
	};
	$: cont = themes.filter((x) => x.checked).length === threshold;
	$: localStorage.setItem("theme", JSON.stringify(themes));
	onDestroy(() => {
		themes.filter((x) => x.checked).forEach((x) => (x.fixed = true));
		console.log(themes);
		localStorage.setItem("theme", JSON.stringify(themes));
		localStorage.setItem("user", JSON.stringify(user));
	});
</script>

<div class="container">
	<Window {...pkg}>
		<Carousel count={2} {width} bind:moveSlide={next} show_control={false}>
			<div class="fill flexbox">
				<div class="fill flexbox">
					{#each themes.filter((x) => !x.checked) as theme, i (theme.id)}
						<div
							id={theme.id}
							class="card"
							style="--z:{5 - i}"
							on:click={push}
							in:receive={{ key: theme.id }}
							out:send={{ key: theme.id }}
							animate:flip={{ duration: 200 }}
						>
							<div
								class="card-face flex flex-col gap-8"
								style="--deg:{-15 + i * 10}deg;--trans:{Math.abs(-15 + i * 10) * 2}px"
							>
								<h1 class="text-4xl">{theme.theme.toUpperCase()}</h1>
								<h3 class="text-3xl">{theme.title}</h3>
								<img class="cardback" src={theme.icon} alt="error!" />
							</div>
						</div>
					{/each}
				</div>
				<div class="selected rounded bg-wooden text-2xl py-8 px-2 gap-6">
					<h1 class="text-4xl">SELLECTED</h1>
					{#each selected as item (item.id)}
						<div
							class="flex flex-col justify-center w-full h-32 bottom-3 rounded border text-center shadow-2xl"
							in:receive={{ key: item.id }}
							out:send={{ key: item.id }}
							animate:flip={{ duration: 200 }}
						>
							<h1 class="text-4xl">
								{item.title}
							</h1>
						</div>
					{/each}
					<button
						class="absolute bottom-3 rounded border p-8 w-11/12 text-2xl shadow-2xl"
						disabled={!cont}
						on:click={() => next(-1)}>CONTINUE</button
					>
				</div>
			</div>
			<div class="fill flexbox" transition:fade>
				{#each themes.filter((x) => x.checked && !x.fixed) as theme}
					<div class="realative fill flexbox">
						{#each user.filter((x) => x.theme === theme.theme) as user, i}
							<label>
								<input id={user.id} type="checkbox" class="hidden" on:click={check_only_one} />
								<div class="card" style="--z:{5 - i}">
									<div class="card-face gap-6" style="--deg:{i * 10}deg;--trans:{Math.abs(-15 + i * 10) * 2}px">
										<div class="w-full h-1/4 flex flex-row align-center basis-0 pl-6">
											<p class="grow-[3] text-3xl">{user.name}</p>
											<div class="w-1/4">
												<img class="w-1/4 object-fill" src={theme.icon} alt="error!" />
											</div>
										</div>
										<p>{Corpmaster.filter((x) => x.name === user.name).map((y) => y.outline)[0]}</p>
									</div>
								</div>
							</label>
						{/each}
					</div>
				{/each}
			</div>
		</Carousel>
	</Window>
</div>

<style>
	* {
		color: #000;
	}

	.container {
		position: relative;
		width: 1300px;
		height: 750px;
		margin-left: 120px;
		margin-top: 5px;
		background-color: transparent;
	}

	.flexbox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.selected {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px;
		box-sizing: border-box;

		width: 320px;
		height: 98%;
		right: 0;
		filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.2)) drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.2))
			drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.2)) drop-shadow(8px 16px 16px rgba(0, 0, 0, 0.2))
			drop-shadow(16px 32px 32px rgba(0, 0, 0, 0.2));
	}

	input:checked + .card .card-face {
		filter: brightness(60%);
	}
	input:checked + .card {
		z-index: 98;
	}
	button:disabled {
		opacity: 0.5;
	}
	.card {
		height: 450px;
		margin: 0 -60px;
		position: relative;
		width: 320px;
		top: 50px;
		z-index: calc(var(--z));
	}
	.card-face {
		bottom: 0;
		content: "";
		left: 0;
		background: linear-gradient(to right bottom, transparent 50%, rgba(0, 0, 0, 0.4) 0) no-repeat 0% 0 / 2em 2em,
			linear-gradient(135deg, transparent 1.41em, #8d6e63 0);
		transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
		transform: rotate(var(--deg)) translate(0, var(--trans));
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-self: center;
		align-items: center;
		font-size: 24px;
		font-weight: bold;
		letter-spacing: -0.025em;
		padding: 30px;
		box-sizing: border-box;
		filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.2)) drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.2))
			drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.2)) drop-shadow(8px 16px 16px rgba(0, 0, 0, 0.2))
			drop-shadow(16px 32px 32px rgba(0, 0, 0, 0.2));
	}
	.card:hover .card-face {
		transform: scale(1.15) translate(0px, -80px);
		z-index: 99;
	}
	.card:hover {
		z-index: 99;
	}
	.card-face img {
		width: 80%;
	}
</style>
