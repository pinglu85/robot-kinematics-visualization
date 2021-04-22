<script lang="ts">
  import Interface from '../Interface/index.svelte';
  import Scene from '../Scene/index.svelte';

  let degree = Math.floor(Math.random() * 90);
</script>

<Interface bind:degree />
<Scene bind:degree />
