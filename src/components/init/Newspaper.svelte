<script>
  import News from "../lib/News.svelte";
  import SetCurrentNews from "../lib/SetCurrentNews.js";
  const dailyNews = [...SetCurrentNews()];
  export let done;
  // let dailyNews = SetCurrentNews();
  let newsopen = false;
  const doneCheck = () => {
    if (true) {
      done = true;
    }
  };
  const explain_key = {symbol:"corp", title: "title", content: "body", date: ""};


</script>

<div class="newscomes nodrag" on:click={() => newsopen=!newsopen} />
<div class="shownews nodrag {newsopen? "popup":"popin"}" on:click={() => newsopen=!newsopen}>
  {#each dailyNews as news}
    <News news={news} content_key={explain_key}/>
  {/each}
</div>

<style>
  .newscomes {
    background: url(./img/NEwspaper_alarmed.png) no-repeat;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--size) * 0.55px );
    height: calc(var(--size) * 0.35px );
    transform: translate(-50%, -50%);
    appearance: None;
    z-index: 10;
  }

  .shownews {
    position:absolute;
    left: calc(var(--size) * 0.07px );
    top: calc(var(--size) * 0.02px );
    width: calc(var(--size) * 0.65px );
    height: calc(var(--size) * 0.38px );
    background-color: rgba(0,0,0,0.4);
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    gap: 1%;
    padding: 0 1%;
    box-sizing: border-box;
    z-index: 998;
    backdrop-filter: blur(3px);
  }
</style>
