<script lang="ts">
	import {
		Body,
		Button,
		Container,
		Head,
		Heading,
		Html,
		Hr,
		Section,
		Text,Preview
	} from 'better-svelte-email';

	const { url }: { url: string } = $props();
</script>

<Html>
	<Head />
	<Body class="bg-background font-sans text-foreground">
		<Container class="mx-auto my-0 max-w-150 px-6 py-8">
			<Preview preview="Bun venit! - "/>
			<Section class="rounded-xl border bg-card p-6 shadow-xs">
				<Text class="text-xs tracking-widest text-muted-foreground uppercase">
					Facturent · Verificare cont
				</Text>
				<Heading class="mt-2 text-2xl font-semibold text-foreground" as="h3">
					Bun venit în Facturent! ✨
				</Heading>
				<Text class="mt-3 text-sm leading-6 text-muted-foreground">
					E aproape gata. Confirmă adresa de email și pornești la drum cu facturile tale organizate,
					rapide și fără bătăi de cap.
				</Text>

				<Section class="mt-6">
					<Button
						href={url}
						class="w-full cursor-pointer rounded-md bg-primary text-center text-sm font-medium text-primary-foreground shadow-xs p-2"
					>
						Confirmă contul
					</Button>
					<Text class="mt-3 text-xs text-muted-foreground">
						Dacă butonul nu funcționează, copiază și lipește acest link în browser:
					</Text>
					<Text class="text-xs break-all text-primary">{url}</Text>
				</Section>

				<Hr class="my-6 border-border" />

				<Text class="text-xs text-muted-foreground">
					Ai primit acest email pentru că cineva a încercat să creeze un cont în Facturent. Dacă nu
					ai fost tu, ignoră acest mesaj.
				</Text>
			</Section>
		</Container>
	</Body>
</Html>
