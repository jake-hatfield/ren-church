export const mergeByKey = (array1: any[], array2: any[], key: string) =>
	array1.map((item) => ({
		...array2.find((n) => n[key] === item[key] && n),
		...item,
	}));

export const updateByKey = (oldArray: any[], newArray: any[], key: string) =>
	oldArray.map((item) => ({
		...item,
		...newArray.find((n) => n[key] === item[key] && n),
	}));

export const resetObjectKeys = <T extends Record<string, string>>(
	obj: T,
): Record<keyof T, string> => {
	Object.keys(obj).forEach((k) => {
		obj[k] = '';
	});

	return obj as T;
};

export const objectHasValue = <T extends Record<string, string> | Record<string, number>>(
	obj: T,
) => {
	return Object.values(obj).some((val) => val !== '');
};
