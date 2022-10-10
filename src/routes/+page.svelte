<script lang="ts">
	import { Dropdown, Input, Field, Image, Toast } from '$lib/components';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let bgOptions = data.backgrounds;
	let fileTypes = data.filetypes;
	let colors = data.colors;
	let logotypes = data.logoTypes;

	let background: string = bgOptions[3].value;
	let filetype: string = fileTypes[0].value;
	let logotype: string = logotypes[0].value;
	let logocolor: string = colors[0].value;
	let titlecolor: string = colors[1].value;
	let descriptioncolor: string = colors[1].value;
	let title: string = 'Hello World';
	let description: string = 'Just like everyone else';

	let loading: boolean = false;

	/**
	 * toast config
	 */
	let message: { type: 'error' | 'success' | string; content: string } = {
		type: '',
		content: ''
	};

	let showToast: boolean = false;

	const setToast = (type: string, content: string) => {
		message = {
			type: type,
			content: content
		};
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 3000);
	};

	/**
	 * add source to image url
	 */
	const hostname: string = $page.url.origin;

	$: imageSrc = `${hostname}/${encodeURIComponent(
		title
	)}.${filetype}?logoType=${logotype}&description=${encodeURIComponent(
		description
	)}&bg=${background}&logoColor=${logocolor}&titleColor=${titlecolor}&descriptionColor=${descriptioncolor}`;
</script>

<main>
	<section class="intro">
		<h1>Open Graph Image Generator</h1>
	</section>
	<section class="content">
		<div class="side">
			<Field label="File Type">
				<Dropdown
					options={fileTypes}
					bind:value={filetype}
					on:change={() => {
						loading = true;
					}}
				/>
			</Field>
			<Field label="Background Color">
				<Dropdown
					options={bgOptions}
					bind:value={background}
					on:change={() => {
						loading = true;
					}}
				/>
			</Field>
			<Field label="Logo Types">
				<Dropdown
					options={logotypes}
					bind:value={logotype}
					on:change={() => {
						loading = true;
					}}
				/>
			</Field>
			{#if logotype === 'true'}
				<Field label="Logotype Color">
					<Dropdown
						options={colors}
						bind:value={logocolor}
						on:change={() => {
							loading = true;
						}}
					/>
				</Field>
			{/if}
			<Field label="Title">
				<Input
					bind:value={title}
					placeholder="write your title"
					on:input={() => {
						loading = true;
					}}
				/>
			</Field>
			<Field label="Description">
				<Input
					bind:value={description}
					placeholder="write your description"
					on:input={() => {
						loading = true;
					}}
				/>
			</Field>
			<Field label="Title Color">
				<Dropdown
					options={colors}
					bind:value={titlecolor}
					on:change={() => {
						loading = true;
					}}
				/>
			</Field>
			<Field label="Description Color">
				<Dropdown
					options={colors}
					bind:value={descriptioncolor}
					on:change={() => {
						loading = true;
					}}
				/>
			</Field>
		</div>
		<div>
			<Image
				src={imageSrc}
				alt="source file for your og"
				{loading}
				on:load={() => {
					loading = false;
				}}
				on:copy={() => setToast('success', 'Success copy url to clipboard.')}
				on:error={() => setToast('error', 'Something wrong in your file.')}
			/>
		</div>
		{#if showToast}
			<Toast type={message.type} message={message.content} />
		{/if}
	</section>
	<section class="outro">
		<div class="wrapper">
			<h2>Untuk apa ini?</h2>
			<div>
				Ini dibuat untuk menghasilkan Open Graph Image secara dinamis. Url yang dihasilkan dapat
				diletakan di meta tags website kamu. Kamu dapat membuatnya dengan clone repo github <a
					href="https://github.com/rifkidhan/og-image-generator"
					rel="noopener noreferrer"
					target="_blank">disini</a
				>.
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
	main {
		@apply my-10 flex flex-col gap-10;
	}
	.intro {
		@apply container mx-auto flex flex-nowrap;
		& > h1 {
			@apply text-4xl font-bold text-red  md:text-7xl;
		}
	}
	.outro {
		@apply container mx-auto;
		& > .wrapper {
			@apply flex flex-col flex-nowrap gap-y-5 rounded-xl border-2 border-black bg-red p-5 text-white shadow-down-2;
			& > h2 {
				@apply text-2xl font-bold md:text-4xl;
			}
		}
	}
	.content {
		@apply container relative mx-auto grid grid-cols-1 gap-10  lg:grid-cols-2;
	}
	.side {
		@apply flex flex-col gap-y-5;
	}
	a:hover {
		@apply underline;
	}
</style>
