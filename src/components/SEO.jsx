import { useContext, useEffect } from "react";
import { applyHead } from "../lib/head";
import { HeadSink } from "../lib/headSink";

export default function SEO(meta) {
  const sink = useContext(HeadSink);
  if (sink) sink.report(meta);
  const key = JSON.stringify(meta);
  useEffect(() => applyHead(JSON.parse(key)), [key]);
  return null;
}
