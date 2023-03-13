// packages
import pluralize from 'pluralize';
import { titleCase as tc } from 'title-case';

// capitalize the first letter of a string
export const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
};

export const parseBoolean = (item: string | boolean | null) => {
	if (item === null) return false;

	if (typeof item === 'string') {
		if (item.trim().toLowerCase() === 'true') return true;
		return false;
	}

	return item;
};

// convert sentence into kebab-case
export const kebabCase = (string: string) =>
	string
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/\s+/g, '-')
		.toLowerCase();

export const getDomainFromUrl = (url: string) => {
	let result, match;
	if (
		(match = url.match(
			/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
		))
	) {
		result = match[1];
		if ((match = result.match(/^[^.]+\.(.+\..+)$/))) {
			result = match[1];
		}
	}
	return result;
};

export const handlePluralization = pluralize;

export const obfuscateEmail = (email: string) => {
	if (!email.length) {
		return '';
	}

	const [name, domain] = email.split('@');

	return `${name[0]}${new Array(name.length - 1).join('*')}${
		name[name.length - 1]
	}@${domain}`;
};

export const titleCase = tc;
