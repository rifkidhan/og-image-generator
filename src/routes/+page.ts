import type { PageLoad } from './$types';
import type { DropdownOption } from '$lib/types';

/**
 * add data to page
 */
export const load: PageLoad = () => {
	const filetypes: DropdownOption[] = [
		{ value: 'png', text: 'PNG' },
		{ value: 'jpeg', text: 'JPEG' }
	];

	const logoTypes: DropdownOption[] = [
		{ value: 'true', text: 'True' },
		{ value: 'false', text: 'False' }
	];

	const backgrounds: DropdownOption[] = [
		{ value: 'white', text: 'White' },
		{ value: 'red', text: 'Red' },
		{ value: 'blue', text: 'Blue' },
		{ value: 'green', text: 'Green' },
		{ value: 'yellow', text: 'Yellow' }
	];

	const colors: DropdownOption[] = [
		{ value: 'black', text: 'Black' },
		{ value: 'white', text: 'White' }
	];

	return {
		filetypes,
		backgrounds,
		colors,
		logoTypes
	};
};
