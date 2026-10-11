import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '../data/skills'
import { useLanguage } from '../context/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.5, delay, ease: 'easeOut' },
        }

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <motion.h2 className="section-title" {...rise()}>
          {t.skills.title}
        </motion.h2>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <motion.article key={group.id} className="skill-card card" {...rise(i * 0.08)}>
              <h3 className="skill-card-title">{t.skills.categories[group.id]}</h3>
              <ul className="chips">
                {group.skills.map(({ name, Icon }) => (
                  <li key={name} className="chip">
                    <Icon aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
