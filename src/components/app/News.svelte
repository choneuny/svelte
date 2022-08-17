<script>
	// @ts-nocheck
	import { image, background as bg } from "../data/GlovalVariable.js";
	import { fade } from "svelte/transition";
	import Newsmaster from "../data/Newsmaster";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import app_styles from "../lib/__AppStyles";
	export let check_done;
	let newsopen = false;
	let moveSlide;
	let news_list = [];
	const news_key = { symbol: "", title: "title", content: "body" };

	const user = JSON.parse(localStorage.getItem("user"));
	const themes = JSON.parse(localStorage.getItem("theme"));
	const news = Newsmaster.filter((x) => x.corp == "");

	let theme = [...themes];
	theme.forEach((x) => {
		if (user.filter((y) => y.theme === x.theme).reduce((a, b) => a + b.amount, 0) === 0) {
			x.checked = false;
			x.fixed = false;
		}
	});
	localStorage.setItem("theme", JSON.stringify(theme));
	console.log(themes);
	console.log(theme);

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
	const mystyle = {
		width: 800,
		height: 780,
		left: 400,
		top: 10,
		title: "인터넷",
		icon: image.internet,
		bgcolor: "#b2b2b2",
	};
	const styles = Object.assign(app_styles, mystyle);
	news_generator();
	reflect();

	const random = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min)
			.toString()
			.padStart(2, "0");
</script>

{#if !newsopen}
	<div
		class="newscomes soft_blink"
		style={bg.newspaper}
		on:click={() => {
			newsopen = !newsopen;
			console.log(newsopen);
			check_done();
		}}
	/>
{:else}
	<Window {styles}>
		<div class="dart bg-white flex flex-col items-center">
			<!--HEADER-->
			<div class="relative w-full h-1/8 bg-black flex flex-row items-center p-4 px-6 gap-4">
				<div class="aspect-square border border-white flex flex-col justify-center">
					<p class="text-white text-4xl">{"\u00a0"}N{"\u00a0"}</p>
				</div>
				<p class="text-white text-5xl">NEWS</p>
			</div>
			<!--CONTENTS-->
			<!--CAROUSEL FRAME-->
			<div class="w-full content h-full" on:load={(e) => console.log(e.target.offsetWidth)}>
				<!--CAROUSEL CONTAINER-->
				<Carousel count={news_list.length} width={776} bind:moveSlide show_control={false}>
					{#each news_list as news, i}
						<!--CAROUSEL ITEM-->
						<div
							class="relative w-full bg-white text-gray flex flex-row justify-center items-center gap-4 px-4"
							on:dblclick={() => moveSlide(-1)}
						>
							<!--CONTROLER-->
							<div class="w-[80px] h-full relative">
								<!--PAGE GUIDE-->
								<p class="absolute top-2 text-[#999999]">{i + 1} / {news_list.length}</p>
								<img
									class="absolute bottom-8 rotate-90  
										{i == 0 ? 'opacity-50' : 'transition duration-300 hover:opacity-50'}"
									src={image.down_arrow}
									alt={image.alt}
									on:click={i === 0 ? null : () => moveSlide(1)}
								/>
							</div>
							<!--ADDITIONAL FRAME-->
							<div class="w-3/4 h-full flex flex-col gap-4">
								<!--NEWS IMAGE-->
								<div class="w-full h-1/4 bg-[#bcbcbc] flex flex-row items-center justify-center gap-12">
									<img class="h-full" src={image[news.theme]} alt="err" />
									<h style="font-size:{40}px">{news.theme}</h>
								</div>
								<!--NEWS BODY-->
								<p class="text-center" style="font-size:{28}px">{news[news_key.title]}</p>
								<p class="text-[#999999]" style="font-family:roboto; font-size:{12}px">
									입력 2022.{random(1, 12)}.{random(1, 30)}. 오후 {random(0, 24)}:{random(0, 59)}
								</p>
								<p style="font-size:{20}px; font-weight:500">
									{@html news[news_key.content].replace(/-/g, "<br />&nbsp;&nbsp;-")}
								</p>
							</div>
							<!--CONTROLER-->
							<div
								class="w-[80px] h-full relative
									"
							>
								<img
									class="absolute bottom-8 -rotate-90
										{i == news_list.length - 1 ? 'opacity-50' : 'transition duration-300 hover:opacity-50 '}"
									src={image.down_arrow}
									alt={image.alt}
									on:click={i === news_list.length - 1 ? null : () => moveSlide(-1)}
								/>
							</div>
							<!--NEWS ENDS-->
						</div>
					{/each}
				</Carousel>
			</div>
		</div>
	</Window>
{/if}

<style>
	.dart {
		position: relative;
		width: 100%;
		height: 100%;
		gap: 10px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.content {
		color: #000;
		overflow: hidden;
		border: 1px solid transparent;
	}
	.newscomes {
		background-repeat: no-repeat;
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
