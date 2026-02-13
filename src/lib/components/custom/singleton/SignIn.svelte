<script lang="ts">
	import { Field, FieldGroup, FieldLabel, FieldSet } from '$lib/components/ui/field';
	import ClipboardCopy from '$lib/components/custom/ClipboardCopy.svelte';
	import { dev } from '$app/environment';
	import { Input } from '$lib/components/ui/input';
	import { FieldError } from '$lib/components/ui/field/index';
	import AsyncButton from '$lib/components/custom/AsyncButton.svelte';
	import { authClient } from '$lib/security/auth-client';
	import { resolve } from '$app/paths';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let badCredentials = $state(false);
	let submitting = $state(false);
	let email = $state('');
	let password = $state('');

	function onEnter(e: KeyboardEvent) {
		if (e.key === 'Enter') login();
	}

	async function login() {
		submitting = true;
		const { error } = await authClient.signIn.email({
			email,
			password,
			callbackURL: resolve('/dashboard')
		});

		submitting = false;
		if (!error) return;
		if (error.status >= 500) {
			badCredentials = false;
			toast.error('Eroare de server, încercați mai târziu');
			return;
		}

		if (error.code === 'EMAIL_NOT_VERIFIED') {
			await authClient.sendVerificationEmail({ email, callbackURL: `${resolve('/login')}` });
			await goto(resolve('/login/verification'));
			return;
		}

		badCredentials = true;
		console.log(error);
	}
</script>

<FieldSet>
	<FieldGroup>
		<Field>
			<FieldLabel for="email">Email</FieldLabel>
			<Input placeholder="ion.popescu@email.com" type="email" name="email" onkeypress={onEnter} bind:value={email} />
		</Field>
		<Field>
			<FieldLabel for="password">Parolă</FieldLabel>
			<Input type="password" placeholder="••••••••" name="password" onkeypress={onEnter} bind:value={password} />
		</Field>
	</FieldGroup>
</FieldSet>

{#if badCredentials}
	<FieldError>User sau parolă incorecte</FieldError>
{/if}

<div class="mt-7 flex justify-between">
	<AsyncButton {submitting} onclick={login}>Intră în cont</AsyncButton>
	{#if dev}
		<ClipboardCopy content="aa11AA$$" />
	{/if}
</div>
