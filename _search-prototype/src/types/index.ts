export type FilterType = 'all' | 'doctors' | 'locations' | 'services' | 'articles' | 'faqs'

export type ContentType = 'Doctor' | 'Location' | 'Service' | 'Article' | 'FAQ'

export interface SearchResult {
  id: string
  title: string
  description: string
  contentType: ContentType
  specialty?: string
  location?: string
  url: string
  tags: string[]
}

export interface SourceCard {
  id: string
  title: string
  url: string
  description: string
}

export interface AIAnswer {
  summary: string
  sources: SourceCard[]
  followUpQuestions: string[]
}

export type SearchState = 'empty' | 'loading' | 'results' | 'noResults'
