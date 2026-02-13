<script lang="ts">
	import {editProperty, getProperty} from '$lib/remotes/property.remote';
	import RForm from '$lib/components/custom/RForm.svelte';
	import RInput from '$lib/components/custom/RInput.svelte';
	import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from '$lib/components/ui/field/index';
	import {Separator} from '$lib/components/ui/separator';
	import {getAllInvoices} from '$lib/remotes/invoice.remote';
	import {Button} from '$lib/components/ui/button';
	import {resolve} from '$app/paths';
	import {page} from '$app/state';

	const property = $derived(await getProperty(page.params.propId!));
	const { name } = editProperty.fields;
</script>

<form class="mt-14 max-w-sm" reset={false}>
	<FieldGroup>
		<FieldSet>
			<FieldLegend>det</FieldLegend>
			<Field>
				<FieldLabel for="name">name</FieldLabel>
				<input {...name.as('text')} placeholder="new name" />
			</Field>
		</FieldSet>
	</FieldGroup>

</form>

<Separator class="mt-14" />

{#each await getAllInvoices() as invoice (invoice.id)}
	<Button
		variant="secondary"
		class="mt-14 capitalize"
		href={resolve('/dashboard/properties/[propId]/[invoiceId]', {
			invoiceId: invoice.uuid,
			propId: property.uuid
		})}
	>
		Hover and click here first
	</Button>
{/each}
