<script>
	// @ts-nocheck
	import { width as wd } from "../data/stores";
	import { afterUpdate } from "svelte/internal";
	import "../../assets/css/range.scss";
	export let id, amount, price; // from user
	export let transaction;
	export let budget;
	const size = $wd * 0.325;
	const this_stock = transaction.find((x) => x.id == id);
	let range;
	let range_value = 0;
	let max = Math.floor(budget / price);
	let current = amount * 1.0;
	afterUpdate(() => {
		console.log("child update");
		range = document.getElementById(JSON.stringify(id));
	});
	$: {
		if (range?.value) {
			range_value = Number(range.value);
			console.log(
				"outside",
				"id:",
				range.id,
				"value:",
				range_value,
				"max:",
				max,
				" budget:",
				budget,
				" price:",
				price
			);
			if (!range.disabled) {
				max = Math.floor(budget / price);
				range.value > max ? (range.value = max) : null;
				range_value = Number(range.value);
				console.log(
					"inside",
					"id:",
					range.id,
					"value:",
					range_value,
					"max:",
					max,
					" budget:",
					budget,
					" price:",
					price,
					"current is",
					current
				);

				range.parentNode.style.setProperty("--value", range.value);
				range.parentNode.style.setProperty(
					"--text-value",
					JSON.stringify(range.value)
				);
				current = range_value + amount;
			}
		}
	}
</script>

<div class="transaction overflow-hidden" style="--size:{size}px">
	<div
		class="range"
		style="--min:{-1 * amount}; --max:{max}"
		data-ticks-position="top"
	>
		<input
			{id}
			type="range"
			min={amount * -1}
			{max}
			step="1"
			value="0"
			class=" disabled:brightness-50"
			on:input={(e) => (range = e.target)}
		/>
		<output />
		<div class="range__progress" />
	</div>
	<div>
		<p class="font-bold">최종 보유 수 : {current}</p>
	</div>
	<div class="check {id}">
		<input
			type="checkbox"
			id="num{id}"
			on:click={(e) => {
				let check = e.target.checked;
				check ? null : (range.value = 0);
				this_stock.amount = e.target.checked ? Number(range.value) : 0;
				console.log("stock is", this_stock.amount);
				console.log("max is", max);
				range.disabled = check;
				transaction = [...transaction];
				console.log("transaction:", transaction);
			}}
		/>
		<label for="num{id}">
			<div class="check">CHECKED</div>
		</label>
	</div>
</div>

<style lang="scss">
	input[type="checkbox"] {
		display: none;
	}

	input:checked + label div {
		background-color: tomato;
	}
	label div {
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: MEDIUMSEAGREEN;
		font-weight: 600;
		font-size: 2.5rem;
	}
	.transaction {
		background: #ffffff;
		width: calc(var(--size) * 1);
		height: calc(var(--size) * 0.5);
		border-radius: calc(var(--size) * 0.05);

		padding: calc(var(--size) * 0.1);
		box-sizing: border-box;
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2),
			4px 8px 8px rgba(0, 0, 0, 0.2), 8px 16px 16px rgba(0, 0, 0, 0.2),
			16px 32px 32px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.range {
		--min: -20;
		--max: 20;
		--value: 0;
		--text-value: "HOLD";
		--primaryColor: silver;
		--fill-color: linear-gradient(to right, TOMATO 50%, MEDIUMSEAGREEN 50%);
		--value-background: unset;
		--value-active-color: unset;
		--thumb-size: 24px;
	}

	div.check {
		width: calc(var(--size) * 0.5);
		height: calc(var(--size) * 0.1);
		box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.2),
			inset 2px 4px 4px rgba(0, 0, 0, 0.2), inset 4px 8px 8px rgba(0, 0, 0, 0.2);
	}
	div.check {
		width: calc(var(--size) * 0.5);
		height: calc(var(--size) * 0.1);
		transition: box-shadow 0.3s ease-in-out;
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2),
			4px 8px 8px rgba(0, 0, 0, 0.2);
		/* input {
			:checked & {
				box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.2), inset 2px 4px 4px rgba(0, 0, 0, 0.2),
					inset 4px 8px 8px rgba(0, 0, 0, 0.2);
			}
		} */
	}
</style>
