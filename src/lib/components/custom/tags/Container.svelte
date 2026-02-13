<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="mx-auto max-w-xs lg:max-w-6xl">
	{@render children()}
</div>
