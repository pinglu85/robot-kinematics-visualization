<script lang="ts">
  import * as axes from '../../../constants/axes';

  const options = Object.keys(axes).map((axisName): string => axes[axisName]);

  export let selectedUpAxis: string;
</script>

<label>
  Up Axis
  <select bind:value={selectedUpAxis}>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
  }
</style>
