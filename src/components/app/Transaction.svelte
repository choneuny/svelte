<script>
	import { onDestroy } from "svelte";
	import LilStock from "../lib/LilStock.svelte";
	import RangeBar from "../lib/RangeBar.svelte";
	const cash = JSON.parse(localStorage.getItem("cash"));
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const validstock = user.filter((x) => x.amount > 0 && x.name !== "cash");
	const transaction = validstock.map((x) => {
		return { name: x.name, transaction: 0 };
	});
	console.log(transaction);
	let set_value = (e) => {
		const target = e.target;
		target.parentNode.style.setProperty("--value", target.value);
		target.parentNode.style.setProperty("--text-value", JSON.stringify(target.value));
		console.log(target.value);
		transaction[target.id].transaction = Number(target.value);
		console.log(transaction);
	};
	// caution
	user.push(cash);
	onDestroy(() => {
		transaction.forEach((x) => {
			user.find((y) => y.name === x.name).amount += x.transaction;
		});
		history.pop();
		history.push(user);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("history", JSON.stringify(history));
	});
</script>

<div class="transaction">
	{#each validstock as stock, i}
		<div class="flexrow">
			<LilStock {...stock} />
			<RangeBar bind:set_value index={i.toString()} />
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
</style>
