<script>
  export let news;
  export let content_key = {symbol:"symobl", title: "title", content: "content"};
  
  let symbol = news[content_key.symbol]
  let title = news[content_key.title]
  let content = news[content_key.content]
  let date = news[content_key.date]
  content = content.replace(/-/g, '<br />-');
</script>


<div class="news">
  {#if symbol?.length>0}
  <h2>㈜{symbol}</h2>
  {/if}
  <h2 >{title}</h2>
  <h4>{@html content}</h4>
</div>

<style>
  .news {
    flex: 1 1 0px;
    height: 90%;
    font-family:"galmuri11";
    font-size: 14px;
    color: black;
    display: grid;
    grid-template-rows: 0.5fr 0.5fr 2fr;
    text-align:center;
    background: #d2d2d2;
    border: 2px solid #7b807c;
    opacity: 1;
    padding: 0 0.7em;
    border-radius: 1px;
  }

  h4 {
    word-break: keep-all;
    font-size: 22px;
    text-align: left;
  }
</style>