export interface Link {
  label: string
  url: string
}

export interface Hero {
  name: string
  title: string
  tagline: string
  links: Link[]
}

export interface About {
  bio: string
  gpa: string
  institution: string
  graduation: string
  hardware: string
}

export interface ProjectLinks {
  github?: string
  demo?: string
  paper?: string
}

export interface ProjectStat {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  type: 'research' | 'industrial' | 'software'
  status?: 'in-progress' | 'planned'
  period: string | null
  institution?: string
  funding?: string
  images?: string[]
  summary: string
  stats?: ProjectStat[]
  highlights: string[]
  stack: string[]
  links?: ProjectLinks
  /** Shown on the homepage. Order follows the position in projects.json. */
  featured: boolean
  /** Long-form context on the project detail page. */
  narrative?: string
}

export interface Experience {
  role: string
  organization: string
  period: string
  type: 'research' | 'teaching' | 'organization' | 'committee' | 'competition'
  highlights: string[]
  /** Shown in the portfolio experience section rather than the full list. */
  portfolio: boolean
}

export interface Publication {
  title: string
  venue: string
  year: number
  type: 'Conference Paper' | 'Journal Paper' | 'Preprint' | 'Dataset' | 'Copyright' | 'e-Book' | 'Review'
  role: 'author' | 'presenter' | 'reviewer' | 'contributor'
  authors?: string
  image?: string
  link?: string
}

export interface SkillGroup {
  category: string
  priority: 'primary' | 'secondary'
  items: string[]
}

export interface Portfolio {
  hero: Hero
  about: About
  projects: Project[]
  experience: Experience[]
  publications: Publication[]
  skills: SkillGroup[]
}
