// lib
import metadata from '@lib/metadata';

const author = metadata.author.split(' ');

const config = {
	openGraph: {
		type: 'website',
		locale: metadata.ogLanguage,
		profile: { firstName: author[0], lastName: author[1] },
		siteName: metadata.siteTitle,
	},
	twitter: {
		handle: `@${metadata.social.twitter}`,
		site: `@${metadata.social.twitter}`,
		cardType: 'summary_large_image',
	},
};

export default config;
