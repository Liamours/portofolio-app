import type { Hero, About, Project, Experience, Publication, SkillGroup, Journey } from '~/types/portfolio'

export const useHero = () => useFetch<Hero>('/data/hero.json')
export const useAbout = () => useFetch<About>('/data/about.json')
export const useProjects = () => useFetch<Project[]>('/data/projects.json')
export const useExperience = () => useFetch<Experience[]>('/data/experience.json')
export const usePublications = () => useFetch<Publication[]>('/data/publications.json')
export const useSkills = () => useFetch<SkillGroup[]>('/data/skills.json')
export const useAiLabJourney = () => useFetch<Journey>('/data/journeys/journey-ailab.json')
export const useWbbsJourney = () => useFetch<Journey>('/data/journeys/journey-wbbs.json')
export const useBirdsoundJourney = () => useFetch<Journey>('/data/journeys/journey-birdsound.json')
export const useCxrJourney = () => useFetch<Journey>('/data/journeys/journey-cxr.json')
export const useTranstrackJourney = () => useFetch<Journey>('/data/journeys/journey-transtrack.json')
