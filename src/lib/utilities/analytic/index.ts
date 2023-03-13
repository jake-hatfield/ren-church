// packages
import { trackGoal } from 'fathom-client';

export const trackContactFormSubmission = () => {
	trackGoal('', 0);
};

export const trackNewMember = () => {
	trackGoal('', 0);
};

export const getOs = () => {
	if (typeof window === undefined) return null;

	const userAgent = navigator.userAgent;

	if (userAgent.search('Windows') !== -1) return 'windows';
	else if (userAgent.search('Mac') !== -1) return 'macOs';
	else if (userAgent.search('X11') !== -1) return 'unix';
	else if (userAgent.search('Linux') !== -1) return 'linux';
	else return null;
};
