import satori from 'satori';
import type { ParsedRequest } from '$lib/types';
import { sanitizeHtml } from './sanitizer';
import { dataLogoMark, dataLogoTypeWhite, dataLogoTypeBlack, dataPattern } from './dataImage';

/**
 * Title and description template
 *
 */
const textWrapperEl = (
	props: Pick<ParsedRequest, 'title' | 'titleColor' | 'description' | 'descriptionColor' | 'bg'>
) => {
	const { title, titleColor, description, descriptionColor, bg } = props;
	const titleConf = sanitizeHtml(title);
	const descriptionConf = sanitizeHtml(description);

	let titleColorConf = '#18191F';
	let descriptionColorConf = '#18191F';

	/**
	 * force color to black when inner background is white
	 */
	if (titleColor === 'white' && bg !== 'white') {
		titleColorConf = '#FFFFFF';
	}
	if (descriptionColor === 'white' && bg !== 'white') {
		descriptionColorConf = '#FFFFFF';
	}

	return {
		type: 'div',
		props: {
			children: [
				{
					type: 'p',
					props: {
						children: titleConf,
						style: {
							fontSize: '48px',
							fontWeight: 700,
							color: titleColorConf,
							lineHeight: 1
						}
					}
				},
				{
					type: 'p',
					props: {
						children: descriptionConf,
						style: {
							fontSize: '30px',
							fontWeight: 600,
							color: descriptionColorConf,
							lineHeight: '36px',
							margin: 0
						}
					}
				}
			],
			style: {
				display: 'flex',
				flexDirection: 'column',
				marginTop: '110px'
			}
		}
	};
};

/**
 * Logo image wrapper, convert to 'base64' using readFileSync.
 */
const logoImageEl = (props: Pick<ParsedRequest, 'logoType' | 'logoColor' | 'bg'>) => {
	const { logoType, logoColor, bg } = props;

	const logoMarkEl = {
		type: 'img',
		props: {
			src: `data:image/png;base64,${dataLogoMark}`,
			height: 112,
			width: 112,
			style: {
				maxWidth: '112px'
			}
		}
	};

	/**
	 * force logo type color to black when inner background is white
	 */
	const logoTypeEl = {
		type: 'img',
		props: {
			src:
				logoColor === 'white' && bg !== 'white'
					? `data:image/png;base64,${dataLogoTypeWhite}`
					: `data:image/png;base64,${dataLogoTypeBlack}`,
			height: 60,
			width: 321,
			style: {
				marginLeft: '20px'
			}
		}
	};

	return {
		type: 'div',
		props: {
			children: [logoMarkEl, logoType === 'true' && logoTypeEl],
			style: {
				height: '112px',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center'
			}
		}
	};
};

export const svgTemplate = async (props: ParsedRequest) => {
	const { logoType, title, description, bg, logoColor, titleColor, descriptionColor } = props;

	/**
	 * grab font from google fonts and convert to arrayBuffer
	 */
	const testFont = await (
		await fetch('https://fonts.googleapis.com/css2?family=Epilogue:wght@600;700')
	).text();
	const resource = testFont.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
	if (!resource) {
		return;
	}
	const fontsRes = await (await fetch(resource[1])).arrayBuffer();

	let background = '#F95A2C';

	function bgColor(color: string) {
		switch (color) {
			case 'green': {
				return (background = '#00C6AE');
			}
			case 'red': {
				return (background = '#F95A2C');
			}
			case 'blue': {
				return (background = '#1947E5');
			}
			case 'yellow': {
				return (background = '#FFBD12');
			}
			default: {
				return (background = '#FFFFFF');
			}
		}
	}

	bgColor(bg);

	const svg = await satori(
		{
			type: 'div',
			props: {
				children: {
					type: 'div',
					props: {
						children: [
							logoImageEl({ logoType, logoColor, bg }),
							textWrapperEl({ title, titleColor, description, descriptionColor, bg })
						],
						style: {
							display: 'flex',
							background: background,
							maxHeight: '75%',
							width: '75%',
							flexDirection: 'column',
							borderRadius: '12px',
							border: '4px #18191F',
							boxShadow: '0 8px 0 0 #18191F',
							padding: '64px',
							overflow: 'hidden'
						}
					}
				},
				style: {
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundImage: `url(data:image/png;base64,${dataPattern})`,
					backgroundSize: '1200px 630px',
					backgroundColor: '#FFFFFF'
				}
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Epilogue',
					data: fontsRes,
					weight: 700,
					style: 'normal'
				},
				{
					name: 'Epilogue',
					data: fontsRes,
					weight: 600,
					style: 'normal'
				}
			]
		}
	);

	return svg;
};
