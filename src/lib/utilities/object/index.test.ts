// packages
import { describe, expect, it } from 'vitest';

// lib
import { objectHasValue, resetObjectKeys } from '@utils/object';

describe('resetObjectKeys()', () => {
	it('should reset all keys to empty strings', () => {
		expect(
			resetObjectKeys({
				id: 'uuidV4()',
				firstName: 'Johnny',
				lastName: 'Appleseed',
			})
		).toEqual({
			id: '',
			firstName: '',
			lastName: '',
		});
	});
	it('should not have any effect on empty objects', () => {
		expect(resetObjectKeys({})).toEqual({});
	});
});

describe('objectHasValue()', () => {
	it('should be true for non-empty object', () => {
		expect(
			objectHasValue({
				id: 'uuidV4()',
			})
		).toBe(true);
	});
	it('should be false for empty object', () => {
		expect(objectHasValue({})).toBe(false);
	});
});
