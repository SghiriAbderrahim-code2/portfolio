import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ar from '../i18n/ar'
import fr from '../i18n/fr'
import en from '../i18n/en'

const dictionaries = { ar, fr, en }
const SUPPORTED = ['ar', 'fr', 'en']

const LanguageContext = createContext(null)

function detectLanguage() {
  const stored = localStorage.getItem('lang')
  if (SUPPORTED.includes(stored)) return stored
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase()
  return SUPPORTED.includes(browser) ? browser : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', lang)
    document.title = dictionaries[lang].seo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', dictionaries[lang].seo.description)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      isRtl: lang === 'ar',
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
