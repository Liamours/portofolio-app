import type { Hero, About, Project, Experience, Publication, SkillGroup } from '~/types/portfolio'

export const useHero = () => useFetch<Hero>('/data/hero.json')
export const useAbout = () => useFetch<About>('/data/about.json')
export const useProjects = () => useFetch<Project[]>('/data/projects.json')
export const useExperience = () => useFetch<Experience[]>('/data/experience.json')
export const usePublications = () => useFetch<Publication[]>('/data/publications.json')
export const useSkills = () => useFetch<SkillGroup[]>('/data/skills.json')
