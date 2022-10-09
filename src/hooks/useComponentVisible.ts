import { RefObject, useEffect, useRef, useState } from 'react';

interface ComponentVisible {
  isComponentVisible: boolean;
  setIsComponentVisible: (visible: boolean) => void;
  ref: RefObject<HTMLDivElement>;
}

export default function useComponentVisible(initialIsVisible: boolean): ComponentVisible {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: any): void {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
