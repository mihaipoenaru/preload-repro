<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import type { InputProps } from '$lib/components/ui/input/input.svelte';
	import { getFormCtx } from '$lib/components/custom/RForm.svelte';
	import { FieldError } from '$lib/components/ui/field/index';
	import { err } from '$lib/errors/error-tags';
	import type { RemoteFormIssue } from '@sveltejs/kit';

	let { value = $bindable(), ...others }: InputProps = $props();

	const remoteFn = getFormCtx();

	const firstIssue: RemoteFormIssue | undefined = $derived(
		//@ts-expect-error keyof is valid
		remoteFn().fields[others.name].issues()?.at(0)
	);
</script>

<Input {...others} bind:value />
{#if firstIssue}
	<FieldError>{err(firstIssue.message)}</FieldError>
{/if}
