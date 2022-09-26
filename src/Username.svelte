<script>
	let phase;
	let input_name = false;
	const hide = () => {
		phase.style.display = "none";
	};
</script>

<div id="phase" bind:this={phase}>
	{#if !input_name}
		<section id="selector">
			<label>
				<div class="select" />
				<button on:click={() => (input_name = true)}> 이름 입력하기 </button>
			</label>
			<label>
				<div class="select" />
				<button on:click={hide}> SKIP </button>
			</label>
		</section>
	{:else}
		<section id="input_name">
			<label class="input_text">
				<input type="text" placeholder="이름을 입력하세요" />
			</label>
			<button on:click={hide}> 확인 </button>
		</section>
	{/if}
</div>

<style>
	#phase {
		position: absolute;
		width: 95%;
		height: inherit;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 99;
	}

	div .select {
		position: absolute;
		width: 100%;
		height: inherit;
		opacity: 0;
	}

	div .select:hover {
		background-image: radial-gradient(
			circle,
			rgba(255, 255, 255, 0.5) 0%,
			rgba(0, 0, 0, 0) 26%
		);
		opacity: 1;
		transition: all 0.4s ease-in-out;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: inherit;
		width: 100%;
	}

	label {
		width: auto;
		height: 50%;
		align-items: center;
	}

	.input_text {
		width: inherit;
		height: 30%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	input {
		height: 100%;
		width: 100%;
	}

	button {
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		cursor: pointer;
	}
</style>
