<script>
	// @ts-nocheck
	import Newsmaster from "../data/Newsmaster";
	import { onMount, afterUpdate } from "svelte/internal";
	import { fade } from "svelte/transition";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import app_styles from "../lib/__AppStyles.js";
	export let check_done;

	let newsopen = false;
	let moveSlide;
	const news_key = { symbol: "corp", title: "title", content: "body" };
	const mystyle = {
		width: 800,
		height: 780,
		left: 400,
		top: 5,
		title: "공시 발표",
		icon: "./img/icon/internet.svg",
		bgcolor: "#f5f5f5",
	};
	const styles = Object.assign(app_styles, mystyle);

	const SetCurrentNews = () => {
		const userstock = JSON.parse(localStorage.getItem("user"));
		const validStock = userstock.filter((item) => item.amount > 0 && item.name !== "cash");
		const validCorpname = validStock.map((item) => item.name);
		console.log(validCorpname);
		let Newsarray = [];
		for (let corp of validCorpname) {
			const validNewses = Newsmaster.filter((x) => x.corp === corp);
			const picked = validNewses[Math.floor(Math.random() * validNewses.length)];
			Newsarray.push(picked);
		}
		localStorage.setItem("news", JSON.stringify(Newsarray));
		const check = JSON.parse(localStorage.getItem("news"));
		console.log(check);
		return check;
	};
	let dailyNews = [...SetCurrentNews()];
	afterUpdate(() => (dailyNews = [...SetCurrentNews()]));
</script>

{#if !newsopen}
	<div class="container">
		<div
			class="newscomes soft_blink"
			on:click={() => {
				check_done();
				newsopen = !newsopen;
				console.log(newsopen);
			}}
		/>
	</div>
{:else}
	<Window {styles}>
		<div class="dart">
			<div class="header relative border-4 border-black border-inset">
				<img class="absolute left-4 h-5/6" src="./img/icon/dart.svg" alt="./img/icon/alt.png" />
			</div>
			<div
				class="content overflow-hidden box-border border-4 border-black border-inset rounded"
				on:load={(e) => console.log(e.target.offsetWidth)}
			>
				<Carousel count={dailyNews.length} width={763} bind:moveSlide show_control={false}>
					{#each dailyNews as news, i}
						<div
							class="relative w-1/2 bg-white text-gray flex flex-col gap-8 p-8 pr-12"
							on:dblclick={() => moveSlide(-1)}
						>
							<p class="text-center" style="font-size:{40}px">㈜{news[news_key.symbol]}</p>
							<p class="text-center" style="font-size:{30}px">{news[news_key.title]}</p>
							<p style="font-size:{20}px">
								{@html news[news_key.content].replace(/-/g, "<br />&nbsp;-")}
							</p>
							<!-- <svg class="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="none">
									<foreignObject width="500" height="500">
										<p class="text-center" style="font-size:{40}px">㈜{news[news_key.symbol]}</p>
										<p class="text-center" style="font-size:{30}px">{news[news_key.title]}</p>
										<p style="font-size:{20}px">
											{@html news[news_key.content].replace(/-/g, "<br />&nbsp;-")}
										</p>
									</foreignObject>
								</svg> -->
							<div
								class="absolute right-28 bottom-8 w-[100px] {i == 0
									? 'opacity-50'
									: 'transition duration-300 hover:opacity-50'}"
							>
								<img
									class="  rotate-90"
									src="./img/icon/downward-nobg.png"
									alt="next"
									on:click={i === 0 ? null : () => moveSlide(1)}
								/>
							</div>
							<div
								class="absolute right-8 bottom-8 w-[100px] {i == dailyNews.length - 1
									? 'opacity-50'
									: 'transition duration-300 hover:opacity-50 '}"
							>
								<img
									class=" -rotate-90"
									src="./img/icon/downward-nobg.png"
									alt="next"
									on:click={i === dailyNews.length - 1 ? null : () => moveSlide(-1)}
								/>
							</div>
						</div>
					{/each}
				</Carousel>
			</div>
		</div>
	</Window>
{/if}

<style>
	* {
		color: black;
	}
	.dart {
		width: 100%;
		height: 100%;
		padding: 10px;
		gap: 10px;
		box-sizing: border-box;
		display: grid;

		grid-template-rows: 0.5fr 2fr;
	}

	.header {
		width: 100%;
		height: 0.5fr;
		box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
		background-color: #1975db;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.content {
		overflow: hidden;
		box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
	}
	.newscomes {
		background: url(./img/newspaper.svg) no-repeat;
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
