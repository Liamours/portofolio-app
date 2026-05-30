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

export interface Project {
  id: string
  title: string
  type: 'research' | 'industrial' | 'software'
  period: string
  institution?: string
  funding?: string
  summary: string
  highlights: string[]
  stack: string[]
  links?: ProjectLinks
}

export interface Experience {
  role: string
  organization: string
  period: string
  type: 'research' | 'teaching' | 'organization' | 'committee' | 'competition'
  highlights: string[]
}

export interface Publication {
  title: string
  venue: string
  year: number
  type: 'Conference Paper' | 'Journal Paper' | 'Preprint' | 'Dataset' | 'e-Book' | 'Review'
  role: 'author' | 'presenter' | 'reviewer' | 'contributor'
  authors?: string
  image?: string
  link?: string
}

export interface JourneyLink {
  label: string
  icon: string
  url: string
}

export interface JourneyPub {
  title: string
  type: string
  venue: string
  year: number
  link?: string
}

export interface JourneyMilestone {
  year: string
  role: string
  highlights: string[]
  links?: JourneyLink[]
  publications?: JourneyPub[]
  images?: string[]
}

export interface Journey {
  title: string
  subtitle: string
  logo?: string
  milestones: JourneyMilestone[]
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
