<script lang="ts">
  import './style.css';

  export let degrees: number[];
</script>

<div>
  {#each degrees as degree, idx}
    <label>
      Joint {idx}:
      <input bind:value={degree} type="text" />
      <input bind:value={degree} type="range" min="0" max="90" />
    </label>
  {/each}
</div>
