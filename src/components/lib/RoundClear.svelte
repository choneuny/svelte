<script>
	import { onDestroy } from "svelte";
	import { next_round } from "../data/stores.js";
	export let increasecount;

	const news = JSON.parse(localStorage.getItem("news"));
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const reflect = () => {
		const infl = news.reduce(function (total, current) {
			const infl_list = current.infl.split("-");
			infl_list.forEach((x) => total.push({ infl: x, fluct: current.fluct }));
			return total;
		}, []);
		console.log(infl);
		user.forEach((x) => (x.fluct = 1));
		infl.forEach((x) => (user.find((y) => y.name === x.infl).fluct += x.fluct * 0.01));
		user.forEach((x) => (x.price = x.price * x.fluct));
		console.log(user);
	};

	setTimeout(() => {
		increasecount();
		next_round();
	}, 1000);

	onDestroy(() => {
		reflect();
		history.push(user);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("history", JSON.stringify(history));
	});
</script>

<img src="./img/background/Sunset.gif" alt="RoundClear" />

<style>
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
</style>
