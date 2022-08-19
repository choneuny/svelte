<script>
	// @ts-nocheck
	// definitions
	import { image } from "../data/GlovalVariable.js";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import { width as wd } from "../data/stores.js";
	export let check_done;
	const explain_key = { symbol: "corp", title: "title", content: "why" };
	const styles = {
		width: $wd * 0.475,
		height: $wd * 0.465,
		left: $wd * 0.4,
		top: $wd * 0.01,
		title: "인터넷",
		icon: image.internet,
		bgcolor: "#b2b2b2",
	};

	// run on mount
	const news = JSON.parse(localStorage.getItem("news"));
	const announce = news.announce;
	let moveSlide;
	console.log(news);
	console.log(announce);
	check_done();
</script>

<Window {styles}>
	<div class="dart">
		<div class="header" style:height="100%">
			<img class="h-5/6" src={image.teacher} alt={image.alt} />
			<p class="larger">주가 변동 해설</p>
		</div>
		<div class="content">
			<Carousel
				bind:count={announce.length}
				width={$wd * 0.462}
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
						<div
							class="w-full bg-white text-gray flex flex-col gap-[2rem] box-border"
						>
							<p class="font-bold medium text-center antialiased">
								㈜{news[explain_key.symbol]} 공시 발표 직후 주가 변동 해설
							</p>
							<p
								class="font-normal small antialiased"
								style:word-break="keep-all"
							>
								{news[explain_key.content]}
							</p>
						</div>

						<div
							class="absolute w-[7rem] {i == 0
								? 'opacity-50'
								: 'transition duration-300 hover:opacity-50'}"
							style:left="1.5rem"
							style:bottom="1.5rem"
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
							style:bottom="1.5rem"
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

<style>
	* {
		color: black;
	}
	.dart {
		width: 100%;
		height: 100%;
		padding: 0.5rem;
		gap: 0.5rem;
		box-sizing: border-box;
		display: grid;

		grid-template-rows: 20% 80%;
	}
	.header {
		width: 100%;
		height: 100%;
		border: 1px solid transparent;
		border-radius: 1rem;
		box-shadow: var(--shallow-shadow);
		background-color: #1975db;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2rem;
		padding: 0 1rem;
	}
	.content {
		overflow: hidden;
		border: 1px solid transparent;
		border-radius: 1rem;
		box-shadow: var(--shallow-shadow);
	}
</style>
