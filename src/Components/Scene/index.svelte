<script lang="ts">
  import { onMount } from 'svelte';
  import createScene, { rotateJoints } from './createScene';

  let canvasEl: HTMLCanvasElement;

  // Receive the props `degrees` from parent component
  export let degrees: number[];

  // Re-run `rotateJoints` on `degrees` change.
  // $: <statement> is reactive declaration.
  $: rotateJoints(degrees);

  onMount(() => {
    createScene(canvasEl, degrees);
  });
</script>

<!-- Bind the canvas to `canvasEl` on component mount -->
<canvas bind:this={canvasEl} />
