<script>
	// @ts-nocheck
	import { afterUpdate } from "svelte/internal";
	import "../../assets/css/range.scss";
	export let id, amount, price; // from user
	export let transaction;
	export let max;
	const size = 500;
	const this_stock = transaction.find((x) => x.id == id);
	const cash = JSON.parse(localStorage.getItem("cash")).amount;
	let range;
	let unchecked;
	let value = 0;
	let whole = 0;
	let disabled = false;
	max = Math.floor(cash / price);
	afterUpdate(() => {
		range = document.getElementById(JSON.stringify(id));
		value = range.disabled ? Number(value) : Number(range.value);
		console.log(range);
		console.log("value:", value, "id:", range.id);
		range.parentNode.style.setProperty("--value", range.value);
		range.parentNode.style.setProperty("--text-value", JSON.stringify(range.value));
	});
</script>

<div class="transaction overflow-hidden" style="--size:{size}px">
	<div class="range" style="--min:{-1 * amount}; --max:{max}" data-ticks-position="top">
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
		<p class="font-bold">최종 보유 수 : {value + amount}</p>
	</div>
	<div class="check {id}">
		<input
			type="checkbox"
			id="num{id}"
			on:click={(e) => {
				this_stock.amount = e.target.checked ? Number(value) : 0;
				console.log("stock is", this_stock.amount);
				whole = transaction.reduce((arr, cur) => arr + cur.amount * cur.price, 0);
				max = Math.floor((cash - whole) / price);
				console.log(max);
				range.disabled = e.target.checked;
				unchecked = document.querySelectorAll(".range input");
				for (let x of unchecked) {
					if (x.disabled) {
						console.log(x.id, "is disabled");
						continue;
					} else {
						console.log(x.value);
						x.value = x.value > max ? max : x.value;
					}
				}
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
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2), 4px 8px 8px rgba(0, 0, 0, 0.2),
			8px 16px 16px rgba(0, 0, 0, 0.2), 16px 32px 32px rgba(0, 0, 0, 0.2);
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
		box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.2), inset 2px 4px 4px rgba(0, 0, 0, 0.2),
			inset 4px 8px 8px rgba(0, 0, 0, 0.2);
	}
	div.check {
		width: calc(var(--size) * 0.5);
		height: calc(var(--size) * 0.1);
		transition: box-shadow 0.3s ease-in-out;
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2), 4px 8px 8px rgba(0, 0, 0, 0.2);
		/* input {
			:checked & {
				box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.2), inset 2px 4px 4px rgba(0, 0, 0, 0.2),
					inset 4px 8px 8px rgba(0, 0, 0, 0.2);
			}
		} */
	}
</style>
