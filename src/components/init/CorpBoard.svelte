<script>
	import { onDestroy } from "svelte";
	import { round, stock_store } from "../data/stores";
	import Portfolio from "../lib/Portfolio.svelte";
	import ThemeCorp from "../lib/ThemeCorp.svelte";
	import Corpmaster from "../data/Corpmaster";
	export let done = false;
	let user = JSON.parse(localStorage.getItem("user"));
	let portfolio;
	let market;

	// stock_store.subscribe((x) => (user = x));
	// stock_store.subscribe((x) => ({
	// 	market = {
	// 		id: x.id,
	// 		theme: x.theme.toUpperCase(),
	// 		name: x.name,
	// 		amount: x.amount,
	// 		price: x.price,
	// 		fluct: arrow(x.fluct),
	// 		corp: [
	// 			...Corpmaster.filter((y) => y.theme === x.theme).map((z) => {
	// 				return { id: z.id, name: z.name, outline: z.outline };
	// 			})]
	// 		}
	// 	}));
	let themes = JSON.parse(localStorage.getItem("theme"));
	let cash = JSON.parse(localStorage.getItem("cash"));
	console.log(cash);
	let validthemes = themes.filter((x) => x.checked && !x.fixed);
	const arrow = (x) => (x > 1.1 ? "↗" : x < 0.9 ? "↘" : "➝");
	let validstocks = user
		.filter((x) => validthemes.map((y) => y.theme).includes(x.theme))
		.map((x) => {
			return {
				id: x.id,
				theme: x.theme.toUpperCase(),
				name: x.name,
				amount: x.amount,
				price: x.price,
				fluct: arrow(x.fluct),
				corp: [
					...Corpmaster.filter((y) => y.theme === x.theme).map((z) => {
						return { id: z.id, name: z.name, outline: z.outline };
					}),
				],
			};
		});

	onDestroy(() => {
		const tmp = [...themes];
		for (let i of tmp) {
			i.fixed = i.checked;
		}
		localStorage.setItem("theme", JSON.stringify(tmp));
	});
	const doneCheck = () => {
		if ($round > 0 || user.map((x) => x.amount).reduce((acc, curr) => acc + curr) === 10) {
			localStorage.setItem("cash", JSON.stringify(cash));
			localStorage.setItem("user", JSON.stringify(user));
			done = true;
		} else {
			done = false;
		}
	};
	console.log(user);
	let sellUserStock = (event) => {
		const stockid = event.target.id === "" ? event.target.parentNode.id : event.target.id;
		const tmp = [...user];
		if (tmp[stockid].amount > 0) {
			cash.amount += tmp[stockid].price;
			tmp[stockid].amount--;
			user = tmp;
		} else {
			alert("You haven't any stock to Sell!");
		}
		validstocks = user
			.filter((x) => validthemes.map((y) => y.theme).includes(x.theme))
			.map((x) => {
				return {
					id: x.id,
					theme: x.theme.toUpperCase(),
					name: x.name,
					amount: x.amount,
					price: x.price,
					fluct: arrow(x.fluct),
				};
			});
		console.log(tmp[stockid]);
	};
	let buyUserStock = (event) => {
		const stockid = event.target.id === "" ? event.target.parentNode.id : event.target.id;
		const tmp = [...user];
		if (cash.amount >= tmp[stockid].price) {
			cash.amount -= tmp[stockid].price;
			tmp[stockid].amount++;
			user = tmp;
		} else {
			alert("You haven't enough cash to Buy!");
		}
		validstocks = user
			.filter((x) => validthemes.map((y) => y.theme).includes(x.theme))
			.map((x) => {
				return {
					id: x.id,
					theme: x.theme.toUpperCase(),
					name: x.name,
					amount: x.amount,
					price: x.price,
					fluct: arrow(x.fluct),
				};
			});
		console.log(tmp[stockid]);
	};
</script>

<div class="corpboard" on:click={() => doneCheck()}>
	<Portfolio title="Your Stock" data={user.filter((x) => x.amount > 0)} {cash} bind:func={sellUserStock} />
	<ThemeCorp data={validstocks} title="theme" col="corp" bind:func={buyUserStock} />
</div>

<style>
	div.corpboard {
		position: relative;
		width: 100%;
		height: 95%;

		display: grid;
		grid-template-rows: 3fr;
		grid-template-columns: 1fr 2fr;
		justify-content: center;

		padding: 20px;
		box-sizing: border-box;
		background: "transparent";
	}
</style>
