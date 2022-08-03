<script>
  // input data shape example :
  // inputdata = [
  //   {theme: 'A',
  //   name: 'A',
  //   corp: [
  //     {theme: 'A', name: 'A', amount: 10, price: 100, fluct: 'up'},
  //     {theme: 'A', name: 'A', amount: 10, price: 100, fluct: 'up'}
  //   ]},
  //   {theme: 'B',
  //   name: 'B',
  //   corp: [
  //     {theme: 'B', name: 'B', amount: 10, price: 100, fluct: 'up'},
  //     {theme: 'B', name: 'B', amount: 10, price: 100, fluct: 'up'}
  //   ]},
  // ], title_col = "name", content_col = "corp"
  // output Grid shape example :
  // get listed-object data. every object has same props and unique id.
  export let title;
  export let col;
  export let data;
  export let func;
  const withoutid = (obj) => {
    return (
    Object.keys(obj)
    .filter(key => key!=='id')
    .reduce((newobj, key) => { return {...newobj, [key]: obj[key]}}, {})
    )};
</script>

<section>
  {#each data as item }
  <div class="container nodrag" style="--col:{item[col].length}">
  <div class="title"><h1>{item[title]}</h1></div>
    {#each item[col] as subitem }
    <div id={subitem.id} class="col" on:click={func} >
      {#each Object.values(withoutid(subitem)) as content}
      <div class="content">{content}</div>
      {/each}
      <div class="buy">ㅤ</div>
    </div>
    {/each}
  </div>
  {/each}
</section>

<style>
  h1 {
    font-size: 25px;
    color: #000;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .buy {
    text-align: center;
    background: #000;
    color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .col:hover .buy{
      opacity: 0.6;
  }

  .container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(var(--col), 1fr);
    grid-template-rows: auto 3fr auto;
  }
  .title {
    align-items: center;
    align-content: center;
    text-align: center;
    grid-column: 1/-1;
  }
  .col {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2em 0.5em;
    gap: 3em;
    align-items: center;
    align-content: center;
    border: 3px solid whitesmoke;
    box-sizing: content-box;
  }
  .content {
    word-break: keep-all;
    text-align: center;
  }
  section {
    padding: 10px;
    box-sizing: border-box;
    background: "transparent";
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 15px;

    margin: 20px;
    border: 3px solid whitesmoke;
    font-family: "roboto";
  }
</style>