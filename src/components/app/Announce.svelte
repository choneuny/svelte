<script>
	// @ts-nocheck

	import { onMount, afterUpdate } from "svelte/internal";
	import Window from "../lib/Window.svelte";
	import Carousel from "../lib/Carousel.svelte";
	import SetCurrentNews from "../lib/SetCurrentNews.js";
	export let check_done;
	const user = JSON.parse(localStorage.getItem("user"));
	console.log(user);
	let dailyNews;
	afterUpdate(() => (dailyNews = [...SetCurrentNews()]));
	let newsopen = false;
	const pkg = {
		icon: "./img/icon/internet.svg",
		title: "인터넷",
		left: 0,
		top: 0,
	};
	// afterUpdate(() => console.log(document.querySelector(".content").offsetWidth));
	const news_key = { symbol: "corp", title: "title", content: "body" };
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
	<div class="container">
		<Window {...pkg}>
			<div class="dart">
				<div class="header">
					<img src="./img/icon/dart.png" alt="./img/icon/alt.png" />
				</div>
				<div class="content" on:load={(e) => console.log(e.target.offsetWidth)}>
					<Carousel count={2} width={768}>
						{#each dailyNews as news, i}
							<div class="w-1/2 bg-white text-gray flex flex-col gap-8 p-8 box-border">
								<p class="font-bold text-2xl text-center antialiased">㈜{news[news_key.symbol]}</p>
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
		position: relative;
		width: 800px;
		height: 770px;
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
