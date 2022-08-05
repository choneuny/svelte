<script>
	import Newsmaster from "../data/Newsmaster";
	import News from "../lib/News.svelte";
	export let done;
	const theme = JSON.parse(localStorage.getItem("theme"));
	const user = JSON.parse(localStorage.getItem("user"));
	const unchosen = theme.filter((x) => x.checked === false).map((x) => x.theme);
	const themeNews = Newsmaster.filter((x) => x.corp == "");
	let Newsarray = [];
	for (let themes of unchosen) {
		const validNewses = themeNews.filter((x) => x.theme === themes);
		const picked = validNewses[Math.floor(Math.random() * validNewses.length)];
		Newsarray.push(picked);
	}
	localStorage.setItem("news", JSON.stringify(Newsarray));
	console.log(Newsarray);
	for (let i of Newsarray) {
		const tmp = [...user];
		const infl = i.infl.split("-");
		console.log(infl);
		tmp.map((x) => {
			if (infl.includes(x.name)) {
				x.price *= 1 + i.fluct * 0.01;
				x.fluct = 1 + i.fluct * 0.01;
			}
		});
		console.log(tmp);
		localStorage.setItem("user", JSON.stringify(tmp));
	}
	const check = JSON.parse(localStorage.getItem("news"));

	let newsopen = false;
	const news_key = { symbol: "", title: "title", content: "body" };
</script>

<div
	class="newscomes"
	on:click={() => {
		newsopen = !newsopen;
		done = true;
	}}
/>
<div class="shownews {newsopen ? 'popup' : 'popin'}" on:click={() => (newsopen = !newsopen)}>
	{#each check as news}
		<News {news} content_key={news_key} />
	{/each}
</div>

<style>
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

	.shownews {
		position: absolute;
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
