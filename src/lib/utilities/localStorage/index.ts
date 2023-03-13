export const parseArray = (key: string) => {
	const storedItems = localStorage.getItem(key);

	if (storedItems) return JSON.parse(storedItems);

	return [];
};

export const parseObject = (key: string) => {
	const storedItems = localStorage.getItem(key);

	if (storedItems) return JSON.parse(storedItems);

	return {};
};
