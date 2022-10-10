<script lang="ts">
	import Icons from './Icons.svelte';
	export let value: string;
	export let placeholder: string | undefined;
</script>

<div class="wrapper">
	<input
		type="text"
		{placeholder}
		bind:value
		on:input
		autocomplete="false"
		autocorrect="false"
		spellcheck="false"
	/>
	<div class="icons">
		<Icons name="pencil" />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply relative inline-flex w-auto min-w-full flex-row items-center rounded-xl border-2 border-black bg-white px-3 py-2 leading-none;
	}
	input {
		@apply w-full appearance-none bg-white;
	}
	.icons {
		@apply relative h-8;
	}
	.wrapper:focus-within,
	input:focus {
		@apply outline-none;
	}
</style>
