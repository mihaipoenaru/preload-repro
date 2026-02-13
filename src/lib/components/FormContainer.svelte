<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="mx-auto mt-14 max-w-fit p-3">
	{@render children()}
</div>
