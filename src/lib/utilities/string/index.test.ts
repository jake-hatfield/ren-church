// package
import { describe, expect, it } from 'vitest';

// lib
import { capitalize, kebabCase } from '@utils/string';

describe('capitalize()', () => {
	it('should capitalize first letter', () => {
		expect(capitalize('testing')).toBe('Testing');
	});
	it('should lowercase sequential letters', () => {
		expect(capitalize('tESTING')).toBe('Testing');
	});
	it('should capitalize only the first letter of the first word with a multiple-word input', () => {
		expect(capitalize('testing, testing')).toBe('Testing, testing');
	});
});

describe('kebabCase()', () => {
	it('should lowercase a single-word input', () => {
		expect(kebabCase('TESTING')).toBe('testing');
	});
	it('should lowercase and hyphenate a multiple-word input', () => {
		expect(kebabCase('TESTING TESTING')).toBe('testing-testing');
	});
	it('should not affect an already kebab-cased input', () => {
		expect(kebabCase('testing-testing')).toBe('testing-testing');
	});
});
