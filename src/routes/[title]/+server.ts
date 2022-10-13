import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { parseRequest } from '$lib/server/parser';
import { svgTemplate } from '$lib/server/svg';

export const GET: RequestHandler = async (event) => {
	const parsedReq = parseRequest(event);
	const { fileType } = parsedReq;
	const temp = await svgTemplate(parsedReq);
	if (!temp) {
		throw error(500, 'something error in source file');
	}
	const buffer = Buffer.from(temp);
	const image = await sharp(buffer).toFormat(fileType).toBuffer();

	if (!image) {
		throw error(500, 'something error in source file');
	}

	return new Response(image, {
		headers: {
			'Content-Type': `image/${fileType}`,
			'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
		}
	});
};
