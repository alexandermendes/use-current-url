# use-current-url

[![npm version](https://badge.fury.io/js/use-current-url.svg)](https://badge.fury.io/js/use-current-url)

A React hook to get the current URL.

## Installation

```
yarn add use-current-url
```

## Usage

In its most basic form the `useCurrentUrl()` hook will, on mount, return a `URL` object
containing the current URL:

```jsx
import { useCurrentUrl } from 'use-current-url';

useCurrentUrl();
```

If your application uses server-side rendering you can pass in an initial URL
via the `CurrentUrlProvider` component. There are also `onMount` and `onUnmount`
hooks that can be used to trigger an update of the current URL.

For example, in a Next.js application you might add something like this to your
root `_app.jsx` file:

```jsx
import { getCurrentUrl, CurrentUrlProvider } from 'use-current-url';

const App = ({
  children,
  initialUrl,
}) => (
  <CurrentUrlProvider
    initialUrl={initialUrl}
    onMount={(updateCurrentUrl) => { Router.events.on('routeChangeComplete', updateCurrentUrl); }}
    onUnmount={(updateCurrentUrl) => { Router.events.off('routeChangeComplete', updateCurrentUrl); }}
  >
    {children}
  </CurrentUrlProvider>
);

App.getInitialProps = ({ req }) => (
  initialUrl: getCurrentUrl(req),
);

export default App;
```

## Options

The following options are available for the `CurrentUrlProvider`

### `currentUrl`

Type: `string`
Default: `undefined`

The initial URL to use when server-side rendering a page.

### `onMount`

Type: `function`
Default: `undefined`

A callback to fire when the hook is mounted. It will be called with an
`updateCurrentUrl` function, which in turn updates the current URL.

### `onUnmount`

Type: `string`
Default: `undefined`

A callback to fire when the hook is mounted. It will be called with the same
`updateCurrentUrl` function that is passed to `onMount`.
