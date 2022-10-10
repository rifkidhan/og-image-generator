<script lang="ts">
	export let label: string;
</script>

<div class="wrapper">
	<label>
		{label}
		<slot />
	</label>
</div>

<style lang="postcss">
	.wrapper {
		@apply rounded-xl border-2 border-black p-2;
	}
	label {
		@apply flex flex-col gap-y-1;
	}
</style>
