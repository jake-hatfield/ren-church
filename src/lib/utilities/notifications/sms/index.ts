// packages
import { Twilio } from 'twilio';

const client = new Twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_KEY
);

export const sendSms = async (message: { toNumber: string; body: string }) => {
	try {
		client.messages.create({
			from: process.env.NEXT_PUBLIC_TWILIO_NUMBER,
			to: message.toNumber,
			body: message.body,
		});
	} catch (error) {
		console.error(error.message);
	}
};
