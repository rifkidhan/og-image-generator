<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import Icons from './Icons.svelte';
	export let message: string;
	export let type: 'success' | 'error' | string;

	const transition = {
		duration: 300,
		easing: quintOut
	};
</script>

<div class="wrapper" transition:slide={transition}>
	{#if type === 'success'}
		<div class="success">
			<Icons name="check" class="stroke-white" />
		</div>
	{:else}
		<div class="error">
			<Icons name="cross" class="stroke-white" />
		</div>
	{/if}
	<div>
		{message}
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply fixed right-5 bottom-5 inline-flex h-12 w-auto max-w-2xl flex-row items-center justify-center gap-x-3 rounded-lg bg-black py-3 px-4 text-white;
	}
	.success {
		@apply flex h-full items-center justify-center rounded-full bg-green;
	}
	.error {
		@apply flex h-full items-center justify-center rounded-full bg-red;
	}
</style>
