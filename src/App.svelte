<script>
  import Nav from "./Nav.svelte";
  import Header from "./Header.svelte";
  import EmbededGame from "./EmbededGame.svelte";
  import Outline from "./Outline.svelte";
  import Comment from "./Comment.svelte";
  import Footer from "./Footer.svelte";
  let size = screen.width;
  size = size;
</script>

<div id="wrapper" style="--size:{size}">
<div id="inner">
  <Nav />
  <Header/>
  <EmbededGame />
  <Outline />
  <Comment />
  <Footer />
</div>
</div>

<style>
  #wrapper {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background: radial-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5) ), url("./assets/background/brickwall.webp");
    z-index: -1;
  }
  #inner {
    width: calc(--size * 0.8px );
    height: inherit;
    background: #404040;
    padding: 0;
  }
</style>
