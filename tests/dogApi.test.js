import { describe, it, expect } from 'vitest';
import { getBreedFromUrl } from '../src/lib/dogApi';

describe('getBreedFromUrl', () => {
  it('works', () => {
    expect(getBreedFromUrl('https://images.dog.ceo/breeds/beagle/n.jpg')).toBe('beagle');
  });
});