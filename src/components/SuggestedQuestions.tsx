interface Props {
  questions: string[]
  onSelect: (q: string) => void
}

export default function SuggestedQuestions({ questions, onSelect }: Props) {
  if (!questions.length) return null

  return (
    <div className="suggested-questions">
      <h2 className="suggested-questions-heading">
        <QuestionIcon />
        Related questions
      </h2>
      <div className="suggested-questions-list">
        {questions.map(q => (
          <button
            key={q}
            className="suggested-question-btn"
            onClick={() => onSelect(q)}
          >
            <span className="suggested-question-arrow" aria-hidden="true">›</span>
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuestionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: '8px', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
    </svg>
  )
}
