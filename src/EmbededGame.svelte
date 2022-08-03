<script>
  import Intro from "./components/Intro.svelte";
  import Room from "./components/Room.svelte";
  import Screen from "./components/Screen.svelte";
  import SetLocalStorage from "./components/lib/SetLocalStorage";
  SetLocalStorage();
  let page = "intro";
  let isfull = false;
  function toggleFullScreenMode(event) {
    const doc = event.target.parentElement;
    isfull = doc.fullscreenElement!==null;
    if (isfull) {
      doc.requestFullscreen();
    } else {
      doc.exitFullscreen();
    }
  }
  let setPage = (newpage) => {
    setTimeout(() => {
      page = newpage;
    }, 500);
  };
</script>

<div class="gamewrapper nodrag">
  {#if page === 'intro'}
  <Intro bind:setPage={setPage} />
  {:else if page === 'room'}
  <Room bind:setPage={setPage} page={page} />
  {:else if page === 'screen'}
  <Screen/>
  {/if}
  <button class="fullscreen" on:click={(e) => toggleFullScreenMode(e)} />
</div>



<style>
  * {
    font-family: 'galmuri11', 'sans-serif';
  }

  .gamewrapper {
    position: relative;
    z-index: 3;
    width: calc( var(--size) * 0.8px);
    height: calc( var(--size) * 0.45px);
    margin: 3% 0px;
    border: none;
    align-items: center;
    background-color: white;
    overflow: hidden;
    /* box-shadow: 0px -2px 10px -1px #444; */
  }

  button.fullscreen {
    position: absolute;
    width: calc( var(--size) * 0.025px);
    height: calc( var(--size) * 0.025px);
    right: 5px;
    bottom: 5px;
    background: url(./assets/icon/fullscreen.svg) no-repeat;
    background-size: cover;
    padding: 0;
    border: 0;
    z-index: 999;
    filter: invert(100%);
  }
  button.fullscreen:hover {
    opacity: 0.5;
  }
  button.fullscreen:active {
    opacity: 0.5;
  }
</style>

