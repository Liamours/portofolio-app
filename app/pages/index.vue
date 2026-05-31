<template>
  <div>
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <JourneysSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
    </main>
    <footer class="footer">
      <p>M. Rifqi Dzaky Azhad · {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<style>
.section {
  width: 100%;
  padding: 5rem 2rem;
  border-top: 1px solid var(--border);
}

/* Vary section density — not identical everywhere */
#about    { padding: 3.5rem 2rem; }
#skills   { padding: 3.5rem 2rem; }
#experience { padding: 4rem 2rem; }

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  padding-left: 0.75rem;
  border-left: 2px solid var(--accent-info);
}

/* ── Section backgrounds ── */
#projects,
#skills,
#experience,
#journeys {
  position: relative;
}

#projects::before,
#skills::before,
#experience::before,
#journeys::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.06;
  z-index: 0;
  pointer-events: none;
}

#projects .container,
#skills .container,
#experience .container,
#journeys .container {
  position: relative;
  z-index: 1;
}

#projects::before    { background-image: url('/images/background-projects.jpg'); }
#skills::before      { background-image: url('/images/background-skills.jpg'); }
#experience::before  { background-image: url('/images/background-experience.jpg'); }
#journeys::before    { background-image: url('/images/background-journeys.jpg'); }

html.light #projects::before,
html.light #skills::before,
html.light #experience::before,
html.light #journeys::before {
  opacity: 0.18;
}
</style>

<style scoped>
main {
  padding-top: 60px;
}

.footer {
  padding: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--border);
  border-top: 1px solid var(--border);
}
</style>
