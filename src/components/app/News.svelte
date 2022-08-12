<script>
	// @ts-nocheck
	import { fade } from "svelte/transition";
	import Newsmaster from "../data/Newsmaster";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	export let check_done;
	const user = JSON.parse(localStorage.getItem("user"));
	const theme = JSON.parse(localStorage.getItem("theme"));
	const news = Newsmaster.filter((x) => x.corp == "");
	let news_list = [];
	const news_generator = () => {
		const unchosen = theme.filter((x) => x.checked == false).map((x) => x.theme);
		unchosen.forEach((x) => {
			const valid = news.filter((y) => y.theme === x);
			const picked = valid[Math.floor(Math.random() * valid.length)];
			news_list.push(picked);
		});
	};
	const reflect = () => {
		const infl = news_list.reduce(function (total, current) {
			const infl_list = current.infl.split("-");
			infl_list.forEach((x) => total.push({ infl: x, fluct: current.fluct }));
			return total;
		}, []);
		console.log(infl);
		user.forEach((x) => (x.fluct = 1));
		infl.forEach((x) => (user.find((y) => y.name === x.infl).fluct += x.fluct * 0.01));
		user.forEach((x) => (x.price = Math.round(x.price * x.fluct)));
		console.log(user);
		localStorage.setItem("user", JSON.stringify(user));
	};
	news_generator();
	reflect();

	let newsopen = false;
	const pkg = {
		icon: "./img/icon/internet.svg",
		title: "인터넷",
		left: 0,
		top: 0,
		bgcolor: "#b2b2b2",
	};
	const news_key = { symbol: "", title: "title", content: "body" };
</script>

{#if !newsopen}
	<div
		class="newscomes"
		on:click={() => {
			newsopen = !newsopen;
			console.log(newsopen);
			check_done();
		}}
	/>
{:else}
	<div class="container" transition:fade>
		<Window {...pkg}>
			<div class="dart">
				<div class="header">
					<img src="./img/icon/dart.png" alt="./img/icon/alt.png" />
				</div>
				<div class="content" on:load={(e) => console.log(e.target.offsetWidth)}>
					<Carousel count={2} width={768}>
						{#each news_list as news, i}
							<div class="w-1/2 bg-white text-gray flex flex-col gap-8 p-8 box-border">
								<p class="font-bold text-2xl text-center antialiased">{news[news_key.title]}</p>
								<p class="font-bold text-xl antialiased">
									{@html news[news_key.content].replace(/-/g, "<br />&nbsp;&nbsp;-")}
								</p>
							</div>
						{/each}
					</Carousel>
				</div>
			</div>
		</Window>
	</div>
{/if}

<style>
	* {
		color: black;
	}
	.container {
		position: absolute;
		width: 52%;
		height: 90%;
		margin-left: calc(50% - 400px);
		margin-top: 5px;
	}
	.dart {
		width: 800px;
		height: 700px;
		padding: 10px;
		gap: 10px;
		box-sizing: border-box;
		display: grid;

		grid-template-rows: 0.5fr 2fr;
	}

	.header {
		width: 100%;
		height: 0.5fr;
		border: 1px solid transparent;
		border-radius: 8px;
		box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
		background-color: #1975db;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.content {
		overflow: hidden;
		border: 1px solid transparent;
		border-radius: 12px;
		box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
	}
	.newscomes {
		background: url(./img/NEwspaper_alarmed.png) no-repeat;
		background-size: contain;
		background-position: center;
		position: absolute;
		top: 50%;
		left: 50%;
		width: calc(var(--size) * 0.55px);
		height: calc(var(--size) * 0.35px);
		transform: translate(-50%, -50%);
		appearance: None;
		z-index: 10;
	}
</style>
