<script>
	// @ts-nocheck

	import { onMount, afterUpdate } from "svelte/internal";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import SetCurrentNews from "../lib/SetCurrentNews.js";
	const user = JSON.parse(localStorage.getItem("user"));
	console.log(user);
	let dailyNews = [...SetCurrentNews()];
	const pkg = {
		icon: "./img/icon/internet.svg",
		title: "인터넷",
		left: 0,
		top: 0,
	};
	const explain_key = { symbol: "corp", title: "title", content: "why" };
</script>

<div class="explain">
	<Window {...pkg}>
		<div class="dart">
			<div class="header">
				<img src="./img/icon/dart.png" alt="./img/icon/alt.png" />
			</div>
			<div class="content">
				<Carousel count={2} width={670}>
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
</div>

<style>
	* {
		color: black;
	}
	.explain {
		position: absolute;
		width: 47%;
		height: 90%;
		right: 0;
		margin: 1%;
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
