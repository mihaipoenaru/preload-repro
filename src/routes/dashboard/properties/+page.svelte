<script lang="ts">
    import {getAllProperties} from '$lib/remotes/property.remote';
    import {Button} from '$lib/components/ui/button';
    import {resolve} from '$app/paths';
</script>

{#each await getAllProperties() as property (property.id)}
	<Button href={resolve('/dashboard/properties/[propId]', { propId: property.uuid })}>
		{property.name}
	</Button>
{/each}