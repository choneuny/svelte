<script>
	import { onMount } from "svelte";
	import { background as bg } from "../data/GlovalVariable.js";
	import { transaction, next_round } from "../data/stores.js";
	export let increasecount;
	let news, user, history;
	const reflect = () => {
		const infl = news.reduce(function (total, current) {
			const infl_list = current.infl.split("-");
			infl_list.forEach((x) => total.push({ infl: x, fluct: current.fluct }));
			return total;
		}, []);
		user.forEach((x) => (x.fluct = 1));
		infl.forEach((x) => (user.find((y) => y.name === x.infl).fluct += x.fluct * 0.01));
		user.forEach((x) => (x.price = x.price * x.fluct));
	};

	onMount(() => {
		news = JSON.parse(localStorage.getItem("news"));
		user = JSON.parse(localStorage.getItem("user"));
		history = JSON.parse(localStorage.getItem("history"));
		console.log("before: ", history);
		console.log("transaction :", $transaction);
		$transaction.forEach((x) => {
			user.find((y) => y.name === x.name).amount += Number(x.amount);
			user.find((y) => y.name === "cash").amount -= Number(x.amount) * Number(x.price);
		});

		reflect();
		history.push(user);
		console.log("user is ", user);
		console.log("history is ", history);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("history", JSON.stringify(history));
	});

	setTimeout(() => {
		increasecount();
		next_round();
	}, 2000);
</script>

<div style={bg.roundclear} />

<style>
	div {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
</style>
