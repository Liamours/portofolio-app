<template>
  <div>
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <JourneysSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <footer class="footer">
      <p>M. Rifqi Dzaky Azhad · {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<style>
.section {
  padding: 2rem;
  border-top: 1px solid #000;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>

<style scoped>
.footer {
  padding: 1rem 2rem;
  border-top: 1px solid #000;
}
</style>
