<script>
  export let setPage;
  let done = false;
  const asset = (path) => `./img/${path}`;
</script>

<div id="intro" class="anim nodrag">
  <div 
  class="hiddeninput {done? ' nodrag fadeout':''}" 
  on:click={() => {
    setPage("room");
    done = true;
    }}>
    <img class="title nodrag" src={asset("title.png")} alt="TITLE">
    <img class="title subtitle blink nodrag" src={asset("taptostart.png")} alt="subtitle">
  </div>
</div>

<style>
  .anim {
    position: relative;
    width: inherit;
    height: inherit;
    background: url(./img/background/intro.gif) no-repeat;
    background-size: cover;
  }
  
  .hiddeninput { 
    position: absolute;
    width: inherit;
    height: inherit;
    /* backdrop-filter: blur(3px); */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 3;
  }

  .title {
    width: calc( var(--size) * 0.6px);
    height: calc( var(--size) * 0.1px);
    display: block;
  }

  .subtitle {
    width: calc( var(--size) * 0.45px);
    height: calc( var(--size) * 0.09px);
  }

</style>
