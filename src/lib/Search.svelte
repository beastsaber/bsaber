<script>

</script>

<form action="">
    <div class="row">
        <div class="searchForm">
            <button class="filter-dropdown btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-angle-up"></i>
                <span class="d-none d-lg-inline">Maps</span>
            </button>
            <input type="text" class="form-control" placeholder="Enter Keywords">
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
        display: grid;
        grid-template-columns: .3fr 6fr .3fr;
        align-items: center;
        justify-content: center;
    }
    .filter-dropdown {
        max-width: fit-content;
        background: none;
        color: #fff;
        border: 2px solid #fff;
        border-radius: .25rem 0 0 .25rem !important;
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
    .form-control {
        display: block;
        width: 1fr;
        float: left;
        padding: .375rem .75rem;
        margin-right: .25rem;
        font-size: 0.9375rem;
        font-weight: 400;
        line-height: 1.5;
        color: #303030;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #222;
        appearance: none;
        border-radius: 0 .25rem .25rem 0;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
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
        padding: .375rem .75rem;
        font-size: 0.9375rem;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    .btn-primary {
        color: #fff;
        background-color: #375a7f;
        border-color: #375a7f;
        margin-left: .25rem;
    }
</style>