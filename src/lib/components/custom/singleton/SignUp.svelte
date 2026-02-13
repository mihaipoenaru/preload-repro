<script lang="ts">
	import { signUp } from '$lib/remotes/auth.remote';
	import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '$lib/components/ui/field';
	import RForm from '$lib/components/custom/RForm.svelte';
	import RSubmit from '$lib/components/custom/RSubmit.svelte';
	import { UserPlus } from '@lucide/svelte';
	import RInput from '$lib/components/custom/RInput.svelte';
	import ClipboardCopy from '$lib/components/custom/ClipboardCopy.svelte';
	import { dev } from '$app/environment';

	const { _password, email, _passConf } = signUp.fields;
</script>

<RForm remote={signUp} successMsg="Contul a fost creat!">
	<FieldSet>
		<FieldGroup>
			<Field>
				<FieldLabel for="email">Email</FieldLabel>
				<RInput placeholder="ion.popescu@email.com" {...email.as('email')} />
			</Field>
			<Field>
				<FieldLabel for="password">Parolă</FieldLabel>
				<FieldDescription
					>Minim 8 caractere, minim o majusculă, minusculă, cifră, și un caracter special
				</FieldDescription>
				<RInput {..._password.as('password')} placeholder="••••••••" />
			</Field>
			<Field>
				<FieldLabel for="password">Confirmă parola</FieldLabel>
				<RInput {..._passConf.as('password')} />
			</Field>
		</FieldGroup>
	</FieldSet>
	<div class="mt-7 flex justify-between">
		<RSubmit icon={UserPlus} class="">Creează cont</RSubmit>
		{#if dev}
			<ClipboardCopy content="aa11AA$$" />
		{/if}
	</div>
</RForm>
