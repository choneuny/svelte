<script context="module">
	import { image, background as bg } from "../data/GlovalVariable.js";
	import { width } from "../data/stores.js";
	export const style = {
		select: {
			width: width.value,
			height: 750,
			left: 120,
			top: 5,
			title: "Select Themes!",
			icon: image.card_back,
			bgcolor: "transparent",
		},
		announce: {
			width: 800,
			height: 780,
			left: 400,
			top: 5,
			title: "공시 발표",
			icon: image.internet,
			bgcolor: "#f5f5f5",
		},
		explain: {
			width: 800,
			height: 780,
			left: 700,
			top: 20,
			title: "인터넷",
			icon: image.internet,
			bgcolor: "#b2b2b2",
		},
		news: {
			width: 800,
			height: 780,
			left: 400,
			top: 10,
			title: "인터넷",
			icon: image.internet,
			bgcolor: "#b2b2b2",
		},
		pfl: {
			width: 700,
			height: 750,
			left: 10,
			top: 10,
			title: "포트폴리오",
			icon: image.chart,
			bgcolor: "#b2b2b2",
		},
		pfl_mini: {
			width: 400,
			height: 500,
			left: 20,
			top: 20,
			title: "포트폴리오",
			icon: image.chart,
			bgcolor: "#f5f5f5",
		},
	};
</script>
