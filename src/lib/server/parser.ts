import type { ParsedRequest } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export const parseRequest = (req: RequestEvent) => {
	const url = req.url;
	const pathname = req.params.title;
	const logoType = url.searchParams.get('logoType');
	const description = url.searchParams.get('description') || '';
	const bg = url.searchParams.get('bg') || '';
	const logoColor = url.searchParams.get('logoColor') || '';
	const titleColor = url.searchParams.get('titleColor') || '';
	const descriptionColor = url.searchParams.get('descriptionColor') || '';

	const arr = (pathname || '/').split('.');

	let extension = '';
	let title = '';
	if (arr.length === 0) {
		title = '';
	} else if (arr.length === 1) {
		title = arr[0];
	} else {
		extension = arr.pop() as string;
		title = arr.join('.');
	}

	const parsedRequest: ParsedRequest = {
		fileType: extension === 'jpeg' ? extension : 'png',
		logoType: logoType || 'true',
		title: decodeURIComponent(title),
		description: decodeURIComponent(description) || '',
		bg: bg || 'white',
		logoColor: logoColor || 'black',
		titleColor: titleColor || 'black',
		descriptionColor: descriptionColor || 'black'
	};
	return parsedRequest;
};
