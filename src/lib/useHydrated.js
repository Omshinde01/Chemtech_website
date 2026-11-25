import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false in prerendered HTML and during hydration, true afterwards. Guards anything that
// depends on the browser (WebGL, query string) so hydration always matches the HTML.
export const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);
