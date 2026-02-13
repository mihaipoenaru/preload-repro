<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Copy, CopyCheck } from '@lucide/svelte';

	const {
		content,
		showText = false,
		text
	}: { content: string; showText?: boolean; text?: string } = $props();

	let copied = $state(false);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(content);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<Button
	variant={copied ? 'default' : 'outline'}
	size={text || showText ? 'default' : 'icon'}
	onclick={copyToClipboard}
>
	{#if copied}
		<CopyCheck />
	{:else}
		<Copy />
	{/if}
	{#if showText || !!text}
		{copied ? 'Copiat!' : (text ?? 'Copiază')}
	{/if}
</Button>
