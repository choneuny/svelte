<script>
	// @ts-nocheck
	import { image, background as bg } from "../data/GlobalVariable.js";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import { width as wd } from "../data/stores.js";
	export let check_done;
	const news_list = JSON.parse(localStorage.getItem("news")).news;
	const styles = {
		width: $wd * 0.5,
		height: $wd * 0.47,
		left: $wd * 0.22,
		top: $wd * 0.002,
		title: "인터넷",
		icon: image.internet,
		bgcolor: "#b2b2b2",
	};
	const news_key = { symbol: "", title: "title", content: "body" };
	let newsopen = false;
	let moveSlide;
	const random = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min)
			.toString()
			.padStart(2, "0");

	console.log(news_list);
	let before = "news_";
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
				<Carousel {before} bind:count={news_list.length} width={$wd * 0.5} bind:moveSlide show_control={false}>
					{#each news_list as news, i}
						<!--CAROUSEL ITEM-->
						<div
							class="relative w-full bg-white text-gray flex flex-row justify-center items-center gap-[1rem] px-[1rem]"
							on:dblclick={() => moveSlide(-1)}
						>
							<!--CONTROLER-->
							<div class="w-[6rem] h-full relative">
								<!--PAGE GUIDE-->
								<p class="absolute top-[0.5rem] text-[#999999]">
									{i + 1} / {news_list.length}
								</p>
								<img
									class="absolute bottom-[2rem] rotate-90  
										{i == 0 ? 'opacity-50' : 'transition duration-300 hover:opacity-50'}"
									src={image.down_arrow}
									alt={image.alt}
									on:click={i === 0 ? null : () => moveSlide(1)}
								/>
							</div>
							<!--ADDITIONAL FRAME-->
							<div class="w-3/4 h-full flex flex-col overflow-auto gap-[1rem]">
								<!--NEWS IMAGE-->
								<div class="w-full h-1/4 bg-[#bcbcbc] flex flex-row items-center justify-center gap-[3rem]">
									<img class="h-full" src={image[news.theme]} alt="err" />
									<p class="large">{news.theme}</p>
								</div>
								<!--NEWS BODY-->
								<p class="text-center medium">
									{news[news_key.title]}
								</p>
								<p class="text-[#999999] small" style="font-family:roboto;">
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
									class="absolute bottom-[2rem] -rotate-90
										{i == news.length - 1 ? 'opacity-50' : 'transition duration-300 hover:opacity-50 '}"
									src={image.down_arrow}
									alt={image.alt}
									on:click={i === news.length - 1 ? null : () => moveSlide(-1)}
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
		gap: 0.5rem;
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
