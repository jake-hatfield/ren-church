export const itemsPerPage = 10;

export const createApiError = (status: number, e: unknown, body?: any) => {
	let error: any;

	if (typeof e === 'string') {
		error = { message: e };
	} else if (e?.message) {
		error = { message: e.message };
		if (e?.code) {
			error.code = e.code;
		}
		if (e?.suggestion) {
			error.suggestion = e.suggestion;
		}
	} else {
		error = { message: "Unhandled error! Something went wrong, but I can't tell ya what" };
	}

	return new Response(
		JSON.stringify({
			...body,
			error,
		}),
		{ status },
	);
};

export const createConsoleError = (pathname: string, errorMessage: string) => {
	console.error(
		`/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/\n👇 Error in ${pathname}\n${errorMessage}\n/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/`,
	);
};

export const getPagination = (url: URL) => {
	const pageParam = url.searchParams.get('page');
	const itemsParam = url.searchParams.get('items');

	const page = pageParam ? +pageParam : null;
	const items = itemsParam ? +itemsParam : itemsPerPage;

	const from = page ? page * items - items : 0;
	const to = page ? from + items - 1 : items - 1;

	return { from, to };
};

export const getSort = (
	url: URL,
	{
		fallbackSortAsc,
		fallbackSortKey,
		fallbackSortKeyForeignTable,
	}: {
		fallbackSortAsc: boolean;
		fallbackSortKey: string;
		fallbackSortKeyForeignTable: string | null;
	},
) => {
	let sortKey = url.searchParams.get('sortKey');
	const sortAsc = url.searchParams.get('sortAsc');

	let sortKeyForeignTable: string | null = null;

	if (sortKey && sortKey.includes('.')) {
		const sortKeySplit = sortKey.split('.');
		sortKeyForeignTable = sortKeySplit[0];
		sortKey = sortKeySplit[1];
	}

	return {
		sortKey: sortKey ? sortKey : fallbackSortKey,
		sortData: {
			...((sortKeyForeignTable || fallbackSortKeyForeignTable) && {
				foreignTable: sortKeyForeignTable ? sortKeyForeignTable : fallbackSortKeyForeignTable,
			}),
			ascending: sortAsc ? (sortAsc === 'true' ? true : false) : fallbackSortAsc,
		},
	};
};

export const getStripePagination = (url: URL) => {
	const startingAfterParam = url.searchParams.get('starting');
	const endingBeforeParam = url.searchParams.get('ending');
	const itemsParam = url.searchParams.get('items');

	const startingAfter = startingAfterParam ? startingAfterParam : null;
	const endingBefore = endingBeforeParam ? endingBeforeParam : null;
	const items = itemsParam ? +itemsParam : itemsPerPage;

	return { startingAfter, endingBefore, items };
};

export const handleApiError = (pathname: string, status: number, e: unknown, body: any) => {
	if (typeof e === 'string') {
		createConsoleError(pathname, `${e}`);
	} else if (e?.message) {
		createConsoleError(
			pathname,
			`❌ ${e?.code ? `${e.code}\n` : ''}💬 ${e.message}${
				e?.suggestion ? `\n🤔 ${e.suggestion}` : ''
			}`,
		);
	} else {
		createConsoleError(
			pathname,
			"💬 Unhandled error! Something went wrong, but I can't tell ya what",
		);
	}

	return createApiError(status, e, body);
};

export const toBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
	const buffer = Buffer.alloc(arrayBuffer.byteLength);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < buffer.length; i++) {
		buffer[i] = view[i];
	}
	return buffer;
};
