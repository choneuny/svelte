<script>
	import ChartDoughnut from "../lib/ChartDoughnut.svelte";
	import ChartBar from "../lib/ChartBar.svelte";
	import ChartLine from "../lib/ChartLine.svelte";
	import Window from "../lib/Window.svelte";
	import { round } from "../data/stores";
	const pkg = {
		icon: "./img/icon/chart.png",
		title: "포트폴리오",
		left: 0,
		top: 0,
		bgcolor: "#b2b2b2",
	};
	const chart_colors = ["#ff6384", "#36a2eb", "#2b92d8", "#2ab96a", "#e9c061", "#d95d6b", "#9173d8"];

	const cash = JSON.parse(localStorage.getItem("cash"));
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const cash_assets = { id: "현금 자산", amount: cash.amount };
	const doughnut = user
		.map((x) => {
			const amount = x.price * x.amount;
			return { id: x.name, amount: amount };
		})
		.filter((x) => x.amount > 0 && x.id !== "cash");
	doughnut.push(cash_assets);
	const data_doughnut = {
		labels: doughnut.map((x) => x.id),
		datasets: [
			{
				data: doughnut.map((x) => x.amount),
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
				label: "현금 자산",
				data: bar.map((x) => x.cash),
				backgroundColor: "#36A2EB",
			},
			{
				label: "주식 자산",
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
				j.data.push(Math.floor(i.filter((x) => x.name === j.name).map((x) => x.price)[0]));
				j.amount.push(i.filter((x) => x.name === j.name).map((x) => x.amount)[0]);
			}
		}
		const newSeries = arr
			.filter((x) => x.amount.reduce((accumulator, current) => accumulator + current, 0) !== 0 && x.name !== "cash")
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

	console.log(data_line);
</script>

<div class="portfolio">
	<Window {...pkg}>
		<div class="chartbox">
			{#each Array(1) as a}
				<div class="radius rounded-xl">
					<ChartDoughnut data={data_doughnut} />
				</div>
				<div class="radius rounded-xl">
					<ChartBar data={data_bar} />
				</div>
				<div class="radius rounded-xl col-span-full antializing">
					<ChartLine data={data_line} />
				</div>
			{:else}
				<p>loading......</p>
			{/each}
			{#each user.filter((x) => x.amount > 0 && x.name !== "cash") as stock}
				<p class="radius rounded-lg col-span-full text-3xl p-2 bg-white border-2 border-[#323232] border-inset">
					(주){stock.name}
					${stock.price}
					{stock.fluct > 1 ? "▲" : stock.fluct < 1 ? "▼" : "◆"}
					{Math.round((stock.fluct - 1) * 100)}% 보유수 {stock.amount}주
				</p>
			{:else}
				<p>loading...</p>
			{/each}
		</div>
	</Window>
</div>

<style>
	* {
		color: #000;
		text-align: center;
	}

	.radius {
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2), 4px 8px 8px rgba(0, 0, 0, 0.2),
			8px 16px 16px rgba(0, 0, 0, 0.2);
	}

	.portfolio {
		position: absolute;
		width: 700px;
		height: 750px;
		margin: 1%;
	}

	.chartbox {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: fit-content(90%);
		gap: 20px;
		justify-content: center;
		padding: 10px 20px;
		box-sizing: border-box;
	}
</style>
