<script lang="ts">
  import { onMount } from 'svelte';
  import type { JointInfo } from '../../types';
  import createScene, { rotateJoints } from './createScene';

  let canvasEl: HTMLCanvasElement;

  // Receive the props `jointInfos` from parent component
  export let jointInfos: JointInfo[];

  // Re-run `rotateJoints` on `jointInfos` change.
  // $: <statement> is reactive declaration.
  $: rotateJoints(jointInfos);

  onMount(() => {
    createScene(canvasEl);
  });
</script>

<!-- Bind the canvas to `canvasEl` on component mount -->
<canvas bind:this={canvasEl} />
