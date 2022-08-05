<script>
	import { next_round } from "../data/stores.js";
	export let count;
	setTimeout(() => {
		console.log(count);
		count++;
		console.log(count);
		next_round();
	}, 1000);
</script>

<img src="./img/background/Sunset.gif" alt="RoundClear" />

<style>
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
</style>
