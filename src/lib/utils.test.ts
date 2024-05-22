import { formatDate } from './utils';

describe('formatDate function', () => {
  it('returns an empty string for undefined date', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('returns an empty string for invalid date format', () => {
    expect(formatDate('invalid-date')).toBe('');
  });

  it('formats a valid date in YYYY-MM-DD format', () => {
    const dateString = '2024-05-22';
    const expectedFormat = `${dateString}`;

    expect(formatDate(dateString)).toBe(expectedFormat);
  });

  it('formats a date with leading zeros for month and day', () => {
    const dateString = '2024-01-05';
    const expectedFormat = '2024-01-05';

    expect(formatDate(dateString)).toBe(expectedFormat);
  });

  it('formats a date ignoring the timezone', () => {
    const dateString = '2024-04-29T00:00:00.000Z';
    const expectedFormat = '2024-04-29';

    expect(formatDate(dateString)).toBe(expectedFormat);
  })
});