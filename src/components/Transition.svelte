<script>
	import { router } from 'tinro';
	import { fade } from 'svelte/transition';
</script>

{#key $router.path}
	<div in:fade={{ duration: 500 }}>
		<slot />
	</div>
{/key}
