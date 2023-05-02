<script lang="ts">
    export let name:string;
</script>

<li class="location">
    <div>{name}</div>
    <form
        method="post"
        action="?/deleteLocation"
    >
        <div class="submit-form">
            <input name="locationName" type="hidden" value={name}>
        </div>

        <div class="submit-form">
            <input 
                type="submit"
                value={"-> Entfernen"}
            />
        </div>
 
    </form>
</li>

<style>
    .location{
        padding: 4px;
        margin: 2px;
        border: 1px solid black;
    }
</style>