import { currentUrl } from 'current-url';
import { renderHook } from '@testing-library/react-hooks';
import { useCurrentUrl } from '../src';

jest.mock('current-url');

describe('useCurrentUrl', () => {
  beforeEach(() => {
    currentUrl.mockReturnValue({ href: 'http://example.com/page' });
  });

  it('returns the current URL', () => {
    const { result } = renderHook(useCurrentUrl);

    expect(result.current).toBe('http://example.com/page');
  });
});
