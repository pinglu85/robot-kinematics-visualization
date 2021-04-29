<script lang="ts">
  import { jointInfosStore, selectedUpAxisStore } from '../../stores';
  import type { JointInfo } from '../../types';

  import Interface from '../Interface/index.svelte';
  import Scene from '../Scene/index.svelte';

  let jointInfos: JointInfo[] = [];
  jointInfosStore.subscribe((value: JointInfo[]): void => {
    jointInfos = value;
  });

  let selectedUpAxis = '';
  selectedUpAxisStore.subscribe((value: string): void => {
    selectedUpAxis = value;
  });
</script>

<Interface bind:jointInfos bind:selectedUpAxis />
<Scene bind:jointInfos {selectedUpAxis} />
