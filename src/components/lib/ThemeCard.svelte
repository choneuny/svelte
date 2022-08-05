<script>
	import "./card.scss";
	export let theme;
	// $: console.log(`${theme.id} : ${theme.checked}`);
</script>

<div class="sellected {theme.checked ? '_6' : ''} {theme.fixed ? 'black' : ''}">
	<h1>{theme.theme.toUpperCase()}</h1>
	<h3>{theme.title}</h3>
	<img class="cardback" src={theme.icon} alt="error!" />
</div>

<style>
	.black {
		filter: brightness(50%);
	}

	.cardback {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		border: 3px solid transparent;
		border-radius: 12px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
	}
	.sellected {
		position: relative;
		width: calc(var(--size) * 0.1px);
		height: calc(var(--size) * 0.14px);
		appearance: none;
		border: 3px solid transparent;
		border-radius: 12px;
		background-color: aliceblue;
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
	}

	.sellected:hover {
		filter: brightness(50%);
	}
</style>
