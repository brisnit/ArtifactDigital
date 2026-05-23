export default function LoadingState() {
  return (
    <div className="loading-state">
      <div className="container">
        {/* AI Answer skeleton */}
        <div className="skeleton-ai-card">
          <div className="skeleton-badge" />
          <div className="skeleton-line skeleton-line--wide" />
          <div className="skeleton-line skeleton-line--medium" />
          <div className="skeleton-line skeleton-line--narrow" />
          <div className="skeleton-sources">
            {[0, 1, 2].map(i => (
              <div key={i} className="skeleton-source-card" />
            ))}
          </div>
        </div>

        {/* Generating label */}
        <div className="loading-label">
          <span className="loading-dot-pulse" />
          Generating AI answer…
        </div>

        {/* Result card skeletons */}
        <div className="skeleton-results">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="skeleton-result-card">
              <div className="skeleton-badge skeleton-badge--small" />
              <div className="skeleton-line skeleton-line--medium" style={{ marginTop: '12px' }} />
              <div className="skeleton-line skeleton-line--wide" />
              <div className="skeleton-line skeleton-line--narrow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
