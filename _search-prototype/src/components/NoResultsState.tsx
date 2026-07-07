import { suggestedQueries } from '../data/mockData'

interface Props {
  query: string
  onSearch: (q: string) => void
}

export default function NoResultsState({ query, onSearch }: Props) {
  return (
    <div className="no-results">
      <div className="container">
        <div className="no-results-inner">
          <div className="no-results-icon" aria-hidden="true">
            <SearchSlashIcon />
          </div>
          <h2 className="no-results-heading">We couldn't find an exact match</h2>
          <p className="no-results-body">
            No results found for <strong>"{query}"</strong>. Try a different spelling, fewer words, or one of the suggestions below.
          </p>

          <div className="no-results-suggestions">
            <p className="no-results-suggestions-label">Try searching for:</p>
            <div className="no-results-chips">
              {suggestedQueries.map(q => (
                <button key={q} className="no-results-chip" onClick={() => onSearch(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="no-results-ctas">
            <p className="no-results-ctas-label">Or get help from our team:</p>
            <div className="no-results-cta-row">
              <a href="#" className="btn btn--primary">Search All Services</a>
              <a href="#" className="btn btn--secondary">Find a Doctor</a>
              <a href="#" className="btn btn--secondary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchSlashIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="8" x2="14" y2="14" />
    </svg>
  )
}
