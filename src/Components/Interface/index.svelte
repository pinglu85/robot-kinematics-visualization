<script lang="ts">
  import type { JointInfo } from '../../types';

  import UpAxisDropdown from './UpAxisDropdown/index.svelte';

  import './style.css';

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
