<script lang="ts">
	import {editInvoice, getInvoice} from '$lib/remotes/invoice.remote';
	import Heading from '$lib/components/custom/tags/Heading.svelte';
	import {page} from '$app/state';
	import RForm from '$lib/components/custom/RForm.svelte';
	import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet} from '$lib/components/ui/field';
	import RInput from '$lib/components/custom/RInput.svelte';
	import {generateInvoiceId} from '$lib/invoice-utils';
	import EmptyInvoice from '$lib/components/custom/singleton/EmptyInvoice.svelte';

	const invoice = $derived(await getInvoice(page.params.invoiceId!));
	const { electricity, gas, maintenance, telco } = editInvoice.fields;




</script>

<Heading variant="h2">
	The invoice! {invoice.billedDate.toISODate()}
</Heading>

<RForm remote={editInvoice}  class="max-w-md rounded border p-2">
	<FieldSet>
		<FieldGroup class="grid grid-cols-4 items-end gap-2">
			<Field>
				<RInput {...electricity.as('number')}></RInput>
			</Field>
			<Field>
				<RInput {...gas.as('number')}></RInput>
			</Field>
			<Field>
				<RInput {...telco.as('number')}></RInput>
			</Field>
			<Field>
				<RInput {...maintenance.as('number')}></RInput>
			</Field>
		</FieldGroup>
	</FieldSet>
</RForm>
