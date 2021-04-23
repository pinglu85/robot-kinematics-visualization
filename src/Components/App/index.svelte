<script lang="ts">
  import Interface from '../Interface/index.svelte';
  import Scene from '../Scene/index.svelte';

  let degrees: number[] = Array.from(Array(6), () =>
    Math.floor(Math.random() * 90)
  );
</script>

<Interface bind:degrees />
<Scene bind:degrees />
