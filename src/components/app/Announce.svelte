<script>
	// @ts-nocheck
	import { image, background as bg } from "../data/GlovalVariable.js";
	import { afterUpdate } from "svelte/internal";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import { style } from "../data/appstyle.js";
	import { width as wd } from "../data/stores.js";
	export let check_done;
	export let instant_show = false;

	let before = "announce_";
	let moveSlide;
	let announce = [];
	const newsopen = () => {
		const news = JSON.parse(localStorage.getItem("news"));
		announce = news.announce;
		check_done();
		instant_show = true;
	};
	const news_key = { symbol: "corp", title: "title", content: "body" };
	const styles = {
		width: $wd * 0.5,
		height: $wd * 0.47,
		left: $wd * 0.22,
		top: $wd * 0.002,
		title: "공시 발표",
		icon: image.internet,
		bgcolor: "#f5f5f5",
	};

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
			<div class="header relative" style:border="0.3rem inset #000">
				<img
					class="absolute h-5/6"
					style:left="1rem"
					src={image.krx}
					alt={image.alt}
				/>
			</div>
			<div
				class="content overflow-hidden box-border rounded"
				style:border="0.3rem inset #000"
				on:load={(e) => console.log(e.target.offsetWidth)}
			>
				<Carousel
					{before}
					bind:count={announce.length}
					width={$wd * 0.475}
					bind:moveSlide
					show_control={false}
				>
					{#each announce as news, i}
						<div
							class="relative w-full bg-white text-gray flex flex-col"
							style:box-sizing="border-box"
							style:gap="2rem"
							style:padding="1.5rem"
							on:dblclick={() => moveSlide(-1)}
						>
							<p class="larger text-center">
								㈜{news[news_key.symbol]}
							</p>
							<p class="medium text-center">
								{news[news_key.title]}
							</p>
							<p class="small">
								{@html line_feed(news[news_key.content])}
							</p>
							<div
								class="absolute w-[7rem] {i == 0
									? 'opacity-50'
									: 'transition duration-300 hover:opacity-50'}"
								style:left="1.5rem"
								style:top="1.5rem"
							>
								<img
									class="  rotate-90"
									src={image.down_arrow}
									alt="next"
									on:click={i === 0 ? null : () => moveSlide(1)}
								/>
							</div>
							<div
								class="absolute w-[7rem] {i == announce.length - 1
									? 'opacity-50'
									: 'transition duration-300 hover:opacity-50 '}"
								style:right="1.5rem"
								style:top="1.5rem"
							>
								<img
									class=" -rotate-90"
									src={image.down_arrow}
									alt="next"
									on:click={i === announce.length - 1
										? null
										: () => moveSlide(-1)}
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
		padding: 0.8rem;
		gap: 0.8rem;
		box-sizing: border-box;
		display: grid;

		grid-template-rows: 0.5fr 2fr;
	}

	.header {
		width: 100%;
		height: 0.5fr;
		box-shadow: var(--shallow-shadow);
		background-color: #1975db;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.content {
		overflow: hidden;
		box-shadow: var(--shallow-shadow);
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
