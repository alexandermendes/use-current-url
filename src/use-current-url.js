import { currentUrl as getCurrentUrl } from 'current-url';
import { useContext, useEffect, useState } from 'react';
import CurrentUrlContext from './context';

const noop = () => {};

export const useCurrentUrl = () => {
  const {
    initialUrl,
    onMount = noop,
    onUnmount = noop,
  } = useContext(CurrentUrlContext);

  const [currentUrl, setCurrentUrl] = useState(initialUrl);

  const updateCurrentUrl = () => {
    setCurrentUrl(getCurrentUrl().href);
  };

  useEffect(() => {
    updateCurrentUrl();

    onMount(updateCurrentUrl);

    return () => {
      onUnmount(updateCurrentUrl);
    };
  }, []);

  return currentUrl;
};
