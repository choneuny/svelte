<script>
	import { image } from "../data/GlobalVariable.js";
	import ChartDonut from "../lib/ChartDonut.svelte";
	import ChartBar from "../lib/ChartBar.svelte";
	import ChartLine from "../lib/ChartLine.svelte";
	import LilStock from "../lib/LilStock.svelte";
	import Window from "../lib/Window.svelte";
	import { pfl_page, switch_page, round } from "../data/stores";
	import { fade, crossfade } from "svelte/transition";
	import { width as wd } from "../data/stores";
	const styles = {
		width: $wd * 0.43,
		height: $wd * 0.465,
		left: $wd * 0.005,
		top: $wd * 0.005,
		title: "포트폴리오",
		icon: image.chart,
		bgcolor: "#b2b2b2",
	};
	const size = $wd * 0.38;
	const chart_colors = ["#ff6384", "#36a2eb", "#2ab96a", "#e9c061", "#9173d8"];
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const donut = user
		.filter((x) => x.amount > 0)
		.map((x) => {
			const amount = x.price * x.amount;
			return { id: x.name === "cash" ? "현금" : x.name, amount: amount };
		});
	const data_donut = {
		labels: donut.map((x) => x.id),
		datasets: [
			{
				data: donut.map((x) => x.amount),
				backgroundColor: chart_colors,
			},
		],
	};
	const bar = history.map((x) => {
		return {
			stock: x
				.filter((y) => y.name !== "cash")
				.reduce((total, current) => {
					const amount = current.price * current.amount;
					return total + amount;
				}, 0),
			cash: x.find((y) => y.name === "cash").amount,
		};
	});
	const data_bar = {
		labels: bar.map((x, i) => `${i + 1}주차`),
		datasets: [
			{
				label: "현금",
				data: bar.map((x) => x.cash),
				backgroundColor: "#36A2EB",
			},
			{
				label: "주식",
				data: bar.map((x) => x.stock),
				backgroundColor: "#ff6384",
			},
		],
	};
	const get_line = () => {
		const arr = history[0].map((x) => {
			return { name: x.name, data: [], amount: [] };
		});
		for (let i of history) {
			for (let j of arr) {
				j.data.push(
					Math.floor(i.filter((x) => x.name === j.name).map((x) => x.price)[0])
				);
				j.amount.push(
					i.filter((x) => x.name === j.name).map((x) => x.amount)[0]
				);
			}
		}
		const newSeries = arr
			.filter(
				(x) =>
					x.amount.reduce(
						(accumulator, current) => accumulator + current,
						0
					) !== 0 && x.name !== "cash"
			)
			.map((x) => {
				return { name: x.name, data: x.data };
			});
		return newSeries;
	};
	const line = get_line();
	const data_line = {
		labels: line.map((x, i) => `${i + 1}주차`),
		datasets: line.map((x, i) => {
			return {
				label: x.name,
				data: x.data,
				backgroundColor: chart_colors[i],
				pointRadius: 6,
				hoverRadius: 12,
				borderWidth: 3,
				pointBorderRadius: 4,
				pointBorderColor: "#fff",
			};
		}),
	};
	const top3 = user
		.filter((x) => x.id < 999 && x.amount > 0)
		.sort((a, b) => b.amount - a.amount)
		.slice(0, 3);

	console.log(data_line);
	console.log(data_line);
</script>

<Window {styles}>
	<div class="relative w-[95%] h-fit border-b flex flex-row">
		<p class="inline small text-left self-start">
			{$pfl_page == "stock" ? "보유 주식" : "그래프"}
		</p>
		<div
			class="absolute right-0 bottom-0 flex justify-center align-end gap-[1rem]"
		>
			<div
				class="text-ash hover:text-black transition-colors duration-300"
				on:click={() => switch_page("stock")}
			>
				보유 주식
			</div>
			<div
				class="text-ash hover:text-black duration-300"
				on:click={() => switch_page("chart")}
			>
				그래프
			</div>
		</div>
	</div>
	<div class="placeholder w-full h-[94%]">
		{#if $pfl_page === "chart"}
			<div class="chartbox" transition:fade>
				<div id="pfl_donut" class="radius rounded antializing bg-white">
					<ChartDonut data={data_donut} />
				</div>
				<div id="pfl_bar" class="radius rounded antializing bg-white">
					<ChartBar data={data_bar} />
				</div>
				<div
					id="pfl_line"
					class="radius rounded col-span-full antializing bg-white"
				>
					<ChartLine data={data_line} />
				</div>

				<div
					class="relative w-[99%] h-fit flex flex-col gap-[0.5rem] col-span-full justify-self-center "
				>
					<div class="border-b text-left smaller">주요 보유주</div>
					<div class="flex flex-row gap-[1rem] box-border">
						{#each top3 as stock}
							<LilStock {...stock} {size} />
						{/each}
						<div
							class="border rounded-2xl bg-gray hover:opacity-50 transition-all duration-300"
							on:click={() => switch_page("stock")}
						>
							<svg
								style="color: white"
								xmlns="http://www.w3.org/2000/svg"
								width={$wd * 0.095}
								height={$wd * 0.095}
								fill="currentColor"
								class="bi bi-three-dots"
								viewBox="0 0 16 16"
							>
								<path
									d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
									fill="white"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		{:else if $pfl_page === "stock"}
			{#each user.filter((x) => x.amount > 0 && x.name !== "cash") as stock}
				<p
					class="radius large rounded-lg col-span-full bg-white text-black"
					style:border="0.1rem inset #323232"
					style:padding="0.5rem"
				>
					(주){stock.name}
					${stock.price}
					{stock.fluct > 1 ? "▲" : stock.fluct < 1 ? "▼" : "◆"}
					{Math.round((stock.fluct - 1) * 100)}% 보유수 {stock.amount}주
				</p>
			{:else}
				<p>loading...</p>
			{/each}
		{/if}
	</div>
</Window>

<style>
	.radius {
		box-shadow: var(--deep-shadow);
	}

	.chartbox {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 45% 55%;
		grid-template-rows: minmax(40%, 45%) minmax(25%, 25%) minmax(30%, 30%);
		gap: 0.7rem;
		justify-content: center;
		padding: 0.5rem 1rem;
		box-sizing: border-box;
	}
</style>
