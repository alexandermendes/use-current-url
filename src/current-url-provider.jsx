import React from 'react';
import CurrentUrlContext from './context';

export const CurrentUrlProvider = ({
  children,
  initialUrl,
  onMount,
  onUnmount,
}) => (
  <CurrentUrlContext.Provider
    value={{
      initialUrl,
      onMount,
      onUnmount,
    }}
  >
    {children}
  </CurrentUrlContext.Provider>
);
