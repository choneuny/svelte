<script>
	// @ts-nocheck
	// definitions
	import { image } from "../data/GlovalVariable.js";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import app_styles from "../lib/__AppStyles";
	export let check_done;
	const dailyNews = JSON.parse(localStorage.getItem("news"));
	const explain_key = { symbol: "corp", title: "title", content: "why" };
	const mystyle = {
		width: 800,
		height: 780,
		left: 700,
		top: 20,
		title: "인터넷",
		icon: image.internet,
		bgcolor: "#b2b2b2",
	};
	const styles = Object.assign(app_styles, mystyle);

	// run on mount
	check_done();
	console.log(dailyNews[0][explain_key.symbol]);
</script>

<Window {styles}>
	<div class="dart">
		<div class="header">
			<img src={image.dart} alt={image.alt} />
		</div>
		<div class="content">
			<Carousel count={dailyNews.length} width={750}>
				{#each dailyNews as news, i}
					<div class="w-1/2 bg-white text-gray flex flex-col gap-8 p-8 box-border">
						<p class="font-bold text-2xl text-center antialiased">
							㈜{news[explain_key.symbol]} 공시 발표 직후 주가 변동 해설
						</p>
						<p class="font-bold text-xl antialiased">
							{@html news[explain_key.content].replace(/-/g, "<br />&nbsp;&nbsp;-")}
						</p>
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
</style>
