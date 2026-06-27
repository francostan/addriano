import { describe, it, expect } from 'vitest';
import { featured } from './tracks';

describe('featured', () => {
  it('returns beheaded ritual as the featured release', () => {
    expect(featured().title).toBe('beheaded ritual');
  });
});
