import { getCountryNameFromCode } from '@/utils/country-helper';

import { vi, describe, it, expect } from 'vitest';


vi.mock('@/data/countries.json', () => ({
  default: {
    data: [
      { code: 'US', name: 'United States' },
      { code: 'NG', name: 'Nigeria' },
    ],
  },
}));

describe('getCountryNameFromCode', () => {
  it('returns the correct country name for a valid code', () => {
    expect(getCountryNameFromCode('US')).toBe('United States');
    expect(getCountryNameFromCode('NG')).toBe('Nigeria');
  });

  it('returns the input code if no match is found', () => {
    expect(getCountryNameFromCode('ZZ')).toBe('ZZ');
  });
});
