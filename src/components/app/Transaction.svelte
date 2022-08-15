<script lang="js">
	// @ts-nocheck

	import { afterUpdate, onDestroy } from "svelte";
	import { fade } from "svelte/transition";
	import LilStock from "../lib/LilStock.svelte";
	import RangeBar from "../lib/RangeBar.svelte";
	export let check_done;
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const validstock = user.filter((x) => x.amount > 0 && x.name !== "cash");
	let transaction = validstock.map((x) => {
		return { id: x.id, name: x.name, price: x.price, amount: 0 };
	});
	let max;
	afterUpdate(() => {
		let checked = document.querySelectorAll(".check input");
		let checked_count = [...checked].filter((x) => x.checked).length;
		if (checked_count === checked.length) {
			check_done();
		}
	});
	onDestroy(() => {
		transaction.forEach((x) => {
			user.find((y) => y.name === x.name).amount += Number(x.amount);
		});
		console.log("before: ");
		console.log(history);
		history.pop();
		history.push(user);
		console.log("after: ");
		console.log(history);
		localStorage.setItem("user", JSON.stringify(user));
		console.log("user: ");
		console.log(user);
		localStorage.setItem("history", JSON.stringify(history));
	});
</script>

<div class="transaction" transition:fade>
	{#each validstock as stock}
		<div class="flexrow">
			<LilStock {...stock} />
			<RangeBar {...stock} bind:transaction bind:max />
		</div>
	{/each}
</div>

<style lang="scss">
	.transaction {
		position: absolute;
		width: 60%;
		height: 85%;
		top: 10px;
		right: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px;
		padding: 10px;
		gap: 30px;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.flexrow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}

	.transaction::-webkit-scrollbar {
		width: 10px;
	}
	.transaction::-webkit-scrollbar-thumb {
		background-color: #2f3542;
		border-radius: 10px;
	}
	.transaction::-webkit-scrollbar-track {
		background-color: grey;
		border-radius: 10px;
	}
</style>
