<script lang="ts">
	import Logo from './Logo.svelte';
</script>

<header>
	<div class="wrapper">
		<a
			href="https://rifkidhan.my.id"
			class="logo"
			rel="noopener noreferrer"
			target="_blank"
			title="Rifkidhan website"
		>
			<Logo type="logomark" />
			<Logo type="logotype" />
		</a>
	</div>
</header>

<style lang="postcss">
	header {
		@apply relative z-50 h-16 w-full border-b-2 bg-white py-3;
	}
	.wrapper {
		@apply container mx-auto h-full;
	}
	.logo {
		@apply flex h-full flex-row items-center gap-x-3;
	}
</style>
