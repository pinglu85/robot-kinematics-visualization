<script>
  import { onMount } from 'svelte';
  import createScene from './scene';

  let canvasEl;

  onMount(() => {
    createScene(canvasEl);
  });
</script>

<!-- Bind the canvas to `canvasEl` on component mount -->
<canvas bind:this={canvasEl} />
