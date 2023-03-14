export const findItemById = (items: any[], id: string) => {
	const foundItem = items.find((item) => item.id === id);

	if (!foundItem) return null;

	return foundItem;
};

export const formatStringArray = (stringArray: string) => {
	return stringArray
		.split(',')
		.map((string) => string.trim())
		.filter((string) => string !== '');
};

const isMatch = (string: string, query: string) => {
	if (string.toLowerCase().includes(query.toLowerCase())) return true;
	return false;
};

export const searchArray = (
	items: any[],
	query: string,
	key?: string,
	queryType?: string
) => {
	// ensure that items show without an input
	if (!query) return items;

	// instantiate an empty array to store the matching items
	const result: any[] = [];

	items.forEach((item) => {
		let searchableItem = key ? item[key].toString() : item.toString();

		if (queryType) {
			if (item.kind === queryType && isMatch(searchableItem, query.slice(1)))
				result.push(item);
		} else {
			if (isMatch(searchableItem, query)) result.push(item);
		}
	});

	return result;
};
