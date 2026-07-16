"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="min-h-[200px] flex flex-col items-center justify-center text-pink-900 bg-pink-50 rounded-2xl p-6 border border-pink-200">
          <h2 className="text-xl font-serif font-bold mb-2">Ups, ada sedikit kendala.</h2>
          <p className="text-sm font-sans mb-4 text-pink-700/80">
            Adek, bagian ini sedang diperbaiki. Lanjut scroll aja ya sayang! 🤍
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-pink-200 hover:bg-pink-300 rounded-full text-sm font-medium transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
