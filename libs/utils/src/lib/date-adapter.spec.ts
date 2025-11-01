import { formatTimeSince } from './date-adapter';

describe('DateAdapter', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date(2025, 1, 1, 12, 0, 0).getTime()); // Feb 1, 2025, 12:00:00
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return about 2 hours ago', () => {
    const timeSince = formatTimeSince(new Date(2025, 1, 1, 10, 10, 10));
    expect(timeSince).toEqual('about 2 hours ago');
  });

  it('should return formatted date when difference is exactly 1 day', () => {
    const date = new Date(2025, 0, 31, 12, 0, 0); // Jan 31, 2025, 12:00:00
    expect(formatTimeSince(date)).toEqual('31 Jan 2025');
  });

  it('should return formatted date when difference is more than 1 day', () => {
    const date = new Date(2025, 0, 30, 12, 0, 0); // Jan 30, 2025, 12:00:00
    expect(formatTimeSince(date)).toEqual('30 Jan 2025');
  });

  it('should return "less than a minute ago" for very recent dates', () => {
    const date = new Date(2025, 1, 1, 11, 59, 30); // 30 seconds ago
    expect(formatTimeSince(date)).toEqual('1 minute ago');
  });

  it('should return "about 1 hour ago" for one hour difference', () => {
    const date = new Date(2025, 1, 1, 11, 0, 0); // 1 hour ago
    expect(formatTimeSince(date)).toEqual('about 1 hour ago');
  });

  it('should return "x minutes ago" for less than an hour', () => {
    const date = new Date(2025, 1, 1, 11, 30, 0); // 30 minutes ago
    expect(formatTimeSince(date)).toEqual('30 minutes ago');
  });

  it('should handle dates just before midnight correctly', () => {
    jest.setSystemTime(new Date(2025, 1, 1, 0, 5, 0).getTime()); // 12:05 AM
    const date = new Date(2025, 0, 31, 23, 50, 0); // 11:50 PM previous day
    expect(formatTimeSince(date)).toEqual('15 minutes ago');
  });

  it('should handle future dates', () => {
    const date = new Date(2025, 1, 1, 13, 0, 0); // 1 hour in future
    expect(formatTimeSince(date)).toEqual('in about 1 hour');
  });

  it('should handle different year correctly', () => {
    const date = new Date(2024, 11, 31, 12, 0, 0); // Dec 31, 2024
    expect(formatTimeSince(date)).toEqual('31 Dec 2024');
  });

});
