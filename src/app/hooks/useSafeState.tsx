import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type SetStateFn<T> = Dispatch<SetStateAction<T | undefined>>;
type SafeSetState<T> = [T | undefined, SetStateFn<T>];

export function useSafeState<T = undefined>(
  initialState?: T | (() => T | undefined),
): SafeSetState<T> {
  const [state, setState] = useState(initialState);
  const componentMountedRef = useRef<boolean>(false);

  useEffect(() => {
    // Set the flag on mount
    componentMountedRef.current = true;

    // Reset the flag on unmount (cleanup)
    return () => {
      componentMountedRef.current = false;
    };
  });

  const safeSetState = useCallback<SetStateFn<T>>(
    args => {
      // Only set the state when the component is mounted
      if (componentMountedRef.current) {
        setState(args);
      }
    },
    [setState, componentMountedRef],
  );

  return [state, safeSetState];
}
