<script>
	// get array of object. objects must have same props including id.
	export let title;
	export let data;
	export let func;
	export let cash;
	const keys = Object.keys(data[0]).filter((x) => x !== "id"); // remove id from keys
	console.log(keys);
	const withoutid = (obj) => {
		return Object.keys(obj)
			.filter((key) => key !== "id")
			.reduce((newobj, key) => {
				return { ...newobj, [key]: obj[key] };
			}, {});
	};

	$: data = data;
	console.log(cash.amount);
</script>

<section>
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
				<tr id={rows.id} on:click={func}>
					{#each Object.values(withoutid(rows)) as key}
						<td style="--value:0.1">{key}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="cash"><h1>cash : {cash.amount}</h1></div>
</section>

<style>
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
		overflow: scroll;
		border: 0;
	}
	thead {
		background-color: rgba(0, 0, 0, 0.5);
	}

	tbody {
		overflow-y: scroll;
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
		--accuracy: 1000000;

		--binary-value: clamp(0, calc(var(--value) + 1 / var(--accuracy)), calc(1 / var(--accuracy))) * var(--accuracy);
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

	section {
		position: relative;
		background-color: aliceblue;
		margin: 20px 0;
		border: 3px solid whitesmoke;
		font-family: "roboto";
	}
</style>
