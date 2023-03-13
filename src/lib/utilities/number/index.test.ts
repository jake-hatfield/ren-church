// packages
import { describe, expect, it } from 'vitest';

// lib
import { clamp } from '@utils/number';

describe('clamp()', () => {
	it('should return at minimum, the minimum value', () => {
		expect(clamp(2, 5, 10)).toBe(5);
		expect(clamp(5, 5, 10)).toBe(5);
	});
	it('should return at maximum, the maximum value', () => {
		expect(clamp(13, 5, 10)).toBe(10);
		expect(clamp(10, 5, 10)).toBe(10);
	});
	it('should return the number if within minimum and maximum', () => {
		expect(clamp(7, 5, 10)).toBe(7);
	});
});
