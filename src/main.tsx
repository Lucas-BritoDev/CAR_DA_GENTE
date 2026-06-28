import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AccessibilityProvider } from "./accessibility/AccessibilityProvider";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

class ErrorBoundary extends React.Component<any, any> {
  props: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("React ErrorBoundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 20, color: 'red'}}>
        <h1>Something went wrong rendering the app.</h1>
        <pre>{this.state.error?.toString()}</pre>
      </div>;
    }
    return this.props.children;
  }
}

const isDiagnosticMode = false; // set to true to isolate

createRoot(document.getElementById("root")!).render(
  isDiagnosticMode ? (
    <div style={{ padding: 20, background: '#fff', color: '#000', fontSize: '24px' }}>
      <h1>Hello World</h1>
      <p>Diagnostic mode active. React is rendering.</p>
    </div>
  ) : (
    <ErrorBoundary>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </ErrorBoundary>
  )
);
