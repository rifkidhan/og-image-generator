import satori from 'satori';
import type { ParsedRequest } from '$lib/types';
import { sanitizeHtml } from './sanitizer';
import { dataLogoMark, dataLogoTypeWhite, dataLogoTypeBlack } from './dataImage';

const textWrapperEl = (
	props: Pick<ParsedRequest, 'title' | 'titleColor' | 'description' | 'descriptionColor' | 'bg'>
) => {
	const { title, titleColor, description, descriptionColor, bg } = props;
	const titleConf = sanitizeHtml(title);
	const descriptionConf = sanitizeHtml(description);

	let titleColorConf = '#18191F';
	let descriptionColorConf = '#18191F';

	if (titleColor === 'white') {
		titleColorConf = '#FFFFFF';
	}
	if (descriptionColor === 'white') {
		descriptionColorConf = '#FFFFFF';
	}
	if (bg === 'white') {
		titleColorConf = '#18191F';
		descriptionColorConf = '#18191F';
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
							border: '4px',
							boxShadow: '0 6px rgba(23 24 31 1)',
							padding: '64px'
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
					backgroundColor: '#FFFFFF',
					backgroundImage: `url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='40' height='40' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 255, 255,1)'/%3E%3Ccircle cx='33' cy='20' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='7' cy='20' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='20' cy='33' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='20' cy='7' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='37' cy='3' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='3' cy='37' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='37' cy='37' r='1' fill='rgba(249, 90, 44,1)'/%3E%3Ccircle cx='3' cy='3' r='1' fill='rgba(249, 90, 44,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E )`
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
