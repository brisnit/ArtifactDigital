import { SearchResult, ContentType } from '../types'

interface Props {
  result: SearchResult
}

const typeConfig: Record<ContentType, { label: string; className: string }> = {
  Doctor: { label: 'Doctor', className: 'badge--doctor' },
  Location: { label: 'Location', className: 'badge--location' },
  Service: { label: 'Service', className: 'badge--service' },
  Article: { label: 'Article', className: 'badge--article' },
  FAQ: { label: 'FAQ', className: 'badge--faq' },
}

export default function ResultCard({ result }: Props) {
  const { label, className } = typeConfig[result.contentType]

  return (
    <div className="result-card">
      <div className="result-card-top">
        <span className={`result-badge ${className}`}>{label}</span>
        {(result.location || result.specialty) && (
          <span className="result-meta">
            {result.specialty && <span>{result.specialty}</span>}
            {result.specialty && result.location && <span className="result-meta-sep">·</span>}
            {result.location && <span>{result.location}</span>}
          </span>
        )}
      </div>
      <h3 className="result-title">{result.title}</h3>
      <p className="result-description">{result.description}</p>
      <a href={result.url} className="result-cta">
        View page <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}
