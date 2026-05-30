export const useTheme = () => {
  const isDark = useState('isDark', () => false)

  const apply = (dark: boolean) => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('light', !dark)
  }

  const toggle = () => {
    const html = document.documentElement
    html.classList.add('theme-transitioning')
    isDark.value = !isDark.value
    apply(isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    setTimeout(() => html.classList.remove('theme-transitioning'), 300)
  }

  const init = () => {
    if (!import.meta.client) return
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = stored ? stored === 'dark' : false
    apply(isDark.value)
  }

  return { isDark, toggle, init }
}
