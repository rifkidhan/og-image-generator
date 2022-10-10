import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { getSvg } from '$lib/server/template';
import { parseRequest } from '$lib/server/parser';

export const GET: RequestHandler = async (event) => {
	const parsedReq = parseRequest(event);
	const { fileType } = parsedReq;
	const svg = getSvg(parsedReq);
	const buffer = Buffer.from(svg);
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
