<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const {
		class: _class,
		children,
		variant,
		...others
	}: HTMLAttributes<HTMLHeadingElement> & { variant: 'h1' | 'h2' | 'h3' | 'h4' } = $props();
</script>

<h1
	class={[
		variant === 'h1' && 'text-5xl sm:text-9xl',
		variant === 'h2' && 'text-3xl sm:text-6xl',
		variant === 'h3' && 'text-2xl sm:text-4xl',
		variant === 'h4' && 'text-lg sm:text-2xl',
		_class
	]}
	{...others}
>
	{@render children?.()}
</h1>
