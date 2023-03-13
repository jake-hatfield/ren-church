// packages
import client from '@sendgrid/client';
import mail from '@sendgrid/mail';
import sgHelpers from '@sendgrid/helpers';

// lib
import { handlePluralization } from '@utils/string';

// types
import type { PersonalizationData } from '@sendgrid/helpers/classes/personalization';

// env
import { SENDGRID_KEY } from '$env/static/private';

mail.setApiKey(SENDGRID_KEY);
client.setApiKey(SENDGRID_KEY);

const transactionalEmail = 'support@leadgeek.io';
const promotionalEmail = 'news@leadgeek.io';

export const createOrUpdateEmailContacts = async (
	contacts: {
		email: string;
		first_name: string;
		last_name: string;
		custom_fields: { [key: string]: any };
	}[]
) => {
	try {
		const res = await client.request({
			url: '/v3/marketing/contacts',
			method: 'PUT',
			body: {
				contacts,
			},
		});

		console.log(
			`👋 ${handlePluralization('contact', contacts.length, true)} added`
		);

		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createSuppression = async (emails: string[], groupId: string) => {
	try {
		const res = await client.request({
			url: `/v3/asm/groups/${groupId}/suppressions`,
			method: 'POST',
			body: JSON.stringify({ recipient_emails: emails }),
		});

		console.log(
			`📪 ${handlePluralization(
				'emails',
				emails.length,
				true
			)} added to suppression group ${groupId}`
		);

		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteSuppression = async (email: string, groupId: string) => {
	try {
		const res = await client.request({
			url: `v3/asm/groups/${groupId}/suppressions/${email}`,
			method: 'DELETE',
		});

		console.log(`📫 ${email} removed from suppression group ${groupId}`);

		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const handleError = (error: unknown) => {
	if (error.response) {
		// Extract error msg
		const {
			response: { body },
		} = error;

		console.error(body);
	}
};

export const sendEmail = async (
	notifiers: {
		fromEmail?: string;
		replyToEmail?: string;
		toEmail: string;
	},
	message: {
		asm?: { groupId: number; groupsToDisplay?: number[] };
		attachments?: {
			content: string;
			contentId?: string;
			disposition?: string;
			filename: string;
			type?: string;
		}[];
		dynamicTemplateData?: { [key: string]: any };
		templateId: string;
	}
) => {
	try {
		const { fromEmail, replyToEmail, toEmail } = notifiers;
		const { attachments, templateId, dynamicTemplateData, asm } = message;

		const res = await mail.send({
			from: {
				email: fromEmail ?? transactionalEmail,
				name: 'Leadgeek',
			},
			replyTo: replyToEmail ?? transactionalEmail,
			personalizations: [
				{
					to: toEmail,
					dynamicTemplateData,
				},
			],
			templateId,
			...(message?.asm && { asm }),
			...(attachments && attachments?.length > 0 && { attachments }),
		});

		console.log('📧 Email sent');

		console.log(res);

		return res;
	} catch (error) {
		handleError(error);
		return null;
	}
};

export const sendMultipleEmails = async (
	items: { email: string; dynamicTemplateData: { [key: string]: any } }[],
	notifiers: {
		fromEmail?: string;
		replyToEmail?: string;
	},
	message: {
		asm?: { groupId: number; groupsToDisplay?: number[] };
		attachments?: {
			content: string;
			contentId?: string;
			disposition?: string;
			filename: string;
			type?: string;
		}[];
		dynamicTemplateData?: { [key: string]: any };
		templateId: string;
	}
) => {
	try {
		const { fromEmail, replyToEmail } = notifiers;
		const { templateId, dynamicTemplateData, asm } = message;

		// create a personalization for each item
		const Personalization = sgHelpers.classes.Personalization;
		const personalizations: PersonalizationData[] = [];

		items.map((item) => {
			const personalization = new Personalization();
			personalization.setTo(item.email);
			personalization.setDynamicTemplateData({
				...dynamicTemplateData,
				...item.dynamicTemplateData,
			});
			personalizations.push(personalization);
		});

		const res = await mail.sendMultiple({
			from: {
				email: fromEmail ?? promotionalEmail,
				name: 'Leadgeek',
			},
			replyTo: replyToEmail ?? promotionalEmail,
			personalizations,
			templateId,
			...(asm && { asm }),
		});

		console.log('📧 Emails sent');

		console.log(res);

		return res;
	} catch (error) {
		handleError(error);
		return null;
	}
};
