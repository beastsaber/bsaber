<script lang="ts">
  const dropdownItems: {
    name: string
  }[] = [
    {
      name: 'Maps',
    },
    {
      name: 'Placeholder1',
    },
    {
      name: 'Placeholder2',
    },
  ]

  let selectedItem: string = dropdownItems[0].name
  let dropdownShown: boolean = false
</script>

<form action="">
  <div class="row">
    <div class="searchForm">
      <button
        class="filter-dropdown btn btn-primary dropdown-toggle"
        on:click={() => (dropdownShown = !dropdownShown)}
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-angle-up" />
        <span class="d-none d-lg-inline">{selectedItem}</span>
      </button>
      <div class="dropdown-menu {dropdownShown ? 'show' : ''}" aria-labelledby="dropdownMenuButton">
        {#each dropdownItems as item}
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="dropdown-item" href="" on:click={() => (selectedItem = item.name)}
            >{item.name}</a
          >
        {/each}
      </div>
      <input type="text" class="form-control" placeholder="Enter Keywords" />
      <button type="submit" class="btn btn-primary">Search</button>
    </div>
  </div>
</form>

<style>
  form {
    display: grid;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }
  .searchForm {
    position: relative;
    display: grid;
    grid-template-columns: 0.3fr 6fr 0.3fr;
    align-items: center;
    justify-content: center;
  }
  .filter-dropdown {
    max-width: fit-content;
    background: none;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 0.25rem 0 0 0.25rem !important;
    text-align: left;
  }
  .dropdown-toggle {
    white-space: nowrap;
  }
  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
  .dropdown-menu {
    position: absolute;
    top: 2rem;
    z-index: 1000;
    display: none;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
  }
  .dropdown-menu.show {
    display: block;
  }
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }
  .form-control {
    display: block;
    width: 1fr;
    float: left;
    padding: 0.375rem 0.75rem;
    margin-right: 0.25rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #303030;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #222;
    appearance: none;
    border-radius: 0 0.25rem 0.25rem 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  button,
  input {
    overflow: visible;
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn-primary {
    color: #fff;
    background-color: #375a7f;
    border-color: #375a7f;
    margin-left: 0.25rem;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
</style>
