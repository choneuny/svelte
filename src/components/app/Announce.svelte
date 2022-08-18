<script>
	// @ts-nocheck
	import { image, background as bg } from "../data/GlovalVariable.js";
	import { afterUpdate } from "svelte/internal";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import app_styles from "../lib/__AppStyles.js";
	export let check_done;
	export let instant_show = false;

	let moveSlide;
	let announce = [];
	const newsopen = () => {
		const news = JSON.parse(localStorage.getItem("news"));
		announce = news.announce;
		check_done();
		instant_show = true;
	};
	const news_key = { symbol: "corp", title: "title", content: "body" };
	const mystyle = {
		width: 800,
		height: 780,
		left: 400,
		top: 5,
		title: "공시 발표",
		icon: image.internet,
		bgcolor: "#f5f5f5",
	};
	const styles = Object.assign(app_styles, mystyle);

	const line_feed = (x) => {
		const find = new RegExp("-\\s", "g");
		return x.replace(find, "<br />&nbsp;-&nbsp;");
	};
	if (instant_show) {
		newsopen();
	}
</script>

{#if !instant_show}
	<div class="container">
		<div class="newscomes soft_blink" style={bg.announce} on:click={newsopen} />
	</div>
{:else if instant_show}
	<Window {styles}>
		<div class="dart">
			<div class="header relative border-4 border-black border-inset">
				<img class="absolute left-4 h-5/6" src={image.dart} alt={image.alt} />
			</div>
			<div
				class="content overflow-hidden box-border border-4 border-black border-inset rounded"
				on:load={(e) => console.log(e.target.offsetWidth)}
			>
				<Carousel bind:count={announce.length} width={763} bind:moveSlide show_control={false}>
					{#each announce as news, i}
						<div
							class="relative w-full bg-white text-gray flex flex-col gap-8 p-8 pr-12"
							on:dblclick={() => moveSlide(-1)}
						>
							<p class="text-center" style="font-size:{40}px">㈜{news[news_key.symbol]}</p>
							<p class="text-center" style="font-size:{30}px">{news[news_key.title]}</p>
							<p style="font-size:{20}px">
								{@html line_feed(news[news_key.content])}
							</p>
							<div
								class="absolute right-28 bottom-8 w-[100px] {i == 0
									? 'opacity-50'
									: 'transition duration-300 hover:opacity-50'}"
							>
								<img
									class="  rotate-90"
									src={image.down_arrow}
									alt="next"
									on:click={i === 0 ? null : () => moveSlide(1)}
								/>
							</div>
							<div
								class="absolute right-8 bottom-8 w-[100px] {i == announce.length - 1
									? 'opacity-50'
									: 'transition duration-300 hover:opacity-50 '}"
							>
								<img
									class=" -rotate-90"
									src={image.down_arrow}
									alt="next"
									on:click={i === announce.length - 1 ? null : () => moveSlide(-1)}
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
