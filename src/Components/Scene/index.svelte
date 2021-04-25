<script lang="ts">
  import { onMount } from 'svelte';
  import type { JointInfo } from '../../types';
  import createScene, { rotateJoints, loadRobot } from './createScene';

  let canvasEl: HTMLCanvasElement;

  // Receive the props `jointInfos` from parent component
  export let jointInfos: JointInfo[];

  // Re-run `rotateJoints` on `jointInfos` change.
  // $: <statement> is reactive declaration.
  $: rotateJoints(jointInfos);

  onMount(() => {
    createScene(canvasEl);
  });

  function cancelEventDefaultBehaviors(evt: DragEvent): void {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function handleDropFile(evt: DragEvent): void {
    cancelEventDefaultBehaviors(evt);

    const { files } = evt.dataTransfer;
    const file = files[0];
    const regExp = /.urdf$/i;
    if (!regExp.test(file.name)) {
      alert('Please upload URDF file');
      return;
    }

    // Create a new object URL represents the file.
    const fileURL = URL.createObjectURL(file);
    loadRobot(fileURL);
  }
</script>

<!-- Bind the canvas to `canvasEl` on component mount -->
<canvas
  bind:this={canvasEl}
  on:dragenter={cancelEventDefaultBehaviors}
  on:dragover={cancelEventDefaultBehaviors}
  on:drop={handleDropFile}
/>
