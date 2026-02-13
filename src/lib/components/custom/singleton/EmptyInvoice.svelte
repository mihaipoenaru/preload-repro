<script lang="ts">
	import {
		Empty,
		EmptyContent,
		EmptyDescription,
		EmptyHeader,
		EmptyMedia,
		EmptyTitle
	} from '$lib/components/ui/empty';
	import { Button } from '$lib/components/ui/button';
	import { FolderPlus, SquarePlus } from '@lucide/svelte';
	import Overlay from '$lib/components/custom/Overlay.svelte';
	import { Spinner } from '$lib/components/ui/spinner';
	import { Tooltip, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { TooltipContent } from '$lib/components/ui/tooltip/index.ts';

	const { onFilesDropped }: { onFilesDropped: (files: FileList | null) => Promise<void> } =
		$props();
	let fileInput: HTMLInputElement;
	let analyzing = $state(false);
	let isDragging = $state(false);
	let dragDepth = 0;

	async function onFileChange(e: Event) {
		await tryDroppedFiles((e.currentTarget as HTMLInputElement).files);
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();

		const dt = event.dataTransfer;
		if (!dt) return;
		isDragging = true;
		dragDepth++;
	}

	function onDragLeave() {
		dragDepth--;
		if (dragDepth === 0) isDragging = false;
	}

	async function onDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		dragDepth = 0;

		await tryDroppedFiles(event.dataTransfer?.files ?? null);
	}

	async function tryDroppedFiles(files: FileList | null): Promise<void> {
		analyzing = true;
		try {
			await onFilesDropped(files);
		} catch (e) {
			console.error(e);
		}
		analyzing = false;
	}
</script>

<Empty
	class={['relative w-sm border border-dashed border-muted-foreground']}
	ondragenter={onDragOver}
	ondragleave={onDragLeave}
	ondrop={onDrop}
	ondragover={(e) => e.preventDefault()}
>
	<EmptyHeader>
		<EmptyMedia variant="icon"><FolderPlus /></EmptyMedia>
		<EmptyTitle
			>Încarcă o factură de furnizor, <span>
				<Tooltip delayDuration={200}>
					<TooltipTrigger class="font-semibold underline"
						>sau întreținerea</TooltipTrigger
					>
					<TooltipContent side="right">
						<p>Platforme acceptate:</p>
						<ul class="list-disc p-2">
							<li>eBloc</li>
						</ul>
					</TooltipContent>
				</Tooltip>
			</span></EmptyTitle
		>
		<EmptyDescription
			>Atât furnizorul cât și totalul de plata vor fi identificate automat. În plus, vor putea fi
			atașate pagini relevante din facturile furnizorilor la factura ta finală trimisă la chiriaș</EmptyDescription
		>
	</EmptyHeader>
	<EmptyContent>
		<input type="file" value="test" bind:this={fileInput} hidden onchange={onFileChange} multiple />
		<Button variant="outline" size="sm" onclick={() => fileInput.click()}>Încarcă</Button>
		<p>Sau cu Drag & Drop direct în această căsuță</p>
	</EmptyContent>

	<Overlay visible={isDragging}>
		<SquarePlus class="mx-auto" />
	</Overlay>
	<Overlay visible={analyzing}>
		<Spinner class="mx-auto size-1/4" />
	</Overlay>
</Empty>
