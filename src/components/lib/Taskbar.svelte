<script>
  import { round, next_round } from "../data/stores.js";
  let current_round;
  round.subscribe(x => current_round = x);
  export let next;
  export let count;
  next = true;
  let apps = [
    {id:"chart", name:"chart", icon:"./img/icon/chart.png"},
  ];
  $: console.log(count)
</script>

<div class="taskbar">
  {#each apps as app}
    <button id="app.id" class="custom-button" on:click={() => next=!next} disabled={current_round===0? true:false}>
      <img class="custom-icon" src="{app.icon}" alt="error">
    </button>
  {/each}
  <button class="custom-button" on:click={() => next=!next} />
  <div id="arrowAnim" class={next? "":"hidden"} on:click={() => count++} >
    <div class="arrowSliding">
      <div class="arrow"></div>
    </div>
    <div class="arrowSliding delay1">
      <div class="arrow"></div>
    </div>
    <div class="arrowSliding delay2">
      <div class="arrow"></div>
    </div>
    <div class="arrowSliding delay3">
      <div class="arrow"></div>
    </div>
  </div>
</div>

<style>
.taskbar {
  position: absolute;
  left: calc( var(--size) * 0.07px);
  bottom: -1px;
  width: calc( var(--size) * 0.65px);
  height: calc( var(--size) * 0.035px);
  background: black;
  opacity: 0.9;
  border-radius: 8px 8px 0 0;

  display: flex;
  gap: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.custom-button {
	position: relative;
	width: calc( var(--size) * 0.030px);
	height: calc( var(--size) * 0.030px);

	background-color: white;
	background-size: cover;
	background-position: center;
	border: 3px solid transparent;
	border-radius: 8px;
  padding: 0;
	z-index: 3;
}
.custom-button:hover {
		opacity: 0.7;
}
.custom-button:disabled {
		opacity: 0.7;
}
.custom-icon {
	width: 100%;
	height: 100%;
  z-index: -1;
}

#arrowAnim {
  position: absolute;
  width: 15%;
  height: 80%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  width: calc( var(--size) * 0.01px);
  height: calc( var(--size) * 0.01px);
  border: calc( var(--size) * 0.005px) solid;
  border-color: transparent white white transparent;
  transform: rotate(-45deg);
}


.arrowSliding {
  position: absolute;
  -webkit-animation: slide 4s linear infinite; 
          animation: slide 4s linear infinite;
}

.delay1 {
  -webkit-animation-delay: 1s; 
    animation-delay: 1s;
}
.delay2 {
  -webkit-animation-delay: 2s; 
    animation-delay: 2s;
}
.delay3 {
  -webkit-animation-delay: 3s; 
    animation-delay: 3s;
}

@-webkit-keyframes slide {
    0% { opacity:0; transform: translateX(-100%); }	
  20% { opacity:1; transform: translateX(-150%); }	
  80% { opacity:1; transform: translateX(60%); }	
  100% { opacity:0; transform: translateX(100%); }	
}
@keyframes slide {
    0% { opacity:0; transform: translateX(-100%); }	
  20% { opacity:1; transform: translateX(-150%); }	
  80% { opacity:1; transform: translateX(60%); }	
  100% { opacity:0; transform: translateX(100%); }	
}
</style>