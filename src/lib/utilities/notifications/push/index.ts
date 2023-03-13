// packages
import Push from 'push.js';

// lib
import { siteUrl } from '@lib/metadata';

export const createNewMarketplaceLeadPushNotification = () => {
	return Push.create('Leadgeek', {
		body: 'New leads just went live on the Marketplace',
		link: siteUrl,
		timeout: 6000,
	});
};
