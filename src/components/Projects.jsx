import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

const FILTERS = ['all', 'frontend', 'fullstack']

export default function Projects() {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState('all')
  const reduce = useReducedMotion()

  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.5, ease: 'easeOut' },
      }

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.h2 className="section-title" {...rise}>
          {t.projects.title}
        </motion.h2>

        <div className="filter-bar" role="group" aria-label={t.projects.filterLabel}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {t.projects.filters[f]}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.id}
                className="project-card card"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="project-media" aria-hidden="true">
                  <span className="project-initial">{project.title.charAt(0)}</span>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description[lang]}</p>

                  <ul className="chips">
                    {project.tech.map((tech) => (
                      <li key={tech} className="chip chip-sm">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="project-actions">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      aria-label={`${t.projects.codeLabel}: ${project.title}`}
                    >
                      <FiGithub aria-hidden="true" />
                      {t.projects.code}
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        aria-label={`${t.projects.demoLabel}: ${project.title}`}
                      >
                        <FiExternalLink aria-hidden="true" />
                        {t.projects.demo}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
