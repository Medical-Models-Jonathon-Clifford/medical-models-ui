import { formatTimeSince } from './date-adapters';

describe('DateAdapter', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date(2025, 1, 1, 12, 10, 10).getTime());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return about 2 hours ago', () => {
    const timeSince = formatTimeSince(new Date(2025, 1, 1, 10, 10, 10));
    expect(timeSince).toEqual('about 2 hours ago');
  });
});
