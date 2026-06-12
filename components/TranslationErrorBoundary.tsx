"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class TranslationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    const msg = error.message || "";
    if (msg.includes("removeChild") || msg.includes("insertBefore") || msg.includes("not a child")) {
      return { hasError: true, error };
    }
    return { hasError: false, error: null };
  }

  componentDidCatch(error: Error) {
    const msg = error.message || "";
    if (msg.includes("removeChild") || msg.includes("insertBefore") || msg.includes("not a child")) {
      console.warn("DOM mismatch detected (likely browser translation). Retrying render...");
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-translation-error-boundary
          suppressHydrationWarning
        >
          {this.props.children}
        </div>
      );
    }
    return this.props.children;
  }
}
