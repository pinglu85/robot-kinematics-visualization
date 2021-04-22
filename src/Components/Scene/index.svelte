<script>
  import { onMount } from 'svelte';
  import createScene, { bendRobot } from './createScene';

  let canvasEl;

  // Receive the props degree from parent component
  export let degree;

  // Rerun `bendRobot` on `degree` change.
  // $: <statement> is reactive declaration.
  $: bendRobot(degree);

  onMount(() => {
    createScene(canvasEl, degree);
  });
</script>

<!-- Bind the canvas to `canvasEl` on component mount -->
<canvas bind:this={canvasEl} />
