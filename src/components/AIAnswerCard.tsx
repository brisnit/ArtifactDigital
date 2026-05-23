import { AIAnswer } from '../types'

interface Props {
  answer: AIAnswer
  query: string
}

export default function AIAnswerCard({ answer }: Props) {
  return (
    <div className="ai-card" role="region" aria-label="AI-powered answer">
      <div className="ai-card-header">
        <span className="ai-badge">
          <SparkleIcon />
          AI-Powered Answer
        </span>
      </div>

      <p className="ai-summary">{answer.summary}</p>

      {answer.sources.length > 0 && (
        <div className="ai-sources">
          <p className="ai-sources-label">Supporting sources</p>
          <div className="ai-sources-grid">
            {answer.sources.map(source => (
              <a key={source.id} href={source.url} className="ai-source-card">
                <span className="ai-source-title">{source.title}</span>
                <span className="ai-source-desc">{source.description}</span>
                <span className="ai-source-link">View page →</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <p className="ai-disclaimer">
        <InfoIcon />
        This answer is based on Baptist Health website content and should not replace medical advice. Always consult a qualified healthcare provider for personal health concerns.
      </p>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px', flexShrink: 0 }}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: '6px', flexShrink: 0, marginTop: '1px' }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  )
}
