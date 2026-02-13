<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/ui/button';
	import { Spinner } from '$lib/components/ui/spinner';
	import { Check, X } from '@jis3r/icons';
	import { watch } from 'runed';

	const {
		submitting,
		disabled,
		success,
		children,
		class: _class,
		...buttonProps
	}: ButtonProps & { submitting: boolean; success?: boolean } = $props();

	let tid: Timer;
	let keepIcon = $state(true);

	watch(
		() => submitting,
		() => {
			if (submitting) {
				keepIcon = true;
				clearInterval(tid);
			}
		}
	);

	watch(
		() => success,
		() => {
			tid = setInterval(() => (keepIcon = false), 2000);
		}
	);
</script>

<Button disabled={disabled || submitting} class={[_class, 'relative mr-4']} {...buttonProps}>
	{@render children?.()}
	<div class="absolute top-0 -right-5 flex h-full w-4 items-center justify-center text-primary">
		{#if submitting}
			<Spinner />
		{:else if keepIcon}
			{#if success === true}
				<Check animate />
			{:else if success === false}
				<X animate />
			{/if}
		{/if}
	</div>
</Button>
