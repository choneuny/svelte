<script>
	// @ts-nocheck

	let parent = document.querySelector("#parent");
	let child = parent.childNodes;
	child.forEach((item) => {
		item.style.zIndex = 10;
	});

	const clicktoshow = (e) => {
		let target = e.target;
		target.parentNode.style.zIndex = 1;
		let parent = target.parentNode;
	};
</script>

<div id="parent">
	<div>ww</div>
	<div>qwrqw</div>
	<div>qwrqww</div>
</div>
