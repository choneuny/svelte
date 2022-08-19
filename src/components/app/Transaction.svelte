<script lang="js">
	// @ts-nocheck
	import { round, record_transaction } from "../data/stores.js";
	import { afterUpdate, onDestroy } from "svelte";
	import { fade } from "svelte/transition";
	import LilStock from "../lib/LilStock.svelte";
	import RangeBar from "../lib/RangeBar.svelte";
	export let check_done;
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const cash = user.find((x) => x.name === "cash").amount;
	let budget = cash * 1.0;

	const validstock = user.filter((x) => x.amount > 0 && x.name !== "cash");
	let transaction = validstock.map((x) => {
		return { id: x.id, name: x.name, price: x.price, amount: 0, round: $round };
	});
	afterUpdate(() => {
		console.log("parent update");
		let checked = document.querySelectorAll(".check input");
		let checked_count = [...checked].filter((x) => x.checked).length;
		let done = checked_count === checked.length;
		budget =
			cash * 1.0 -
			transaction.reduce((arr, cur) => arr + cur.amount * cur.price, 0);

		if (done) {
			check_done();
			record_transaction(transaction);
			console.log("transaction is ", transaction);
			console.log("history is ", history);
			console.log("user is ", user);
		} else {
			check_done(false);
		}
	});

	$: console.log("budget : ", budget);
</script>

<div class="transaction" transition:fade>
	{#each validstock as stock}
		<div class="flexrow">
			<LilStock {...stock} />
			<RangeBar {...stock} bind:transaction bind:budget />
		</div>
	{/each}
</div>

<style lang="scss">
	.transaction {
		position: absolute;
		width: 70%;
		height: 90%;
		right: 4rem;
		top: 0.8rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2.5rem 1.5rem;
		gap: 2.5rem;
		overflow-y: auto;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		box-sizing: border-box;
		mask-image: linear-gradient(
			to top,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 1) 6%,
			rgba(0, 0, 0, 1) 94%,
			rgba(0, 0, 0, 0) 100%
		);
		-webkit-mask-image: linear-gradient(
			to top,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 1) 6%,
			rgba(0, 0, 0, 1) 94%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.flexrow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 2.5rem;
	}

	.transaction::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
</style>
