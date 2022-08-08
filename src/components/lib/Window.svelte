<script>
	export let func;
	export let icon;
	export let title;
	const settings = "./img/icon/settings.svg";
	const internet = "./img/icon/internet.svg";
</script>

<div class="window">
	<div class="titlebar">
		<div class="nav">
			<img src={icon} alt="error!" />
		</div>
		<div class="title">
			<h1>{title}</h1>
		</div>
		<div class="controls">
			<div class="icon minimize" on:click={() => func("minimize")} />
			<div class="icon maximize" on:click={() => func("maximize")} />
			<div class="icon close" on:click={() => func("close")}>
				<div class="diagonal1" />
				<div class="diagonal2" />
			</div>
		</div>
		<div class="nav">
			<img src={settings} alt="error!" />
		</div>
	</div>
	<slot />
</div>

<style>
	* {
		font-family: "roboto";
		font-weight: 600;
		text-transform: uppercase;
		color: #fff;
		box-sizing: border-box;
	}
	img {
		filter: invert();
	}
	.window {
		display: flex;
		height: 92%;
		flex-direction: column;
		align-items: center;
		padding: 0px;
		gap: 15px;

		background: rgba(255, 255, 255, 0.2);
		mix-blend-mode: normal;
		border: 2px solid #000000;
	}

	.titlebar {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 5px 20px;
		isolation: isolate;

		width: 100%;
		height: 60px;

		background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, #000000 50%, rgba(0, 0, 0, 0.7) 100%);
		mix-blend-mode: normal;
	}
	.title {
		width: 70%;
	}
	.controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 15px 0px;
		gap: 25px;

		width: 125px;
		height: 50px;
		left: calc(50% - 125px / 2 + 0.5px);
		top: 5px;

		/* Inside auto layout */

		flex: none;
		flex-grow: 0;
		z-index: 3;
	}
	.nav {
		width: 40px;
		height: 40px;
		border-radius: 5px;
	}
	.icon {
		width: 25px;
		height: 25px;
	}
	.minimize {
		border-bottom: 2px dashed #ffffff;
	}
	.maximize {
		border: 2px dashed #ffffff;
	}
	.close {
		overflow: hidden;
	}
	.diagonal1 {
		width: 50px;
		height: 1px;
		transform: rotate(45deg) translate(0%, 0%);
	}
	.diagonal2 {
		width: 50px;
		height: 1px;
		transform: rotate(-45deg) translate(-50%, 0%);
	}
</style>
