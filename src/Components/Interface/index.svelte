<script lang="ts">
  import type { JointInfo } from '../../types';

  import UpAxisDropdown from './UpAxisDropdown.svelte';
  import JointControls from './JointControls.svelte';

  export let jointInfos: JointInfo[];
  export let selectedUpAxis: string;
</script>

<div>
  <UpAxisDropdown bind:selectedUpAxis />
  <JointControls bind:jointInfos />
</div>

<!-- 
  Styles are scoped to a component only if they are
  defined within a Svelte file.
-->
<style>
  div {
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
    height: 100vh;
    padding: 1rem;
    background-color: #fff;
    z-index: 20;
  }
</style>
