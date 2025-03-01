import { getRemainingTime } from '../../lib/cookie.js';
import { describe, test, expect } from '@jest/globals';

describe('Cookie utils', () => {
  test('getRemainingTime should return remaining time', () => {
    const req = { session: { expires: Date.now() + 1000 } };
    const remainingTime = getRemainingTime(req);
    expect(remainingTime).toBe(1000);
  });
});
