// packages
import { describe, expect, it } from 'vitest';

// lib
import {
	convertKeepaTime,
	convertKeepaTimeToIso,
	convertTimestampToIso,
	formatTimestamp,
	formatIsoToText,
} from '@utils/dateTime';

describe('convertKeepaTime()', () => {
	it('should return a epoch timestamp from a keepa timestamp', () => {
		expect(convertKeepaTime(6216049)).toBe(1666802940);
	});
});

describe('convertKeepaTimeToIso()', () => {
	it('should return an iso time from a keepa timestamp', () => {
		expect(convertKeepaTimeToIso(6216049)).toBe('2022-10-26T16:49:00.000Z');
	});
});

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
