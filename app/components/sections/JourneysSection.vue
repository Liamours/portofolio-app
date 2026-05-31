<template>
  <section id="journeys" class="section">
    <div class="container">
      <h2 class="section-title">Journeys</h2>

      <!-- Pill buttons -->
      <div class="journey-btns">
        <button
          v-for="(entry, i) in journeyList"
          :key="entry.config.key"
          class="journey-btn"
          :class="{ active: activeIdx === i }"
          @click="switchJourney(i)"
        >
          <Icon :name="entry.config.icon" size="13" />
          {{ entry.config.label }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div
          class="journey-view"
          :key="activeIdx"
          v-if="active"
          :class="{ 'no-photos': !allPhotos.length }"
        >

          <!-- Left: sticky photo with fade edge -->
          <div v-if="allPhotos.length" class="photo-side">
            <div class="slideshow">
              <img
                v-for="(src, i) in allPhotos"
                :key="src"
                :src="src"
                :alt="active.title"
                class="slide"
                :class="{ active: i === photoIdx }"
              />
              <div class="fade-right" />
              <div class="fade-bottom" />
            </div>
            <div v-if="allPhotos.length > 1" class="slide-dots">
              <span
                v-for="(_, i) in allPhotos"
                :key="i"
                class="slide-dot"
                :class="{ active: i === photoIdx }"
                @click.stop="photoIdx = i"
              />
            </div>
          </div>

          <!-- Right: text content -->
          <div class="text-side">
            <div class="journey-header">
              <img v-if="active.logo" :src="active.logo" :alt="active.title" class="journey-logo" />
              <div>
                <h3 class="journey-title">{{ active.title }}</h3>
                <p class="journey-subtitle">{{ active.subtitle }}</p>
              </div>
            </div>

            <div class="timeline">
              <div
                v-for="(m, mi) in active.milestones"
                :key="m.year"
                class="milestone"
              >
                <div class="milestone-head" @click="toggle(activeIdx, mi)">
                  <span class="milestone-year">{{ m.year }}</span>
                  <span class="milestone-role">{{ m.role }}</span>
                  <Icon name="ph:caret-down" size="14" class="caret" :class="{ rotated: isOpen(activeIdx, mi) }" />
                </div>

                <div class="expand-wrap" :class="{ open: isOpen(activeIdx, mi) }">
                  <div class="milestone-body">
                    <ul class="highlights">
                      <li v-for="(h, hi) in m.highlights" :key="hi">{{ h }}</li>
                    </ul>

                    <div v-if="m.publications?.length" class="pub-row">
                      <a
                        v-for="(pub, pi) in m.publications" :key="pi"
                        :href="pub.link || '#'" :target="pub.link ? '_blank' : undefined"
                        rel="noopener noreferrer"
                        class="pub-chip"
                        :class="[pub.link ? '' : 'no-link']"
                      >
                        <Icon name="ph:article" size="11" />
                        <span class="pub-chip-type">{{ pub.type }}</span>
                        <span class="pub-chip-title">{{ pub.title }}</span>
                      </a>
                    </div>

                    <div v-if="m.links?.length" class="m-links">
                      <a
                        v-for="link in m.links" :key="link.label"
                        :href="link.url" target="_blank" rel="noopener noreferrer"
                        class="m-link"
                      >
                        <Icon :name="link.icon" size="13" />{{ link.label }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Transition>

      <!-- Reflection — outside grid, full width, no sticky overlap -->
      <Transition name="fade" mode="out-in">
        <div v-if="active?.reflection?.length" :key="'ref-' + activeIdx" class="reflection-block">
          <h4 class="reflection-label">What I learned</h4>
          <ul class="reflection-list">
            <li v-for="(r, i) in active.reflection" :key="i">{{ r }}</li>
          </ul>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Journey } from '~/types/portfolio'

const configs = [
  { key: 'ailab',      label: 'AI Lab',      icon: 'ph:flask' },
  { key: 'wbbs',       label: 'WBBS',        icon: 'ph:bone' },
  { key: 'birdsound',  label: 'Bird Sound',  icon: 'ph:bird' },
  { key: 'transtrack', label: 'TransTrack',  icon: 'ph:truck' },
  { key: 'cxr',        label: 'CXR',         icon: 'ph:heart' },
]

const paths = [
  '/data/journey-ailab.json',
  '/data/journey-wbbs.json',
  '/data/journey-birdsound.json',
  '/data/journey-transtrack.json',
  '/data/journey-cxr.json',
]

const results = await Promise.all(paths.map(p => useFetch<Journey>(p)))
const journeyList = configs.map((config, i) => ({
  config,
  data: results[i].data.value,
}))

const activeIdx = ref(0)
const active = computed(() => journeyList[activeIdx.value]?.data ?? null)

const allPhotos = computed(() =>
  (active.value?.milestones ?? [])
    .flatMap(m => m.images ?? [])
    .filter((s, i, a) => a.indexOf(s) === i)
)

const photoIdx = ref(0)
let slideTimer: ReturnType<typeof setInterval> | null = null

const startSlideshow = () => {
  if (slideTimer) clearInterval(slideTimer)
  photoIdx.value = 0
  if (allPhotos.value.length <= 1) return
  slideTimer = setInterval(() => {
    photoIdx.value = (photoIdx.value + 1) % allPhotos.value.length
  }, 3500)
}

watch(allPhotos, startSlideshow, { immediate: true })
onUnmounted(() => { if (slideTimer) clearInterval(slideTimer) })

const openMap = ref<Record<number, Set<number>>>(
  Object.fromEntries(
    journeyList.map((entry, ji) => [
      ji,
      new Set((entry.data?.milestones ?? []).map((_, mi) => mi))
    ])
  )
)

const isOpen = (ji: number, mi: number) => openMap.value[ji]?.has(mi) ?? false
const toggle = (ji: number, mi: number) => {
  const s = new Set(openMap.value[ji] ?? [])
  if (s.has(mi)) { s.delete(mi) } else { s.add(mi) }
  openMap.value = { ...openMap.value, [ji]: s }
}
const switchJourney = (i: number) => { activeIdx.value = i }
</script>

<style scoped>
/* ── Buttons ── */
.journey-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.journey-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.9rem;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease-out, color 0.2s ease-out, background 0.2s ease-out, transform 0.15s ease-out;
}
.journey-btn:hover { border-color: var(--text-muted); color: var(--text); transform: translateY(-1px); }
.journey-btn.active { background: var(--accent-1); border-color: var(--accent-1); color: #fff; }

/* ── Fade transition ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Split layout ── */
.journey-view {
  display: grid;
  grid-template-columns: 42% 1fr;
  gap: 0;
  align-items: start;
}

.journey-view.no-photos {
  grid-template-columns: 1fr;
}

/* ── Photo side ── */
.photo-side {
  position: sticky;
  top: 70px;
  align-self: start;
}

.slideshow {
  position: relative;
  width: 100%;
  height: 520px;
  overflow: hidden;
  border-radius: 12px 0 0 12px;
}

.slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0;
  transition: opacity 1s ease;
}
.slide.active { opacity: 1; }

