import { RefObject, useEffect } from "react";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => void, closeEle?: Element | null) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (closeEle) {
                // Scenario: Such as the 'Close' button/icon which sits outside the ref.current.
                if (!closeEle?.contains(event.target as Node) && !ref?.current?.contains(event.target as Node)) {
                    handler();
                }
            } else {
                if (!ref?.current?.contains(event.target as Node)) {
                    handler();
                }
            }
        };
        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler, closeEle]);
}