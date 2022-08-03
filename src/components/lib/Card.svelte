<script>
  import './card.scss';
  export let theme;
  // $: console.log(`${theme.id} : ${theme.checked}`);
</script>

<div id={theme.id} class="flip-card">
    {#if theme.checked}
    <div class="sellected _6 card" on:click={() => theme.checked=false}>
      <div class="card-face">
        <div class="card-label">
          <h1>{theme.theme.toUpperCase()}</h1>
          <h3>{theme.title}</h3>
        </div>
      </div>
    <span>
    <img class="cardback" src={theme.icon} alt='error!'/>
    </span>
    </div>
    {:else}
    
    <div class="flip-card-inner">
    <div class="flip-card-back">
      <img class="cardback" src="./img/fool.jpg" alt='error!'/>
    </div>
    <div class="flip-card-front sellected" on:click={() => theme.checked=true}>
    <h1>{theme.theme.toUpperCase()}</h1>
    <h3>{theme.title}</h3>
    <img src={theme.icon} alt='error!'/>
    </div>
    </div>
    {/if}
</div>

<style>
  .cardback {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border: 3px solid transparent;
    border-radius: 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .sellected {
    position: absolute;
    appearance: none;
    border: 3px solid transparent;
    border-radius: 12px;
    background: url(./img/cards/clubs_ace.svg) no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .sellected:hover {
    opacity: 0.9;
  }
  .flip-card {
    appearance: none;
	  width: calc(var(--size) * 0.14px);
	  height: calc(var(--size) * 0.2px);
    box-sizing: border-box;
    perspective: 500px;
    cursor: pointer;
  }

  .flip-card-inner {
    position: relative;
    appearance: none;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    text-align: center;
    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-back {
    position: absolute;
    appearance: none;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    box-sizing: border-box;
    border-radius: 12px;
    backface-visibility: hidden;
  }

  .flip-card-front {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    appearance: none;
    border: 3px solid transparent;
    box-sizing: border-box;
    border-radius: 12px;
    background: url(./img/cards/clubs_ace.svg) no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .flip-card-back {
    appearance: none;
    z-index: 2;
  }

  .flip-card-front {
    appearance: none;
    transform: rotateY(180deg);
    z-index: 1;
  }


</style>