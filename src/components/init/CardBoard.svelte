<script>
  import "../lib/card.scss"
  import Card from "../lib/Card.svelte";
  export let done = false;
  export let round = 0;
  let themes = JSON.parse(localStorage.getItem('theme'));
  console.log(themes);
  const doneCheck = () => {
    if (themes.filter(x => x.checked).length == 2+round) {
      done = true;
      console.log(done);
      localStorage.setItem('theme', JSON.stringify(themes));
    } else {
      done = false;
    }
  }
</script>

<div class="cardboard" on:click={() => doneCheck()} >
  <div class="cardstack">
    {#each themes as theme}
    {#if !theme.checked}
    <Card bind:theme={theme}/>
    {/if}
    {/each}
  </div>
  <div class="holding">
    {#each themes as theme}
    {#if theme.checked}
    <Card bind:theme={theme} />
    {/if}
    {/each}
  </div>
</div>

<style>
  div.cardboard {
    position: relative;
    width: inherit;
    height: 75%;

    display: grid;
    grid-template-columns: 3fr;

    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    background: 'transparent';
    opacity: 1;
  }

  div.cardstack {
    display: flex;
	  height: calc(var(--size) * 0.25px);
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    white-space: nowrap;

    opacity: 0.8;
  }

  div.holding {
    display: flex;
	  height: calc(var(--size) * 0.15px);
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: -20px;

    white-space: nowrap;
    margin: 0 200px;
    padding: 10px;
    box-sizing: border-box;
    opacity: 0.8;
  }
</style>
