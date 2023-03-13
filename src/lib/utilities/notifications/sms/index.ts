// packages
import { Twilio } from 'twilio';

// env
import { TWILIO_ACCOUNT_SID, TWILIO_KEY } from '$env/static/private';
import { PUBLIC_TWILIO_NUMBER } from '$env/static/public';

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_KEY);

export const sendSms = async (message: { toNumber: string; body: string }) => {
	try {
		client.messages.create({
			from: PUBLIC_TWILIO_NUMBER,
			to: message.toNumber,
			body: message.body,
		});
	} catch (error) {
		console.error(error.message);
	}
};
