<script>
  import News from "../lib/News.svelte";
  const validstocks = [];
  const results = [];
  const history = JSON.parse(localStorage.getItem("history"));
  const user = JSON.parse(localStorage.getItem("user"));
  const news = JSON.parse(localStorage.getItem("news"));
  const explain_key = {symbol:"", title: "title", content: "why", date: ""};
  const arrow = (x) => (x>1.1? "↗": x<0.9? "↘": "➝");

  // const recodeHistory = () => {
  //   const tmp = [...history];
  //   const current = [...user];
  //   console.log(current);
  //   tmp.push(current);
  //   console.log(tmp);
  //   localStorage.setItem("history", JSON.stringify(tmp));
  // };
  
  // for (let i of news) {
  //   const tmp = [...user];
  //   const infl = i.infl.split("-");
  //   console.log(infl);
  //   tmp.map((x) => {
  //     if (infl.includes(x.name)) {
  //       x.price = Math.floor(x.price * (100 + i.fluct) + Number.EPSILON) / 100;
  //       x.fluct = 1 + i.fluct * 0.01;
  //     }
  //   });
  //   console.log(tmp);
  //   localStorage.setItem("user", JSON.stringify(tmp));
  //   }

  // recodeHistory();
  // const temp = [...JSON.parse(localStorage.getItem("history"))];
  // const arr = temp[0].map((x) => {
  //   return { name: x.name, data: [], amount: [] };
  // });
  // for (let i of temp) {
  //   for (let j of arr) {
  //     j.data.push(Math.floor(i.filter((x) => x.name === j.name).map((x) => x.price)[0]));
  //     j.amount.push(i.filter((x) => x.name === j.name).map((x) => x.amount)[0]);
  //   }
  // }  
  
  </script>
  
  <div class="shownews" id="news"> 
    {#each news as data}
      <News news={data} content_key={explain_key} />
    {/each}
  </div>
  <table>
    <tr>
      <th>종목명</th>
      <th>보유량</th>
      <th>현재가</th>
      <th>변동</th>
    </tr>
    {#each validstocks as stock}
      <tr>
        <td>{stock.name}</td>
        <td>{stock.amount}</td>
        <td>{Math.floor(stock.price)}</td>
        <td>{arrow(stock.fluct)}</td>
      </tr>
    {/each}
  </table>
  
  <style>
  
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
    .showresult {
      position: relative;
      font-family: "galmuri11";
      top: 50%;
      left: 50%;
      width: 1200px;
      height: 700px;
      transform: translate(-50%, -50%);
      display: grid;
      justify-content: center;
      grid-template-rows: 0.3fr repeat(1fr) 3fr;
      grid-template-columns: 3fr;
    }
  
    tr {
      width: 100%;
      height: 100%;
      border: 6px solid;
      border-image: url("img/brick.webp") 14 / 14px round;
      border-image-width: 10px;
      background: url("img/ground2.png") no-repeat;
      background-position: center;
      background-size: cover;
      box-sizing: border-box;
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  
    td {
      width: 100%;
      height: 90%;
      border: 2px solid #8c2e10;
      box-sizing: border-box;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      font-family: "galmuri11";
      font-size: 25px;
      font-weight: 500;
      color: whitesmoke;
    }
  
    .chartcontainer {
      width: 100%;
      height: 100%;
      border: 6px solid;
      border-image: url("img/brick.webp") 14 / 14px round;
      border-image-width: 10px;
      background-color: #a1a1a1;
      background-position: center;
      background-size: cover;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
  </style>