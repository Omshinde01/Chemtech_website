import { Component } from "react";
import { BUSINESS } from "../lib/site";

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.error(err); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#071523] px-6 text-center text-white">
        <h1 className="text-3xl font-bold">This page couldn&apos;t load</h1>
        <p className="mt-4 text-gray-300">
          Please reload, or email <a className="text-blue-400 underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
        </p>
        <button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700">Reload page</button>
      </div>
    );
  }
}
