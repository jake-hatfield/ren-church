export const getCookie = (key: string): string | null => {
	const nameEQ = key + '=';
	const ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};

export const setCookie = (key: string, value: string, days: number): void => {
	if (typeof document !== undefined) {
		document.cookie = `${key}=${value}; expires=${new Date(
			Date.now() + 24 * 60 * 60 * 1000 * days,
		).toUTCString()}; path=/`;
	}
};

export const deleteCookie = (name: string): void => {
	if (typeof document !== undefined) {
		setCookie(name, '', -1);
	}
};
export const parseCookies = (request: Request) => {
	const list: { [key: string]: string } = {};

	const cookieHeader = request.headers.get('cookie');

	if (!cookieHeader) return list;

	cookieHeader.split(`;`).forEach((cookie) => {
		const splitCookies = cookie.split(`=`);
		let [name] = splitCookies;
		const [, ...rest] = splitCookies;

		name = name?.trim();

		if (!name) return;

		const value = rest.join(`=`).trim();

		if (!value) return;

		list[name] = decodeURIComponent(value);
	});

	return list;
};
