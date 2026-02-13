<script lang="ts">
	import { getUser } from '$lib/remotes/auth.remote';
	import { Button } from '$lib/components/ui/button';
	import { resolve } from '$app/paths';

	const user = $derived(await getUser());
</script>

{user.name}
<Button href={resolve('/dashboard/properties')}>props</Button>
