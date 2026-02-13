<script lang="ts">
	import { type ButtonProps } from '$lib/components/ui/button';
	import type { Component } from 'svelte';
	import { getFormCtx } from '$lib/components/custom/RForm.svelte';
	import AsyncButton from '$lib/components/custom/AsyncButton.svelte';
	import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit';

	const {
		icon: Icon,
		children,
		variant,
		...others
	}: Omit<ButtonProps, 'type'> & { icon?: Component } = $props();

	const getRemote = getFormCtx();

	if (!getRemote) throw new Error('Element can only be used inside a <RForm>');

	const submitting = $derived(getRemote().pending > 0);
	const remoteFn = $derived(
		getRemote() as RemoteForm<RemoteFormInput, { success?: boolean } | undefined>
	);
	const success = $derived(remoteFn.result?.success);
</script>

<AsyncButton
	{...others}
	type="submit"
	variant={variant ?? (!children && Icon ? 'outline' : undefined)}
	{submitting}
	{success}
>
	{#if Icon}
		<Icon />
	{/if}
	{#if children}
		{@render children()}
	{:else if !Icon}
		Salvează
	{/if}
</AsyncButton>
