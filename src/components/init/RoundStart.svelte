<script>
	import { onMount } from "svelte";
	import Result from "../lib/Result.svelte";
	export let done;
	// import InitDialog from "../data/InitDialog.js";
	// import Typer from "../lib/Typer.svelte";
	// let diagOpen = true;
	// let diag = [...InitDialog["roundstart"]];
	// console.log(diag);
	let validstocks;
	const arrow = (x) => (x > 1.1 ? "↗" : x < 0.9 ? "↘" : "➝");
	const history = JSON.parse(localStorage.getItem("history"));
	let user = JSON.parse(localStorage.getItem("user"));
	const dailyNews = JSON.parse(localStorage.getItem("news"));
	validstocks = user
		.filter((x) => x.amount > 0)
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
	let newsopen = false;

	const recodeHistory = () => {
		const tmp = [...history];
		const current = [...user];
		console.log(current);
		tmp.push(current);
		console.log(tmp);
		localStorage.setItem("history", JSON.stringify(tmp));
	};

	for (let i of dailyNews) {
		const tmp = [...user];
		const infl = i.infl.split("-");
		console.log(infl);
		tmp.map((x) => {
			if (infl.includes(x.name)) {
				x.price = Math.round(x.price * (100 + i.fluct)) / 100;
				x.fluct = 1 + i.fluct * 0.01;
			}
		});
		console.log(tmp);
		localStorage.setItem("user", JSON.stringify(tmp));
	}

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
	onMount(() => {
		user = JSON.parse(localStorage.getItem("user"));
		validstocks = user
			.filter((x) => x.amount > 0)
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
	});
</script>

<div class="resultpage" on:click={() => (done = true)}>
	<Result data={validstocks} title="Your Stock" />
	<!-- {#if diagOpen}
		<Typer bind:dialog={diag} bind:isopen={diagOpen} />
	{/if} -->
</div>

<style>
	div.resultpage {
		position: relative;
		width: 90%;
		height: 80%;
		left: 5%;
		top: 5%;

		box-sizing: border-box;
		background: "transparent";
	}
</style>
