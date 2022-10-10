<script lang="ts">
	import type { DropdownOption } from '$lib/types';
	import Icons from './Icons.svelte';

	export let options: DropdownOption[];
	export let value: string;
</script>

<div class="wrapper">
	<select bind:value placeholder="test" on:change>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
	<div class="arrow">
		<Icons name="chevron-bottom" />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply relative inline-flex h-10 w-auto min-w-full select-none appearance-none flex-row items-center overflow-hidden whitespace-nowrap rounded-xl border-2 border-black px-3 py-2 leading-none outline-none;
	}
	select {
		@apply -mr-20 h-full w-full border-none bg-transparent bg-none normal-case shadow-none focus-visible:outline-none;
	}
	option {
		@apply border-none bg-transparent bg-none;
	}
	.arrow {
		@apply pointer-events-none absolute right-0 flex h-full items-center justify-center bg-yellow;
	}
</style>
