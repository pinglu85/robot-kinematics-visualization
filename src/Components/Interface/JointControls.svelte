<script lang="ts">
  import type { JointInfo } from '../../types';

  export let jointInfos: JointInfo[];
</script>

<div>
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

<style>
  div {
    height: 100%;
    overflow-y: auto;
  }

  label {
    display: block;
  }
</style>
