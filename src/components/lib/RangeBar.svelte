<script>
	import "../../assets/css/range.scss";
	export let index = "1";
	const size = 500;
	const set_value = (e) => {
		const target = e.target;
		target.parentNode.style.setProperty("--value", target.value);
		target.parentNode.style.setProperty("--text-value", JSON.stringify(target.value));
	};
</script>

<div class="transaction" style="--size:{size}px">
	<div class="range" data-ticks-position="top">
		<input type="range" min={-20} max={20} step="1" value="0" on:input={set_value} />
		<output />
		<div class="range__progress" />
	</div>
	<div class="check {index}">
		<input type="checkbox" id={index} />
		<label for={index}>
			<div class="check">CHECKED</div>
		</label>
	</div>
</div>

<style lang="scss">
	* {
		font-family: "roboto";
	}
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
	svg {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
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
		--step: 20;
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
