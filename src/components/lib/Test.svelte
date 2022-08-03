<script>
  import "./test.scss";
	import { quintOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";

	const [send, receive] = crossfade({
	  duration: d => Math.sqrt(d * 200),

	  fallback(node, params) {
	    const style = getComputedStyle(node);
	    const transform = style.transform === "none" ? "" : style.transform;

	    return {
	      duration: 600,
	      easing: quintOut,
	      css: t => `
																																						transform: ${transform} scale(${t});
																																						opacity: ${t}
																																					`
	    };
	  }
	});

	let uid = 1;

	let todos = [
	  { id: uid++, done: false, description: "write some docs" },
	  { id: uid++, done: false, description: "start writing blog post" },
	  { id: uid++, done: true, description: "buy some milk" },
	  { id: uid++, done: false, description: "mow the lawn" },
	  { id: uid++, done: false, description: "feed the turtle" },
	  { id: uid++, done: false, description: "fix some bugs" }
	];

	function add(input) {
	  const todo = {
	    id: uid++,
	    done: false,
	    description: input.value
	  };

	  todos = [todo, ...todos];
	  input.value = "";
	}

	function remove(todo) {
	  todos = todos.filter(t => t !== todo);
	}

	function mark(todo, done) {
	  todo.done = done;
	  remove(todo);
	  todos = todos.concat(todo);
	}
</script>

<div class='board'>
<div class='left'>
		<h2>todo</h2>
		{#each todos.filter(t => !t.done) as todo (todo.id)}
			<label
        class="card"
				in:receive="{{key: todo.id}}"
				out:send="{{key: todo.id}}"
				animate:flip
			>
          <button type=button on:click={() => mark(todo, true)}>
          <div class="card-face">
            <div class="card-label">
              {todo.description}
            </div>
          </div>
			</label>
		{/each}
	</div>

	<div class='right'>
		<h2>done</h2>
		{#each todos.filter(t => t.done) as todo (todo.id)}
        <label 
        class="card"
        in:receive="{{key: todo.id}}"
				out:send="{{key: todo.id}}"
				animate:flip
        >
          <button type=button on:click={() => mark(todo, false)}>
          <div class="card-face">
            <div class="card-label">
              {todo.description}
            </div>
          </div>
        </label>
		{/each}
	</div>
</div>

<div class="cards">
	{#each Array(5) as _, i}
	<div class="card">
		<div class="card-face">
			<div class="card-label">
				{i + 1}
			</div>
		</div>
	</div>
	{/each}
</div>

<style>
	.board {
	  display: grid;
	  grid-template-columns: 1fr 1fr;
	  grid-gap: 1em;
	  max-width: 36em;
	  margin: 0 auto;
	}

	h2 {
	  font-size: 2em;
	  font-weight: 200;
	  user-select: none;
	  margin: 0 0 0.5em 0;
	}

	label {
	  position: relative;
	  line-height: 1.2;
	  padding: 0.5em 2.5em 0.5em 2em;
	  margin: 0 0 0.5em 0;
	  border-radius: 2px;
	  user-select: none;
	  color: #333;
	}

	label:hover button {
	  opacity: 1;
	}
</style>