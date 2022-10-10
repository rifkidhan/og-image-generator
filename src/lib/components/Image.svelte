<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let src: string;
	export let alt: string;
	export let loading: boolean;

	const dispatch = createEventDispatcher();

	function copy() {
		navigator.clipboard.writeText(src).then(() => dispatch('copy', src));
	}
</script>

<div on:click={copy} class="wrapper" title="copy to clipboard">
	<img {src} {alt} on:load on:error class:loading width="100%" height="100%" />
</div>

<style lang="postcss">
	.wrapper {
		@apply relative w-full cursor-pointer overflow-hidden rounded-xl border-2 border-black transition-all duration-200 ease-out;
	}
	.wrapper:hover {
		@apply -translate-y-1 shadow-down-2;
	}
	.loading {
		@apply blur-md;
	}
</style>
