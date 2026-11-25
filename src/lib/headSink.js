import { createContext } from "react";

// Only provided while prerendering: pages report their metadata to it during render.
export const HeadSink = createContext(null);
