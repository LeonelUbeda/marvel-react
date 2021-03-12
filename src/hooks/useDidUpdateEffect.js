import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (fn, data) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, data);
};

export default useDidUpdateEffect;
