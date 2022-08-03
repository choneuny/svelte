<div id="arrowAnim">
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

<style>
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
    width: 1vw;
    height: 1vw;
    border: 0.5vw solid;
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