<script lang="ts">
  import { numOfRobotJoints } from '../../stores';
  import Interface from '../Interface/index.svelte';
  import Scene from '../Scene/index.svelte';

  let degrees: number[] = [];

  numOfRobotJoints.subscribe((value: number): void => {
    degrees = Array.from(Array(value), () => Math.floor(Math.random() * 90));
  });
</script>

<Interface bind:degrees />
<Scene bind:degrees />
