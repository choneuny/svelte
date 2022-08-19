<script>
	import { width as wd } from "../data/stores";
	export let name;
	export let theme;
	export let price;
	export let fluct;
	export let amount;
	export let size = $wd * 0.65;
	fluct = (fluct - 1) * 100;
	const base = size / 4;
	const space = "\u00a0";
	const color = fluct >= 0 ? "red" : "blue";
</script>

<div class="stock overflow-hidden" style="--base:{base}px">
	<svg viewBox="0 0 {base} {base}">
		<text class="symbol" y={base * 0.2}>{name}</text>
		<text class="corp uppercase" y={base * 0.35}>{theme}</text>
		<text class="price" y={base * 0.75}>${price}</text>
		<text class="fluct" y={base * 0.9} style="fill: {color}"
			>{space}{Math.round(fluct)}%</text
		>
		<text class="amount fill-ash text-[40]" y={base * 1} x={base * 0.1}
			>{amount.toString().padStart(2, space)}</text
		>
	</svg>
</div>

<style>
	svg {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		overflow: visible;
	}
	.symbol {
		font-size: calc(var(--base) * 0.15);
	}
	.corp {
		fill: gray;
		font-size: calc(var(--base) * 0.1);
	}
	.price {
		font-weight: 600;
		font-size: calc(var(--base) * 0.25);
	}
	.fluct {
		font-weight: 550;
		font-size: calc(var(--base) * 0.08);
	}
	.amount {
		font-family: "roboto";
		font-weight: 900;
		font-size: calc(var(--base) * 1.2);
		letter-spacing: calc(var(--base) * -0.1);
		z-index: -1;
		opacity: 0.25;
	}

	.stock {
		background-color: white;
		padding: calc(var(--base) * 0.08);
		box-sizing: border-box;
		border: 1px solid transparent;
		border-radius: calc(var(--base) * 0.15);
		width: var(--base);
		height: var(--base);
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2),
			4px 8px 8px rgba(0, 0, 0, 0.2), 8px 16px 16px rgba(0, 0, 0, 0.2),
			16px 32px 32px rgba(0, 0, 0, 0.2);
	}
</style>
