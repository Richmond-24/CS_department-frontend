import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

type ErrorBoundaryState = { hasError: boolean }

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('The site could not be rendered.', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="startup-error" role="alert">
          <div className="startup-error__card">
            <p className="startup-error__eyebrow">Computer Science &amp; Informatics</p>
            <h1>We couldn&apos;t load this page.</h1>
            <p>Please refresh the page. If the problem continues, try again in a few minutes.</p>
            <button type="button" onClick={() => window.location.reload()}>
              Refresh page
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Missing root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
