<script>
	import { onDestroy } from "svelte";
	import LilStock from "../lib/LilStock.svelte";
	import RangeBar from "../lib/RangeBar.svelte";
	const arr = new Array(2).fill(0);
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const validstock = user.filter((x) => x.amount > 0);

	onDestroy(() => {
		history.pop();
		history.push(user);
	});
</script>

<div class="wrapper">
	{#each validstock as stock, i}
		<div class="flexrow">
			<LilStock {...stock} />
			<RangeBar index={i.toString()} />
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		width: 55%;
		height: 70%;
		right: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 50px;
		gap: 60px;
	}

	.flexrow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}
</style>
