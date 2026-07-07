import { FilterType, SearchResult, ContentType } from '../types'

interface Props {
  active: FilterType
  onChange: (f: FilterType) => void
  results: SearchResult[]
}

const filters: { key: FilterType; label: string; contentType?: ContentType }[] = [
  { key: 'all', label: 'All Results' },
  { key: 'doctors', label: 'Doctors', contentType: 'Doctor' },
  { key: 'locations', label: 'Locations', contentType: 'Location' },
  { key: 'services', label: 'Services', contentType: 'Service' },
  { key: 'articles', label: 'Articles', contentType: 'Article' },
  { key: 'faqs', label: 'FAQs', contentType: 'FAQ' },
]

export default function FilterTabs({ active, onChange, results }: Props) {
  function count(contentType?: ContentType) {
    if (!contentType) return results.length
    return results.filter(r => r.contentType === contentType).length
  }

  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter results">
      {filters.map(({ key, label, contentType }) => {
        const n = count(contentType)
        if (key !== 'all' && n === 0) return null
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active === key}
            className={`filter-tab ${active === key ? 'filter-tab--active' : ''}`}
            onClick={() => onChange(key)}
          >
            {label}
            <span className="filter-tab-count">{n}</span>
          </button>
        )
      })}
    </div>
  )
}
