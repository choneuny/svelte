<footer id="footer" class="footer">
	<ul class="navbar-list">
		<li>
			<div class="navbar-item">
				<h1 class="larger">ONELINE AI</h1>
				<p class="larger"><a href="." target="_blank">Contact Us</a></p>
			</div>
		</li>
	</ul>
</footer>

<style>
	.footer {
		height: calc(var(--size) * 0.08px);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 2px solid transparent;
		box-sizing: border-box;
		background-color: black;
		/* box-shadow: 0px -2px 10px -1px #444; */
	}

	.navbar-list {
		width: 100%;
		justify-content: center;
		gap: 50px;
		margin: 0;
		padding: 0 40px;
	}
	.navbar-item {
		color: #fff;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-family: "roboto";
	}
	.navbar-item p {
		font-weight: 300;
	}
	.navbar-item h1 {
		font-weight: 600;
	}
</style>
