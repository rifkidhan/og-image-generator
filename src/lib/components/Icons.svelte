<script lang="ts">
	export let name: string;
	let className: string = 'stroke-black';

	export { className as class };
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="w-full h-full stroke-[1.5] {className}"
>
	{#if name === 'pencil'}
		<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
		<line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
	{:else if name === 'chevron-bottom'}
		<polyline points="6 9 12 15 18 9" />
	{:else if name === 'chevron-right'}
		<polyline points="9 6 15 12 9 18" />
	{:else if name === 'check'}
		<path d="M5 12l5 5l10 -10" />
	{:else if name === 'cross'}
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	{/if}
</svg>
