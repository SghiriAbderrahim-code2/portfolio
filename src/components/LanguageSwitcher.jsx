import { useLanguage } from '../context/LanguageContext'

const LANGS = [
  { code: 'ar', label: 'AR' },
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-switcher" role="group" aria-label={t.nav.languageSwitcher}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-btn${lang === code ? ' active' : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
