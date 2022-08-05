<script>
	import News from "./lib/News.svelte";
	const explain_key = { symbol: "", title: "title", content: "why" };
	const dailyNews = JSON.parse(localStorage.getItem("news"));
	console.log(dailyNews);
</script>

<div class="shownews">
	{#each dailyNews as news}
		<News {news} content_key={explain_key} />
	{/each}
</div>

<style>
	.shownews {
		position: fixed;
		left: calc(var(--size) * 0.07px);
		top: calc(var(--size) * 0.02px);
		width: calc(var(--size) * 0.65px);
		height: calc(var(--size) * 0.38px);
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1%;
		padding: 0 1%;
		box-sizing: border-box;
		z-index: 998;
		backdrop-filter: blur(3px);
	}
</style>
