import React, { Component, ErrorInfo } from "react";
import { GridErrorEventHandler } from "../Model/PublicModel";

interface ErrorBoundaryState {
    error?: Error;
    errorInfo?: React.ErrorInfo;
    hasError: boolean;
}

export class ErrorBoundary extends Component<Record<string, unknown> & { onError?: GridErrorEventHandler}, ErrorBoundaryState> {

    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(error: ErrorBoundaryState): { hasError: boolean, error: ErrorBoundaryState } {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ errorInfo });
    }

    render(): React.ReactNode {
        const { hasError, errorInfo, error } = this.state;
        if (hasError) {
            const errorHandlerResult = this.props.onError?.({ error, errorInfo } as { error: Error; errorInfo: ErrorInfo });
            return errorHandlerResult ? (
              errorHandlerResult
            ) : (
              <>
                  <h1>{error?.message}</h1> <br />
                  <br />
                  <details>
                      {error?.stack}
                      {errorInfo?.componentStack}
                  </details>
              </>
            );
        } else {
            return this.props.children;
        }
    }

}
