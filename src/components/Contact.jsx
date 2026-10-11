import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const EMAIL = 'sghiriabderrahim7@gmail.com'
const LINKEDIN_URL = 'https://linkedin.com/in/abderrahim-sghiri'
const GITHUB_URL = 'https://github.com/SghiriAbderrahim-code2'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.5, ease: 'easeOut' },
      }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    setSuccess(false)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t.contact.errors.name
    if (!EMAIL_RE.test(form.email.trim())) next.email = t.contact.errors.email
    if (form.message.trim().length < 10) next.message = t.contact.errors.message
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const subject = encodeURIComponent(`Portfolio contact — ${form.name.trim()}`)
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.h2 className="section-title" {...rise}>
          {t.contact.title}
        </motion.h2>

        <div className="contact-grid">
          <motion.div className="contact-info" {...rise}>
            <p className="contact-intro">{t.contact.intro}</p>

            <p className="contact-direct-label">{t.contact.directLinks}</p>
            <ul className="contact-links">
              <li>
                <a href={`mailto:${EMAIL}`} className="contact-link">
                  <FaEnvelope aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FaLinkedinIn aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.form className="contact-form card" onSubmit={handleSubmit} noValidate {...rise}>
            <div className="field">
              <label htmlFor="contact-name">{t.contact.name}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="field-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-email">{t.contact.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="field-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-message">{t.contact.message}</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="field-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {t.contact.send}
            </button>

            {success && (
              <p className="form-success" role="status">
                {t.contact.success}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
