<script>
	import { onDestroy } from "svelte";
	import Table from "../lib/Table.svelte";
	import Portfolio from "../lib/Portfolio.svelte";
	import Corpmaster from "../data/Corpmaster";

	export let done;

	let round = 0;
	let themes = JSON.parse(localStorage.getItem("theme"));
	let user = JSON.parse(localStorage.getItem("user"));
	let cash = JSON.parse(localStorage.getItem("cash"));
	let history = JSON.parse(localStorage.getItem("history"));
	let validthemes = themes.filter((x) => x.checked);
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
			};
		});
	validthemes = validthemes.map((x) => {
		return {
			id: x.id,
			theme: x.theme,
			corp: [
				...Corpmaster.filter((y) => y.theme === x.theme).map((z) => {
					return { id: z.id, name: z.name, outline: z.outline };
				}),
			],
		};
	});

	const recodeHistory = () => {
		const tmp = [...history];
		const temp = tmp[round];
		const validname = validstocks.map((x) => x.name);
		console.log(validname);
		for (let i of validname) {
			const currentAmount = validstocks.filter((x) => x.name === i)[0].amount;
			temp.filter((x) => x.name === i)[0].amount *= 0;
			temp.filter((x) => x.name === i)[0].amount += currentAmount;
			console.log(temp);
		}
		console.log(tmp);
		localStorage.setItem("history", JSON.stringify(tmp));
	};

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

	recodeHistory();
	const temp = [...JSON.parse(localStorage.getItem("history"))];
	const arr = temp[0].map((x) => {
		return { name: x.name, data: [], amount: [] };
	});
	for (let i of temp) {
		for (let j of arr) {
			j.data.push(Math.floor(i.filter((x) => x.name === j.name).map((x) => x.price)[0]));
			j.amount.push(i.filter((x) => x.name === j.name).map((x) => x.amount)[0]);
		}
	}
	const newSeries = arr
		.filter((x) => x.amount.reduce((accumulator, current) => accumulator + current, 0) !== 0)
		.map((x) => {
			return { name: x.name, data: x.data };
		});

	onDestroy(() => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("cash", JSON.stringify(cash));
		localStorage.setItem("history", JSON.stringify(history));
	});
</script>

<div class="transaction" on:click={() => (done = true)}>
	<Portfolio data={validstocks.filter((x) => x.amount > 0)} title="Your Stock" {cash} bind:func={sellUserStock} />
	<div class="icon">
		<img src="./img/icon/transaction_icon.png" alt="" />
	</div>
	<Table data={validstocks} title="Market" bind:func={buyUserStock} />
</div>

<style>
	div.transaction {
		position: relative;
		width: 100%;
		height: 95%;

		display: grid;
		grid-template-rows: 3fr;
		grid-template-columns: 3fr 0.01fr 2fr;
		justify-content: center;

		padding: 20px;
		box-sizing: border-box;
		background: "transparent";
	}

	.icon {
		position: relative;
		width: calc(var(--size) * 0.04px);
		height: calc(var(--size) * 0.08px);
		top: 50%;
		margin-top: -100%;
		animation: blink 3s ease-in-out infinite;
	}
	.icon img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
