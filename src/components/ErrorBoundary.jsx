import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          color: '#ff4444',
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          margin: '20px',
          fontFamily: 'JetBrains Mono, monospace',
          zIndex: 99999,
          position: 'fixed',
          inset: '80px 20px 20px',
          overflow: 'auto',
        }}>
          <h2 style={{ color: '#ff6b6b', marginTop: 0 }}>🚨 Application Error Caught</h2>
          <p style={{ color: '#ccc' }}>The error below caused the blank screen:</p>
          <pre style={{
            whiteSpace: 'pre-wrap',
            fontSize: '13px',
            color: '#ffaa44',
            background: '#111',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}>
            {this.state.error?.message || 'Unknown error'}
            {'\n\n'}
            {this.state.error?.stack || ''}
            {this.state.errorInfo?.componentStack
              ? '\n\nComponent Stack:\n' + this.state.errorInfo.componentStack
              : ''}
          </pre>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
            }}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              background: '#315cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Try to recover
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
