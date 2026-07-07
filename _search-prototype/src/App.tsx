import { useState, useCallback } from 'react'
import Header from './components/Header'
import SearchInput from './components/SearchInput'
import AIAnswerCard from './components/AIAnswerCard'
import ResultCard from './components/ResultCard'
import FilterTabs from './components/FilterTabs'
import SuggestedQuestions from './components/SuggestedQuestions'
import NoResultsState from './components/NoResultsState'
import LoadingState from './components/LoadingState'
import { SearchState, FilterType, SearchResult, AIAnswer } from './types'
import HomepageContent from './components/HomepageContent'
import { getAIResponse } from './data/mockData'

export default function App() {
  const [query, setQuery] = useState('')
  const [searchState, setSearchState] = useState<SearchState>('empty')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [results, setResults] = useState<SearchResult[]>([])
  const [aiAnswer, setAiAnswer] = useState<AIAnswer | null>(null)
  const [submittedQuery, setSubmittedQuery] = useState('')

  const handleSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    setQuery(trimmed)
    setSubmittedQuery(trimmed)
    setSearchState('loading')
    setActiveFilter('all')

    setTimeout(() => {
      const { answer, results: found } = getAIResponse(trimmed)
      if (found.length === 0) {
        setSearchState('noResults')
      } else {
        setAiAnswer(answer)
        setResults(found)
        setSearchState('results')
      }
    }, 1200)
  }, [])

  const filteredResults = results.filter(result => {
    if (activeFilter === 'all') return true
    const map: Record<FilterType, string> = {
      all: '',
      doctors: 'Doctor',
      locations: 'Location',
      services: 'Service',
      articles: 'Article',
      faqs: 'FAQ',
    }
    return result.contentType === map[activeFilter]
  })

  return (
    <div className="app">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span className="breadcrumb-current">Search</span>
          </div>
        </div>

        {/* Search hero — maroon banner */}
        <section className="search-hero" aria-label="Site search">
          <svg
            className="search-hero-leaf"
            aria-hidden="true"
            width="540"
            height="533"
            viewBox="0 0 540 533"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.18"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M210.302 219.762C198.971 207.245 205.815 199.199 219.412 208.184C230.742 215.694 463.298 405.774 539.985 469.61L539.849 130.355C539.849 130.355 296.507 0 6.10352e-05 0C6.10352e-05 307.381 172.547 533 172.547 533L488.724 532.776C413.578 437.782 219.366 229.91 210.302 219.762"
              fill="white"
            />
          </svg>
          <div className="container">
            <h1 className="search-hero-title">SITE SEARCH</h1>
            <SearchInput
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
            />
          </div>
        </section>

        {/* Empty state — homepage content */}
        {searchState === 'empty' && (
          <div className="homepage-clip">
            <HomepageContent onSearch={handleSearch} />
          </div>
        )}

        {/* Loading state */}
        {searchState === 'loading' && <LoadingState />}

        {/* Results state */}
        {searchState === 'results' && (
          <div className="results-area">
            <div className="container">
              <p className="results-query-label">
                Results for: <strong>"{submittedQuery}"</strong>
                <span className="results-count">{results.length} result{results.length !== 1 ? 's' : ''} found</span>
              </p>

              {aiAnswer && <AIAnswerCard answer={aiAnswer} query={submittedQuery} />}

              <div className="results-section">
                <FilterTabs
                  active={activeFilter}
                  onChange={setActiveFilter}
                  results={results}
                />

                <div className="result-list">
                  {filteredResults.length > 0 ? (
                    filteredResults.map(result => (
                      <ResultCard key={result.id} result={result} />
                    ))
                  ) : (
                    <div className="empty-filter">
                      <p>No results in this category.</p>
                      <button className="empty-filter-btn" onClick={() => setActiveFilter('all')}>
                        Show all results
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {aiAnswer && (
                <SuggestedQuestions
                  questions={aiAnswer.followUpQuestions}
                  onSelect={q => { setQuery(q); handleSearch(q) }}
                />
              )}
            </div>
          </div>
        )}

        {/* No results state */}
        {searchState === 'noResults' && (
          <NoResultsState query={submittedQuery} onSearch={handleSearch} />
        )}
      </main>
    </div>
  )
}
