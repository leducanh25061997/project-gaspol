import { RefObject } from 'react';

import useEventListener from './useEventListener';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  idElementDisable?: string,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEventListener(mouseEvent, (event: any) => {
    const el = ref?.current;
    if (
      !el ||
      el.contains(event.target as Node) ||
      (event?.path?.length > 0 &&
        idElementDisable === event?.path[0]?.offsetParent?.id)
    ) {
      return;
    }

    handler(event);
  });
}

export default useOnClickOutside;
