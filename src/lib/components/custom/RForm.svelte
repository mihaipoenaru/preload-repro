<script lang="ts" module>
	import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit';
	import { createContext } from 'svelte';

	export const [getFormCtx, setFormCtx] =
		createContext<() => RemoteForm<RemoteFormInput, unknown>>();
</script>

<script lang="ts" generics="T extends RemoteFormInput | void">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { watch } from 'runed';
	import { toast } from 'svelte-sonner';
	import ClipboardCopy from '$lib/components/custom/ClipboardCopy.svelte';
	import type { RemoteFormFields } from '@sveltejs/kit';

	let {
		remote,
		children,
		class: _class,
		afterSubmit,
		initValue,
		successTitle,
		successMsg,
		reset = true
	}: {
		remote: RemoteForm<T, unknown>;
		children: Snippet;
		class?: ClassValue;
		afterSubmit?: () => void;
		initValue?: T | null;
		successMsg?: string;
		successTitle?: string;
		reset?: boolean;
	} = $props();

	watch(
		() => initValue,
		() => {
			if (initValue === undefined) return;
			(remote.fields as RemoteFormFields<object>)?.set(initValue ?? {});
		}
	);
	setFormCtx(() => remote as RemoteForm<RemoteFormInput, void>);
</script>

<form
	{...remote.enhance(async ({ submit, form }) => {
		try {
			await submit();
			if (remote.fields.allIssues()?.length ?? 0 > 0) return;
			if (reset) form.reset();
			if (successTitle) toast.success(successTitle, { description: successMsg });

			afterSubmit?.();
		} catch (e) {
			console.error(e);
			// @ts-expect-error we know it should work
			const errId = e?.body?.errorId;
			toast.error('Eroare de server', {
				description: `A apărut o eroare pe server. Încercați mai târziu. Dacă se repetă, contactați suportul și menționați id-ul erorii pe care îl puteți copia apăsând pe buton`,
				duration: 10000,
				action: ClipboardCopy,
				componentProps: { content: errId },
				closeButton: true
			});
		}
	})}
	class={_class}
>
	{@render children()}
</form>
