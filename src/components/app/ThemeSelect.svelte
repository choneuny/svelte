<script>
	import { image } from "../data/GlovalVariable.js";
	import { onDestroy, tick } from "svelte";
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";
	import { fade, crossfade } from "svelte/transition";
	import { round } from "../data/stores.js";
	import Newsmaster from "../data/Newsmaster.js";
	import Window from "../lib/Window.svelte";
	import Corpmaster from "../data/Corpmaster.js";
	import Carousel from "../lib/Carousel.svelte";
	import { style } from "../data/appstyle.js";
	import { width as wd, media as md } from "../data/stores.js";
	export let check_done;
	export let diag_event;
	let additional_dialog = "corpselect";
	let news = JSON.parse(localStorage.getItem("news"));
	let user = JSON.parse(localStorage.getItem("user"));
	let history = JSON.parse(localStorage.getItem("history"));
	let themes = JSON.parse(localStorage.getItem("theme"));
	const threshold = 2 + $round;
	const init = $round === 0;
	const max = Math.min(
		2,
		threshold - themes.filter((x) => x.fixed === true).length
	);
	const salary = init ? 10 : 2;
	const styles = {
		width: $wd * 0.8,
		height: $wd * 0.47,
		left: $wd * 0.07,
		top: $wd * 0.002,
		title: "Select Themes!",
		icon: image.card_back,
		bgcolor: "transparent",
	};
	console.log("style", styles);
	let next;
	let cont = false;
	let selected = [];
	let width = $wd * 0.8;

	const randompick = (arr) => {
		const index = Math.floor(Math.random() * arr.length);
		console.log(index);
		console.log(arr);
		console.log(arr[index]);
		return arr[index];
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
		const children = [...target.parentNode.parentNode.children];
		const childs = [...children.filter((x) => x.id == "check")];
		console.log(childs.forEach((x) => console.log(x.id)));
		childs.forEach((element) => {
			const input = element.querySelector("input");
			console.log(input);
			input.checked = false;
			user.find((x) => x.id == input.id).amount = 0;
		});
		target.checked = true;
		user.find((x) => x.id == id).amount = salary / max;
		document.querySelectorAll("#check input:checked").length === max
			? check_done()
			: null;
		localStorage.setItem("user", JSON.stringify(user));
	};
	const push = (e) => {
		const theme_id = e.target.id === "" ? e.target.parentNode.id : e.target.id;
		const tmp = [...themes];
		console.log(tmp.filter((x) => x.id === theme_id)[0]);
		tmp.filter((x) => x.id === theme_id)[0].checked = true;
		if (selected.length >= max) {
			let i = selected.shift();
			i.checked = false;
		}
		selected = [...selected, tmp.filter((x) => x.id === theme_id)[0]];
		themes = tmp;
	};

	onDestroy(() => {
		themes.filter((x) => x.checked).forEach((x) => (x.fixed = true));
		const validStock = user.filter((x) => x.amount > 0 && x.name !== "cash");
		const validCorpname = validStock.map((x) => x.name);
		const announce = validCorpname.map((x) =>
			randompick(Newsmaster.filter((y) => y.corp === x))
		);
		news["announce"] = announce;

		console.log(news);

		history.pop();
		history.push(user);
		localStorage.setItem("theme", JSON.stringify(themes));
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("history", JSON.stringify(history));
		localStorage.setItem("news", JSON.stringify(news));
	});

	$: cont = themes.filter((x) => x.checked).length === max;
	$: localStorage.setItem("theme", JSON.stringify(themes));
</script>

