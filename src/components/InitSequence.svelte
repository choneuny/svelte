<script>
  import Typer from "./lib/Typer.svelte";
  import InitDialog from "./data/InitDialog";
  import Taskbar from "./lib/Taskbar.svelte";
  import CardBoard from "./init/CardBoard.svelte";
  import CorpBoard from "./init/CorpBoard.svelte";
  import Newspaper from "./init/Newspaper.svelte";
  import Transaction from "./init/Transaction.svelte";
  import RoundClear from "./init/RoundClear.svelte";
  import { round, next_round } from "./data/stores.js";
  let current_round;
  round.subscribe(x => {
    current_round = x;
  });

  let count = 0;
  const steps = ['cardboard', 'corpboard', 'newspaper', 'transaction', 'roundclear'];
  let step = steps[count];
  let diag = [...InitDialog[step]];
  let diagOpen = true;
  let stepDone = false;
  $: {
    stepDone = false;
    step = steps[count];
    diag = [...InitDialog[step]];
    diagOpen = true;
    console.log(count);
    console.log(steps[count]);
  }
  
</script>

<div class="wrapper">
  {#if step==='cardboard'}
  <CardBoard bind:done={stepDone} round={current_round} />
  {:else if step==='corpboard'}
  <CorpBoard bind:done={stepDone} round={current_round}/>
  {:else if step==='newspaper'}
  <Newspaper bind:done={stepDone}/>
  {:else if step==='transaction'}
  <Transaction bind:done={stepDone}/>
  {:else if step==='roundclear'}
  <RoundClear/>
  {/if}
  {#if diagOpen}
  <Typer bind:dialog={diag} bind:isopen={diagOpen} />
  {/if}
  <Taskbar bind:next={stepDone} bind:count={count} />
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
