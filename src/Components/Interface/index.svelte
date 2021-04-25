<script lang="ts">
  import type { JointInfo } from '../../types';

  import './style.css';

  export let jointInfos: JointInfo[];
</script>

<div>
  {#each jointInfos as jointInfo, idx}
    <label>
      Joint {idx}:
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
