import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {year} {t.hero.name}
        </p>
        <p className="footer-note">{t.footer.built}</p>
      </div>
    </footer>
  )
}
