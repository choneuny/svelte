<script>
  import { onMount } from "svelte";
  export let dialog;
  export let isopen;
  const dialogLen = dialog.length;
  const typeSpeed = 20;
  let done = true;
  let dialogQueue = -1;
  let part = "";
  let cursor = 0;
  let typeDialog;
  if (dialogLen === 0) {
    isopen = false;
  }

  const type = (text) => {
      if ((cursor >= text?.length) || done) {
        done = true;
        cursor = text?.length;
        part = text?.substring(0, cursor);
        clearInterval(typeDialog)
      } else {
        cursor++;
        if (text?.substring !== undefined) {
          part = text?.substring(0, cursor);
          console.log(part)
        } else {
          clearInterval(typeDialog)
        }
      }
  }

  const nextDialog = () => {
    if(dialogQueue>=dialogLen || (dialogQueue>=dialogLen-1 && done)) {
      console.log(dialogQueue)
      console.log(dialogLen)
      dialogQueue++;
      isopen = false;
    } else {
      console.log(done);
      if(done && isopen) {
        dialogQueue++;
        cursor = 0;
        done = false;
        typeDialog = setInterval(() => type(dialog[dialogQueue]?.text), typeSpeed);
      } else {
        done = true
      }
    } 
  };
  
  onMount(async () => {
    dialogQueue++;
    cursor = 0;
    done = false;
    typeDialog = setInterval(() => type(dialog[dialogQueue]?.text), typeSpeed);
	});

</script>

<div class="overlay {isopen? "":"fadeout"}" on:click={nextDialog}>
  <div class="dialog" >
    <h2>{part}</h2>
    <img class="next blink {done? "":"hidden"}" src="./img/icon/downward-nobg.png" alt="error">
  </div>
</div>

<style>
  .overlay {
    position: absolute;
    width: inherit;
    height: inherit;
    top: 0;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(3px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .dialog {
    color: white;
    position: fixed;
    font: 1em caption;
    width: inherit;
    top: 70%;
    height: 30%;
    width: 100%;
    padding: 2em;
    box-sizing: border-box;
    overflow:hidden;          
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3);
    z-index: 999;
  }
  </style>