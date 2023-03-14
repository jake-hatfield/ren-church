// packages
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

// components
import OpenGraphImage from '@components/seo/OpenGraphImage';

// lib
import { handleApiError } from '@utils/api';
import IBMPlexMono from '$lib/fonts/IBMPlexMono-Bold.ttf';
import IBMPlexSans from '$lib/fonts/IBMPlexSans-SemiBold.ttf';
import PermanentMarker from '$lib/fonts/PermanentMarker-Regular.ttf';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const description = url.searchParams.get('description');
		// square, rect, or rectAlt
		let format = url.searchParams.get('format');
		// type of content on the site, (e.g. "blog", "doc", etc.)
		const kind = url.searchParams.get('kind');
		const title = url.searchParams.get('title');

		if (!format) format = 'square';

		let width = 600;
		let height = 600;

		if (format === 'rect') {
			width = 1200;
			height = 630;
		} else if (format === 'rectAlt') {
			width = 1200;
			height = 600;
		}

		const result = OpenGraphImage.render({ description, format, kind, title });
		const element = html(result.html);

		const svg = await satori(element, {
			fonts: [
				{ name: 'IBM Plex Mono', data: Buffer.from(IBMPlexMono) },
				{ name: 'IBM Plex Sans', data: Buffer.from(IBMPlexSans) },
				{ name: 'Permanent Marker', data: Buffer.from(PermanentMarker) },
			],
			width,
			height,
		});

		const resvg = new Resvg(svg, {
			fitTo: {
				mode: 'width',
				value: width,
			},
		});

		const image = resvg.render();

		return new Response(image.asPng(), {
			headers: {
				'content-type': 'image/png',
			},
		});
	} catch (error) {
		return handleApiError(url.pathname, 500, { error }, {});
	}
};
