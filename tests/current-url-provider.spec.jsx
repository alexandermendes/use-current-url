import React from 'react';
import { renderToString } from 'react-dom/server';
import { currentUrl } from 'current-url';
import { render, act } from '@testing-library/react';
import { CurrentUrlProvider, useCurrentUrl } from '../src';

const Component = () => {
  const currentUrl = useCurrentUrl();

  return <p data-testid="current-url">{currentUrl}</p>;
};

jest.mock('current-url');

describe('CurrentUrlProvider', () => {
  beforeEach(() => {
    currentUrl.mockReturnValue({ href: 'http://example.com/page' });
  });

  it('fires the onMount and onUnmount callbacks, with a callback that updates the current url', () => {
    const onMount = jest.fn();
    const onUnmount = jest.fn();

    const { getByTestId, unmount } = render(
      <CurrentUrlProvider
        onMount={onMount}
        onUnmount={onUnmount}
      >
        <Component />
      </CurrentUrlProvider>
    );

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(onUnmount).not.toHaveBeenCalled();
    expect(getByTestId('current-url').textContent).toBe('http://example.com/page');

    currentUrl.mockReturnValue({ href: 'http://example.com/another-page' });

    act(onMount.mock.calls[0][0]);

    expect(getByTestId('current-url').textContent).toBe('http://example.com/another-page');

    act(() => { unmount(); });

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(onUnmount).toHaveBeenCalledTimes(1);
    expect(onMount.mock.calls[0][0]).toEqual(onUnmount.mock.calls[0][0]);
  });

  describe('SSR', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('respects the initial URL for SSR', () => {
      document.body.innerHTML = renderToString(
        <CurrentUrlProvider
          initialUrl="http://initial.com/page"
        >
          <Component />
        </CurrentUrlProvider>
      );

      const { textContent } = document.querySelector('[data-testid="current-url"]');

      expect(textContent).toBe('http://initial.com/page');
    });
  });
});
