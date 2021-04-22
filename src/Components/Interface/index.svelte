<script lang="ts">
  // @ts-check
  import './style.css';

  export let degree: number;
</script>

<div>
  <label>
    Degree:
    <input bind:value={degree} type="text" />
    <input bind:value={degree} type="range" min="0" max="90" />
  </label>
</div>
