<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, visible = false }: { children: Snippet; visible: boolean } = $props();
</script>

{#if visible}
	<div
		class="pointer-events-none absolute start-0 top-0 size-full place-content-center rounded-md bg-secondary"
	>
		{@render children()}
	</div>
{/if}
