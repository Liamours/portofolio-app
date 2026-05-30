<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="section-title">Skills</h2>

      <div class="primary-skills">
        <div
          v-for="(group, idx) in primary"
          :key="group.category"
          class="skill-row"
          :class="{ 'with-separator': idx < primary.length - 1 }"
        >
          <span class="row-label">{{ group.category }}</span>
          <div class="row-items">
            <span v-for="item in group.items" :key="item" class="skill-item">
              <Icon
                v-if="iconMap[item]"
                :name="iconMap[item]"
                size="15"
                class="skill-icon"
              />
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <div class="divider"><span>Other Skills</span></div>

      <div class="secondary-skills">
        <div
          v-for="(group, idx) in secondary"
          :key="group.category"
          class="secondary-row"
          :class="{ 'with-separator': idx < secondary.length - 1 }"
        >
          <span class="secondary-label">{{ group.category }}</span>
          <span class="secondary-items">{{ group.items.join(' · ') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SkillGroup } from '~/types/portfolio'

const { data: skills } = await useSkills()

const primary = computed<SkillGroup[]>(() =>
  skills.value?.filter(g => g.priority === 'primary') ?? []
)
const secondary = computed<SkillGroup[]>(() =>
  skills.value?.filter(g => g.priority === 'secondary') ?? []
)

const iconMap: Record<string, string> = {
  // AI Engineering
  'PyTorch':        'devicon:pytorch',
  'TensorFlow':     'devicon:tensorflow',
  'Transformers':   'devicon:huggingface',    // HuggingFace Transformers
  'nnU-Net':        'devicon:pytorch',         // PyTorch-based
  'BiomedCLIP':     'devicon:huggingface',     // HuggingFace model
  'VideoMAE':       'devicon:huggingface',     // HuggingFace model
  'Whisper':        'simple-icons:openai',      // OpenAI Whisper
  // MLOps
  'Docker':         'devicon:docker',
  'Git':            'devicon:git',
  'uv':             'devicon:python',
  'pytest':         'devicon:pytest',
  'Conda':          'devicon:anaconda',
  // Data Science
  'OpenCV':         'devicon:opencv',
  'MediaPipe':      'devicon:tensorflow',     // Google / TF ecosystem
  'librosa':        'ph:waveform',            // audio
  'Scikit-learn':   'devicon:scikitlearn',
  // Secondary
  'FastAPI':        'devicon:fastapi',
  'MongoDB Motor':  'devicon:mongodb',
  'React 19':       'devicon:react',
  'Python':         'devicon:python',
  'C++':            'devicon:cplusplus',
  'Go':             'devicon:go',
  'LaTeX':          'devicon:latex',
  'Streamlit':      'devicon:streamlit',
}
</script>

<style scoped>
.primary-skills {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 2rem;
}

.skill-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1rem 0;
}

.skill-row.with-separator {
  border-bottom: 1px solid var(--border);
}

.row-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-top: 0.15rem;
}

.row-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: var(--text);
  font-family: monospace;
  white-space: nowrap;
}

.skill-icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0 1.5rem;
  color: var(--border);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.secondary-skills {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.secondary-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
  align-items: baseline;
  padding: 0.6rem 0;
}

.secondary-row.with-separator {
  border-bottom: 1px solid var(--border);
}

.secondary-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  opacity: 0.6;
}

.secondary-items {
  font-size: 0.82rem;
  color: var(--text-muted);
  opacity: 0.6;
}

@media (max-width: 640px) {
  .skill-row,
  .secondary-row {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}
</style>
