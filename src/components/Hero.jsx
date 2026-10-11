import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const GITHUB_URL = 'https://github.com/SghiriAbderrahim-code2'
const LINKEDIN_URL = 'https://linkedin.com/in/abderrahim-sghiri'
const EMAIL = 'sghiriabderrahim7@gmail.com'

export default function Hero() {
  const { t, isRtl } = useLanguage()
  const reduce = useReducedMotion()

  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: 'easeOut' },
        }

  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <motion.div className="hero-text" {...enter(0)}>
          <p className="hero-greeting">{t.hero.greeting}</p>
          <h1 className="hero-name">{t.hero.name}</h1>
          <h2 className="hero-role">{t.hero.role}</h2>
          <p className="hero-tagline">{t.hero.tagline}</p>

          <div className="hero-actions">
            <a href="/cv.pdf" download className="btn btn-primary">
              <FiDownload aria-hidden="true" />
              {t.hero.downloadCv}
            </a>
            <a href="#projects" className="btn btn-secondary">
              {t.hero.myWork}
              <FiArrowDown aria-hidden="true" />
            </a>
          </div>

          <div className="hero-socials">
            <a
              className="social-btn"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.hero.github}
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              className="social-btn"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.hero.linkedin}
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a className="social-btn" href={`mailto:${EMAIL}`} aria-label={t.hero.email}>
              <FaEnvelope aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div className="hero-photo-wrap" {...enter(0.15)}>
          <div className="hero-photo">
            <img src="/profile.jpg" alt={t.hero.photoAlt} width="320" height="320" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        aria-label={t.hero.scrollDown}
        animate={reduce ? undefined : { y: [0, 8, 0], x: isRtl ? '50%' : '-50%' }}
        initial={false}
        style={reduce ? { transform: isRtl ? 'translateX(50%)' : 'translateX(-50%)' } : undefined}
        transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiArrowDown aria-hidden="true" />
      </motion.a>
    </section>
  )
}
