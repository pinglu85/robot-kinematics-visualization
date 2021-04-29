<script lang="ts">
  import type { JointInfo } from '../../types';

  import UpAxisDropdown from './UpAxisDropdown/index.svelte';

  export let jointInfos: JointInfo[];
  export let selectedUpAxis: string;
</script>

<div>
  <UpAxisDropdown bind:selectedUpAxis />
  {#each jointInfos as jointInfo, idx}
    <label>
      {jointInfo.name || `Joint ${idx}`}
      <input bind:value={jointInfo.degree} type="text" />
      <input
        bind:value={jointInfo.degree}
        type="range"
        min={jointInfo.lower}
        max={jointInfo.upper}
      />
    </label>
  {/each}
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
    overflow-y: auto;
    background-color: #fff;
    z-index: 20;
  }

  label {
    display: block;
  }
</style>
