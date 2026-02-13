<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeSelector from '$lib/components/custom/ThemeSelector.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Spinner } from '$lib/components/ui/spinner';
	import { TooltipProvider } from '$lib/components/ui/tooltip';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<ThemeSelector />
<Toaster position="bottom-center" />

<svelte:boundary>
	<TooltipProvider>
		{@render children()}
	</TooltipProvider>
	{#snippet pending()}
		<Spinner />
	{/snippet}
	{#snippet failed(err)}
		<h1>Oopsie poopsie {err.body.message}</h1>
	{/snippet}
</svelte:boundary>
