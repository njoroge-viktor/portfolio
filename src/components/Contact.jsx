import { useState } from 'react'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import SectionHeading from './SectionHeading.jsx'
import { API } from '../hooks/usePortfolio.js'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact({ profile = {} }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const channels = [
    { icon: 'fa-solid fa-envelope', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, accent: 'divine' },
    { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', value: 'victor-njoroge', href: profile.linkedin, accent: 'credible' },
    { icon: 'fa-brands fa-github', label: 'GitHub', value: 'njoroge-viktor', href: profile.github, accent: 'royal' },
    { icon: 'fa-solid fa-location-dot', label: 'Based in', value: profile.location, href: null, accent: 'purpose' },
  ]

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })

    try {
      // Posts into the `messages` collection in db.json via json-server.
      const res = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, receivedAt: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setForm(EMPTY)
      setStatus({ state: 'sent', message: 'Message received and saved. Victor will be in touch shortly.' })
    } catch (err) {
      setStatus({
        state: 'error',
        message: `Could not reach the local API (${err.message}). Start it with "npm run api", or email ${profile.email} directly.`,
      })
    }
  }

  return (
    <section id="contact" data-accent="royal" className="section scene">
      <div className="shell">
        <SectionHeading
          eyebrow="Open for Engagements"
          title="Let's build something"
          highlight="worth trusting"
          description={profile.openTo}
        />

        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-3 h-100">
              {channels.map((channel, i) => {
                const Inner = (
                  <TiltCard accent={channel.accent} className="card-pad" max={11} style={{ padding: '1.15rem 1.35rem' }}>
                    <div className="layer-1 d-flex align-items-center gap-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 13,
                          background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05))',
                          border: '1px solid rgba(var(--accent-rgb),0.45)',
                        }}
                      >
                        <i className={channel.icon} style={{ color: 'var(--accent-light)' }} aria-hidden="true" />
                      </span>

                      <div style={{ minWidth: 0 }}>
                        <p className="font-mono muted mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                          {channel.label}
                        </p>
                        <p className="mb-0 text-truncate" style={{ color: 'var(--text-high)', fontSize: '0.92rem' }}>
                          {channel.value}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                )

                return (
                  <Reveal key={channel.label} delay={i * 90}>
                    {channel.href ? (
                      <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="d-block">
                        {Inner}
                      </a>
                    ) : (
                      Inner
                    )}
                  </Reveal>
                )
              })}

              <Reveal delay={380}>
                <div
                  data-accent="purpose"
                  className="glass-panel d-flex align-items-center gap-3"
                  style={{ padding: '1.15rem 1.35rem' }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: 'var(--purpose)',
                      boxShadow: '0 0 14px 3px var(--purpose)',
                      flexShrink: 0,
                    }}
                  />
                  <p className="mb-0" style={{ fontSize: '0.88rem', color: 'var(--text-high)' }}>
                    {profile.availability}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="col-lg-7">
            <Reveal delay={120}>
              <TiltCard accent="royal" aura className="card-pad" max={4}>
                <form onSubmit={handleSubmit} className="layer-1">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="cf-name" className="eyebrow d-block mb-2">
                        Your Name
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Jane Okoth"
                        className="field"
                      />
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="cf-email" className="eyebrow d-block mb-2">
                        Email
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        placeholder="jane@company.com"
                        className="field"
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="cf-subject" className="eyebrow d-block mb-2">
                        Subject
                      </label>
                      <input
                        id="cf-subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={update('subject')}
                        placeholder="RLHF evaluation engagement"
                        className="field"
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="cf-message" className="eyebrow d-block mb-2">
                        Message
                      </label>
                      <textarea
                        id="cf-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={update('message')}
                        placeholder="Tell Victor about the work…"
                        className="field"
                      />
                    </div>

                    <div className="col-12 d-flex flex-wrap align-items-center gap-3">
                      <button type="submit" className="btn-regal" disabled={status.state === 'sending'}>
                        <i
                          className={status.state === 'sending' ? 'fa-solid fa-circle-notch fa-spin' : 'fa-solid fa-paper-plane'}
                          aria-hidden="true"
                        />
                        {status.state === 'sending' ? 'Sending…' : 'Send Message'}
                      </button>

                      <a href={`mailto:${profile.email}`} className="btn-ghost">
                        <i className="fa-solid fa-envelope" aria-hidden="true" />
                        Email Instead
                      </a>
                    </div>

                    {status.message && (
                      <div className="col-12">
                        <p
                          className="mb-0 d-flex align-items-start gap-2"
                          style={{
                            fontSize: '0.85rem',
                            color: status.state === 'sent' ? 'var(--purpose-light)' : 'var(--exuberance-light)',
                          }}
                          role="status"
                        >
                          <i
                            className={`fa-solid ${status.state === 'sent' ? 'fa-circle-check' : 'fa-circle-exclamation'} mt-1`}
                            aria-hidden="true"
                          />
                          {status.message}
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
