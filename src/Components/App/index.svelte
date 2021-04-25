<script lang="ts">
  import { jointInfosStore } from '../../stores';
  import type { JointInfo } from '../../types';
  import Interface from '../Interface/index.svelte';
  import Scene from '../Scene/index.svelte';

  let jointInfos: JointInfo[] = [];

  jointInfosStore.subscribe((value: JointInfo[]): void => {
    jointInfos = value;
  });
</script>

<Interface bind:jointInfos />
<Scene bind:jointInfos />