<Window {styles}>
	<Carousel count={2} {width} bind:moveSlide={next} show_control={false}>
		<div class="flexbox" style:width={$wd * 0.8 + "px"}>
			<div class="flexbox" style:width={$wd * 0.6 + "px"}>
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
							style="--deg:{-15 + i * 10}deg;--trans:{Math.abs(-1.5 + i) *
								2}rem"
						>
							<p class="medium">{theme.theme.toUpperCase()}</p>
							<p class="medium">{theme.title}</p>
							<img class="cardback" src={theme.icon} alt="error!" />
						</div>
					</div>
				{/each}
			</div>
			<div
				class="selected rounded bg-wooden medium py-8 px-2 gap-6"
				style:width={$wd * 0.2 + "px"}
			>
				<p class="medium font-semibold">SELLECTED</p>
				{#each selected as item (item.id)}
					<div
						class="flex flex-col justify-center w-full h-32 bottom-3 rounded border text-center shadow-2xl"
						in:receive={{ key: item.id }}
						out:send={{ key: item.id }}
						animate:flip={{ duration: 200 }}
					>
						<p class="medium font-semibold">
							{item.title}
						</p>
					</div>
				{/each}
				<button
					class="absolute medium rounded border w-11/12 "
					style:padding="1.5rem"
					style:bottom="1rem"
					style:filter="var(--shallow-shadow)"
					disabled={!cont}
					on:click={() => {
						next(-1);
						diag_event(additional_dialog);
					}}>CONTINUE</button
				>
			</div>
		</div>
		<div class=" fill flexbox" transition:fade>
			{#each themes.filter((x) => x.checked && !x.fixed) as theme}
				<div class="realative fill flexbox box-border" style:gap="-1rem">
					<div
						class="large font-bold absolute uppercase rounded top-[1rem] bg-[#fff9af] w-1/6 h-1/6 py-[1%]"
						style:filter="var(--deep-shadow)"
						style:box-sizing="border-box"
						style:text-align="center"
					>
						{theme.title}
					</div>
					{#each user.filter((x) => x.theme === theme.theme) as user, i}
						<label id="check">
							<input
								id={user.id}
								type="checkbox"
								class="hidden"
								on:click={check_only_one}
							/>
							<div class="card" style="--z:{5 - i}">
								<div
									class="card-face"
									style="--deg:{i * 6}deg;--trans:{Math.abs(-0.5 + i) * 2}rem"
								>
									<div class="w-full h-1/4 flex flex-row align-center basis-0">
										<p class="grow-[3] medium">{user.name}</p>
										<div class="w-[20%]">
											<img class="object-fill" src={theme.icon} alt="error!" />
										</div>
									</div>

									<p
										class="{$md == 'large'
											? 'smaller'
											: 'smallest'} font-normal"
										style:word-break="keep-all"
									>
										{@html Corpmaster.find((x) => x.name == user.name)
											.outline.replace(
												Corpmaster.find((x) => x.name == user.name).emphasis[0],
												"<b>" +
													Corpmaster.find((x) => x.name == user.name)
														.emphasis[0] +
													"</b>"
											)
											.replace(
												Corpmaster.find((x) => x.name == user.name).emphasis[1],
												"<b>" +
													Corpmaster.find((x) => x.name == user.name)
														.emphasis[1] +
													"</b>"
											)}
									</p>
								</div>
							</div>
						</label>
					{/each}
				</div>
			{/each}
		</div>
	</Carousel>
</Window>

<style>
	* {
		color: #000;
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

		width: 25%;
		height: 98%;
		right: 0;
		filter: var(--deep-shadow);
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
		width: 18rem;
		height: 27rem;
		margin: 0 -6%;
		position: relative;
		top: 5%;
		z-index: calc(var(--z));
	}
	.card-face {
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		content: "";
		background: linear-gradient(
					to right bottom,
					transparent 50%,
					rgba(0, 0, 0, 0.4) 0
				)
				no-repeat 0% 0 / 2em 2em,
			linear-gradient(135deg, transparent 1.41em, #8d6e63 0);
		transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
		transform: rotate(var(--deg)) translate(0, var(--trans));
		pointer-events: none;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		justify-self: center;
		align-items: center;
		font-size: 2rem;
		font-weight: bold;
		letter-spacing: -0.025rem;
		padding: 1.5rem;
		box-sizing: border-box;
		filter: var(--deep-shadow);
	}
	.card:hover .card-face {
		transform: scale(1.15) translate(0, -6rem);
		z-index: 99;
	}
	.card:hover {
		z-index: 99;
	}
	.card-face img {
		width: 80%;
	}
</style>
