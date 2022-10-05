import { useEffect } from 'react';

const useOutsideAlerter = (ref, bellRef, phoneRef, setOpen) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref?.current.contains(event.target) &&
        bellRef.current &&
        !bellRef?.current.contains(event.target) &&
        phoneRef?.current === null
      ) {
        setOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, bellRef, setOpen, phoneRef]);
};

export default useOutsideAlerter;
