<script>
	import { background as bg } from "./components/data/GlovalVariable.js";
</script>

<div class="header" style="background:url({bg.headeralt})" />

<style>
	.header {
		width: calc(var(--size) * 0.8px);
		height: calc(var(--size) * 0.25px);
		background-repeat: no-repeat;
		background-size: cover;
		box-shadow: 0px 2px 10px -1px #444;
	}
</style>
