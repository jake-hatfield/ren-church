// env
import { PUBLIC_ADMIN_UUID } from '$env/static/public';

// lib
import { trialKit } from '@lib/metadata/kits';

// types
import type { RawNotification } from '$types/database/Notification';

// TODO<Jake>: Test all these notifications look alright in the UI

export const codes: RawNotification[] = [
	{
		admin_description: 'No leads will be posted on a weekday',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '000',
		description:
			"Our team is taking a break today, so all your tokens' expirations have been extended 24 hrs 🤗",
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: 'No leads today',
	},
	{
		admin_description: 'No leads will be posted on a holiday',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '001',
		description: '',
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: '',
	},
	{
		admin_description: 'Software version update',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '002',
		description: 'View the detailed notes in the newest changelog 📰',
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: '',
	},
	{
		admin_description: 'New blog post created',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '003',
		description: 'Check out the post for some helpful selling tips',
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: '',
	},
	{
		admin_description: 'Affiliate application received',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '004',
		description:
			'Your application has been received ✅. Our team usually gets a chance to review it within 48 hours',
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: 'Affiliate application received',
	},
	{
		admin_description: 'Affiliate application approved',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '005',
		description:
			'Your application has been approved 🎉! View your affiliate dashboard for more information',
		external_link: null,
		internal_link: '/account/affiliate',
		kind: 'success',
		title: 'Affiliate application approved',
	},
	{
		admin_description: 'Affiliate application rejected',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '006',
		description:
			"Your affiliate application has been denied in its current state. Please reach out to support if you'd like more details",
		external_link: null,
		internal_link: '/contact',
		kind: 'error',
		title: 'Affiliate application rejected',
	},
	{
		admin_description: 'Refund request received',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '007',
		description:
			'Your refund request requires further review by our team, but we usually get a chance to look at it within 48 hours',
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: '',
	},
	{
		admin_description: 'Refund request approved',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '008',
		description:
			'Your refund request has been approved and token(s) added back to your wallet',
		external_link: null,
		internal_link: '/account/billing',
		kind: 'success',
		title: '',
	},
	{
		admin_description: 'Refund request rejected',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '009',
		description:
			"Your refund request was rejected by our team. Please reach out to support if you'd like more details",
		external_link: null,
		internal_link: '/contact',
		kind: 'error',
		title: '',
	},
	{
		admin_description: 'IP complaint received',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '010',
		description:
			'Your suggestion for the IP complaint database has been received and is under review',
		external_link: null,
		internal_link: null,
		kind: 'info',
		title: 'IP complaint request received',
	},
	{
		admin_description: 'IP complaint approved',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '011',
		description:
			'Your IP complaint request was approved and 5 tokens were added to your wallet. Thanks for helping make Leadgeek better',
		external_link: null,
		internal_link: null,
		kind: 'success',
		title: 'IP complaint request approved',
	},
	{
		admin_description: 'IP complaint rejected',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '012',
		description:
			'Your IP complaint request was denied in its current form, but thanks for your suggestion',
		external_link: null,
		internal_link: null,
		kind: 'error',
		title: 'IP complaint request rejected',
	},
	{
		admin_description: 'Promo/sale alert',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '098',
		description: '',
		external_link: null,
		internal_link: '',
		kind: 'success',
		title: '',
	},
	{
		admin_description: 'New leads posted',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '099',
		description: 'Go check out the marketplace to see the newest drops 🔥',
		external_link: null,
		internal_link: '/marketplace',
		kind: 'info',
		title: '',
	},
	{
		admin_description: 'New account welcome',
		actor_id: PUBLIC_ADMIN_UUID,
		clearable: true,
		code: '100',
		description: `Your wallet has been credited ${trialKit.tokenCount} free tokens. You can spend them on the marketplace whenever you're ready 🥳`,
		external_link: null,
		internal_link: '/marketplace',
		kind: 'info',
		title: 'Welcome to Leadgeek!',
	},
];
