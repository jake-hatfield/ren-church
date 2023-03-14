// packages
import { describe, expect, it } from 'vitest';

// lib
import {
	convertTimestampToIso,
	formatTimestamp,
	formatIsoToText,
} from '@utils/dateTime';

describe('convertTimestampToIso()', () => {
	it('should return an iso time from a epoch timestamp', () => {
		expect(convertTimestampToIso(1666802940)).toBe('2022-10-26T16:49:00.000Z');
	});
});

describe('formatIsoToText()', () => {
	it('should return a formatted string from an iso time', () => {
		expect(formatIsoToText('2022-10-26T16:49:00.000Z')).toBe('Oct 26, 2022');
	});
});

describe('formatTimestamp()', () => {
	it('should return iso format from timestamp', () => {
		expect(formatTimestamp(1666802940)).toBe('Oct 26, 2022');
	});
	it('should reflect the format input', () => {
		expect(formatTimestamp(1666802940, 'LLL dd')).toBe('Oct 26');
	});
});