/* Right-edge gradient fade into background */
.fade-right {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 45%;
  background: linear-gradient(to right, transparent, var(--bg));
  pointer-events: none;
}

/* Bottom fade */
.fade-bottom {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 30%;
  background: linear-gradient(to bottom, transparent, var(--bg));
  pointer-events: none;
}

.slide-dots {
  display: flex;
  gap: 0.35rem;
  margin-top: 0.75rem;
  padding-left: 0.5rem;
}
.slide-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--border); cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.slide-dot.active { background: var(--accent-1); transform: scale(1.4); }

/* ── Text side ── */
.text-side {
  padding-left: 2.5rem;
  padding-top: 0.5rem;
}

/* ── Journey header ── */
.journey-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}
.journey-header > div { min-width: 0; }
.journey-logo { height: 30px; width: auto; object-fit: contain; flex-shrink: 0; }
.journey-title { font-size: 1.05rem; font-weight: 700; color: var(--text); }
.journey-subtitle { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem; }

/* ── Flowing timeline ── */
.timeline { display: flex; flex-direction: column; gap: 0; }

.milestone { border-top: 1px solid var(--border); }
.milestone:last-child { border-bottom: 1px solid var(--border); }

.milestone-head {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 0.9rem 0;
  cursor: pointer;
  user-select: none;
}

.milestone-year {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent-info);
  letter-spacing: 0.06em;
  flex-shrink: 0;
  min-width: 28px;
}
.milestone-role {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
  flex: 1; min-width: 0;
}
.caret {
  color: var(--text-muted);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}
.caret.rotated { transform: rotate(180deg); }

.expand-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}
.expand-wrap.open { grid-template-rows: 1fr; }

.milestone-body {
  overflow: hidden;
  padding-bottom: 1.1rem;
  display: flex; flex-direction: column; gap: 0.9rem;
}

.highlights { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
.highlights li {
  font-size: 0.83rem; color: var(--text-muted);
  padding-left: 1rem; position: relative;
  line-height: 1.6; overflow-wrap: break-word;
}
.highlights li::before { content: '›'; position: absolute; left: 0; color: var(--border); }

/* ── Publications ── */
.pub-row { display: flex; flex-direction: column; gap: 0.35rem; }
.pub-chip {
  display: flex; align-items: baseline; gap: 0.4rem;
  font-size: 0.77rem; color: var(--text-muted);
  text-decoration: none; padding: 0.3rem 0;
  border-bottom: 1px dashed var(--border);
  transition: color 0.2s;
}
.pub-chip:last-child { border-bottom: none; }
.pub-chip:not(.no-link):hover { color: var(--text); }
.pub-chip-type { font-size: 0.63rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); flex-shrink: 0; }
.pub-chip-title { flex: 1; min-width: 0; }

/* ── Links ── */
.m-links { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.m-link {
  display: flex; align-items: center; gap: 0.3rem;
  font-size: 0.76rem; padding: 0.22rem 0.6rem;
  border: 1px solid var(--border); border-radius: 4px;
  color: var(--text-muted); background: var(--surface);
  transition: border-color 0.2s, color 0.2s;
}
.m-link:hover { border-color: var(--accent-1); color: var(--accent-1); }

/* ── Reflection ── */
.reflection-block {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--accent-info-sub);
  border-left: 2px solid var(--accent-info);
}

.reflection-label {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  margin-bottom: 0.85rem;
  font-style: italic;
}

.reflection-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.reflection-list li {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;
  line-height: 1.65;
}

.reflection-list li::before {
  content: 'I';
  position: absolute;
  left: 0;
  color: var(--accent-info);
  font-family: 'DM Serif Display', Georgia, serif;
  font-style: italic;
  font-size: 0.85rem;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .journey-view { grid-template-columns: 1fr; }
  .photo-side { position: static; }
  .slideshow { height: 240px; border-radius: 10px; }
  .fade-right { display: none; }
  .fade-bottom { height: 40%; }
  .text-side { padding-left: 0; padding-top: 1.5rem; }
}
</style>
