<script>
  import { next_round } from "../data/stores.js";
  setTimeout(() => {
      next_round();
    }, 3000);
</script>

<img src="./img/background/Sunset.gif" alt="RoundClear" >

<style>
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
</style>
    