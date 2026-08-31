export interface ProjectSummary {
  path: string
  title: string
  description: string
  year: string
  role: string
  category: string
  order: number
  featured?: boolean
  cover?: string
  coverAlt?: string
  coverTone: string
  metric?: string
  timeline: string
  team: string
  industry: string
  responsibilities: string[]
}
