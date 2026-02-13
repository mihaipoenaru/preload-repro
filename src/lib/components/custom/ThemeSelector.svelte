<script lang="ts">
	import { setMode, userPrefersMode, mode } from 'mode-watcher';
	import { Monitor, MoonIcon, SunIcon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { slide } from 'svelte/transition';

	const currentMode = $derived(userPrefersMode.current);
	let hovered = $state(false);
</script>

<div
	class="fixed right-2 bottom-2 flex"
	role="group"
	aria-label="Theme selector"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
>
	{#if hovered}
		<div class="flex" transition:slide={{ axis: 'x' }}>
			<Button
				onclick={() => setMode('light')}
				variant="outline"
				aria-label="Light mode"
				aria-pressed={currentMode === 'light'}
				class={['rounded-e-none', 'border-e-0', currentMode === 'light' && 'text-popout']}
			>
				<SunIcon />
			</Button>
			<Button
				onclick={() => setMode('system')}
				variant="outline"
				aria-label="System mode"
				aria-pressed={currentMode === 'system'}
				class={[
					'rounded-s-none',
					'rounded-e-none',
					'border-s-0',
					'border-e-0',
					currentMode === 'system' && 'text-popout'
				]}
			>
				<Monitor />
			</Button>
			<Button
				onclick={() => setMode('dark')}
				variant="outline"
				aria-label="Dark mode"
				aria-pressed={currentMode === 'dark'}
				class={['rounded-s-none', 'border-s-0', currentMode === 'dark' && 'text-popout']}
				><MoonIcon /></Button
			>
		</div>
	{:else}
		<div transition:slide={{ axis: 'x' }}>
			<Button onclick={() => setMode('dark')} variant="outline" class="text-popout">
				{#if mode.current === 'dark'}
					<MoonIcon />
				{:else}
					<SunIcon />
				{/if}
			</Button>
		</div>
	{/if}
</div>
