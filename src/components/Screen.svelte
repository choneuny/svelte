<script>
  import Typer from "./lib/Typer.svelte";
  import Taskbar from "./lib/Taskbar.svelte";
  import Dialog from "./data/InitDialog.js";
  import InitSequence from "./InitSequence.svelte";
  import RoundStart from "./init/RoundStart.svelte";
  let diagOpen = true;
  let round = 0;
  let roundDone = false;
</script>

<div class="screen">
  <div class="wallpaper">
    {#if round===0}
    <InitSequence bind:round={round}/>
    {:else}
    <RoundStart />
    <Taskbar next={roundDone} round={round} count={0} />
    {/if}
  </div>
</div>

<style>
  .screen {
    position: relative;
    width: inherit;
    height: inherit;
    background: url(./img/background/monitor.png) no-repeat;
    background-size: cover;
  }
  .wallpaper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 98.8%;
    height: 98.5%;
    transform: translate(-50%, -50%);
    background: url(./img/background/parchment.png);
    background-size: contain;
  }
</style>
