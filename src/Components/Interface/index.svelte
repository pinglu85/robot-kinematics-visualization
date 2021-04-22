<script>
  import './style.css';

  export let degree;
</script>

<div>
  <label>
    Degree:
    <input bind:value={degree} type="text" />
    <input bind:value={degree} type="range" min="0" max="90" />
  </label>
</div>
