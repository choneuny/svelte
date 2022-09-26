<script>
	import { slide } from "svelte/transition";
	export let media = "small";
	let showItems = false;
</script>

<nav class="bg-black" style="position: Sticky; top:0px; z-index:999;">
	{#if media == "small"}
		<!-- NAV VAR-->
		<div id="flex" class="nav relative flex items-center justify-center h-24">
			<!-- Mobile menu button-->
			<div class="absolute inset-y-0 left-8 flex items-center">
				<label
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				>
					<input type="checkbox" class="hidden" bind:checked={showItems} />
					<span class="sr-only">Open main menu</span>
					<svg
						class="block h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d={showItems ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
						/>
					</svg>
				</label>
			</div>
			<p
				class="nodrag text-white px-3 py-2 tracking-widest"
				style="font-family: roboto; font-size: 28px; font-weight: 600;"
			>
				STOCKVITY
			</p>
		</div>
		{#if showItems}
			<div class="absolute flex flex-col" transition:slide>
				<a
					href={"#embededgame"}
					class="w-40 border border-1 border-black bg-ash text-center">PLAY</a
				>
				<a
					href={"#about"}
					class="w-40 border border-1 border-black bg-ash text-center">ABOUT</a
				>
			</div>
		{/if}
	{:else}
		<!-- NAV VAR-->
		<div id="navbar" class="nav mx-14 px-2">
			<div id="flex" class="relative flex items-center justify-between h-20">
				<!-- DESKTOP-->
				<div class="flex-1 flex items-center justify-center">
					<div class="flex space-x-4 gap-8">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<p
							class="nodrag text-white px-3 py-2 tracking-widest"
							style="font-family: roboto; font-size: 28px; font-weight: 600;"
						>
							STOCKVITY
						</p>

						<!-- <a
							href={"#embededgame"}
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-3 rounded-md align-middle"
							style="font-family: roboto; font-size: 22px;"
						>
							PLAY
						</a>

						<a
							href={"#about"}
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-3 rounded-md"
							style="font-family: roboto; font-size: 22px;"
						>
							ABOUT
						</a> -->
					</div>
				</div>
				<!-- Hero Icon-->
				<!-- <div
					class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0"
				>
					<button
						type="button"
						class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
					>
						<span class="sr-only">View notifications</span>
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
					</button>
				</div> -->
			</div>
		</div>
	{/if}
	<!-- NAV VAR ENDS-->
</nav>

<style>
	.nav {
		height: calc(var(--size) * 0.08px);
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid transparent;
		box-sizing: border-box;
		background-color: black;
		/* box-shadow: 0px -2px 10px -1px #444; */
	}
</style>
