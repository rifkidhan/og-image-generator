<script lang="ts">
	import '../style.css';
	import { Header, Footer } from '$lib/components';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Open Graph Image Generator| Rifkidhan</title>
	<meta
		name="description"
		content="Generator untuk menghasilkan Openg Graph Image secara dinamis. Dibangun oleh Rifki Ramadhan."
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@rifkidhan" />
	<meta property="og:site_name" content="Open Graph Image Generator| Rifkidhan" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Open Graph Image Generator| Rifkidhan" />
	<meta property="og:locale" content="en" />
	<meta property="og:url" content={$page.url.origin} />
	<link rel="canonical" href={$page.url.origin} />

	<meta
		property="og:description"
		content="Generator untuk menghasilkan Openg Graph Image secara dinamis. Dibangun oleh Rifki Ramadhan."
	/>
	<meta
		property="og:image"
		content="{$page.url
			.origin}/Open%20Graph%20Image%20Generator.png?logoType=true&description=From%20Rifkidhan&bg=green&logoColor=black&titleColor=white&descriptionColor=white"
	/>
</svelte:head>

<Header />
<slot />
<Footer />
