<script>
	import "./card.scss";
	export let theme;
	let fixed = theme.fixed;
	// $: console.log(`${theme.id} : ${theme.checked}`);
</script>

{#if theme.checked}
	<div class="sellected _6 {fixed ? 'black' : ''}" on:click={fixed ? null : () => (theme.checked = false)}>
		<h1>{theme.theme.toUpperCase()}</h1>
		<h3>{theme.title}</h3>
		<span>
			<img class="cardback" src={theme.icon} alt="error!" />
		</span>
	</div>
{:else}
	<div id={theme.id} class="flip-card">
		<div class="flip-card-inner">
			<div class="flip-card-back">
				<img class="cardback" src="./img/fool.jpg" alt="error!" />
			</div>
			<div class="flip-card-front sellected">
				<h1>{theme.theme.toUpperCase()}</h1>
				<h3>{theme.title}</h3>
				<img src={theme.icon} alt="error!" />
			</div>
		</div>
	</div>
{/if}

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
		background: url(./img/cards/clubs_ace.svg) no-repeat;
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
	.flip-card {
		appearance: none;
		width: calc(var(--size) * 0.14px);
		height: calc(var(--size) * 0.2px);
		box-sizing: border-box;
		perspective: 500px;
		cursor: pointer;
	}

	.flip-card-inner {
		position: relative;
		appearance: none;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		text-align: center;
		transition: transform 1s;
		transform-style: preserve-3d;
	}

	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-back {
		position: absolute;
		appearance: none;
		width: 100%;
		height: 100%;
		border: 3px solid transparent;
		box-sizing: border-box;
		border-radius: 12px;
		backface-visibility: hidden;
	}

	.flip-card-front {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		appearance: none;
		border: 3px solid transparent;
		box-sizing: border-box;
		border-radius: 12px;
		background: url(./img/cards/clubs_ace.svg) no-repeat;
		background-size: cover;
		background-position: center;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.flip-card-back {
		appearance: none;
		z-index: 2;
	}

	.flip-card-front {
		appearance: none;
		transform: rotateY(180deg);
		z-index: 1;
	}
</style>
