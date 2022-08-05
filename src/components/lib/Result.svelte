<script>
	// get listed-object data. every object has same props and unique id.
	import Chart from "chart.js/auto";
	import { chart } from "svelte-apexcharts";
	import { onMount } from "svelte";
	export let title;
	export let data;
	const keys = Object.keys(data[0]).filter((x) => x !== "id"); // remove id from keys
	let cash = JSON.parse(localStorage.getItem("cash"));
	const withoutid = (obj) => {
		return Object.keys(obj)
			.filter((key) => key !== "id")
			.reduce((newobj, key) => {
				return { ...newobj, [key]: obj[key] };
			}, {});
	};
	let options;
	const draw_chart = () => {
		const history = JSON.parse(localStorage.getItem("history"));
		const arr = history[0].map((x) => {
			return { name: x.name, data: [], amount: [] };
		});
		for (let i of history) {
			for (let j of arr) {
				j.data.push(Math.floor(i.filter((x) => x.name === j.name).map((x) => x.price)[0]));
				j.amount.push(i.filter((x) => x.name === j.name).map((x) => x.amount)[0]);
			}
		}
		console.log(arr);
		const series = arr
			.filter((x) => x.amount.reduce((accumulator, current) => accumulator + current, 0) !== 0)
			.map((x) => {
				return {
					name: x.name,
					data: x.data,
				};
			});
		options = {
			chart: {
				type: "line",
			},
			series: series,
			xaxis: {
				categories: new Array(series.length),
			},
		};
	};
	data = data;
	draw_chart();
	onMount(async (promise) => {});
	console.log(cash.amount);
</script>

<div class="section">
	<h1>{title}</h1>
	<table cellpadding="0" cellspacing="0">
		<thead>
			<tr>
				{#each keys as key}
					<th>{key}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as rows}
				<tr id={rows.id}>
					{#each Object.values(withoutid(rows)) as key}
						<td>{key}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="chart_container">
		<div class="chart" use:chart={options} />
	</div>
	<div class="cash"><h1>cash : {cash.amount}</h1></div>
</div>

<style>
	.chart {
		width: 100%;
		height: 300%;
	}
	.cash {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	h1 {
		font-size: 2em;
		color: #000;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
	}
	table {
		width: 100%;
		table-layout: auto;
		border: 0;
	}
	thead {
		background-color: rgba(0, 0, 0, 0.5);
	}

	tbody {
		overflow-x: auto;
		margin-top: 0px;
	}

	tbody tr:hover {
		opacity: 0.5;
	}

	th {
		position: sticky;
		padding: calc(var(--size) * 0.015px) calc(var(--size) * 0.01px);
		text-align: left;
		font-weight: 600;
		font-size: 1.2em;
		color: #000;
		text-transform: uppercase;
	}
	td {
		padding: calc(var(--size) * 0.015px) calc(var(--size) * 0.01px);
		text-align: left;
		vertical-align: middle;
		font-weight: 500;
		font-size: larger;
		white-space: nowrap;
		border-bottom: solid 1px rgba(255, 255, 255, 0.1);
	}
	tr {
		color: #000;
	}
	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
	}
	tbody tr:nth-of-type(even) {
		background-color: rgba(255, 255, 255, 0.3);
		color: #000;
	}

	.chart_container {
		display: flex;
		flex-basis: 0px 1 1;
		position: relative;
		width: 100%;
		height: 60%;
		overflow: clip;
	}
	div.section {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: aliceblue;
		margin: 20px 0;
		border: 3px solid whitesmoke;
		font-family: "roboto";
	}
</style>
