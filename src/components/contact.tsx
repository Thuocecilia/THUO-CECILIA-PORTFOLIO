
import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  Send,
  Mail,
  ExternalLink,
} from 'lucide-react'
import { siGithub} from 'simple-icons'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import FoxModel from './foxModel'
import './contact.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzedwdoq'

// Replace these placeholders with your real profile details.
const GITHUB_URL = 'https://github.com/'
const LINKEDIN_URL = 'www.linkedin.com/in/cecilia-thuo-446581310'
const EMAIL_ADDRESS = 'ceciliathuo005@gmail.com'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const [animalRunning, setAnimalRunning] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (sending) return

    const form = event.currentTarget
    const formData = new FormData(form)

    setSending(true)
    setStatus('Sending your message...')
    setAnimalRunning(false)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Your message could not be sent.')
      }

      setStatus(
        'Message sent successfully! Thank you for reaching out.',
      )
      setAnimalRunning(true)

      setName('')
      setEmail('')
      setMessage('')
      form.reset()
    } catch {
      setStatus(
        'Sorry, your message could not be sent. Please try again shortly.',
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <header className="contact-page-heading">
        <span>CONTACT DEVELOPER</span>
      </header>

      {/* CONTACT FORM AND SOCIAL LINKS SIDE BY SIDE */}
      <div className="contact-horizontal-layout">

        {/* SECTION 1: CONTACT FORM WITH ANIMATED FOX BACKGROUND */}
        <div className="contact-form-panel">
          <div
            className={`fox-background ${
              animalRunning
                ? 'fox-is-running'
                : 'fox-is-walking'
            }`}
            aria-hidden="true"
          >
            <Canvas
              camera={{ position: [0, 1.2, 5], fov: 40 }}
              dpr={[1, 1.5]}
              gl={{ alpha: true, antialias: true }}
            >
              <ambientLight intensity={1.5} />

              <directionalLight
                position={[3, 5, 4]}
                intensity={2.5}
              />

              <directionalLight
                position={[-3, 2, -2]}
                intensity={1}
                color="#60A5FA"
              />

              <FoxModel running={animalRunning} />

              <ContactShadows
                position={[0, -0.62, 0]}
                opacity={0.4}
                scale={4}
                blur={2}
              />

              <Environment preset="city" />
            </Canvas>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-form-top">
              <div>
                <span className="form-eyebrow">
                  GET IN TOUCH
                </span>

                <h3>Let's create something amazing.</h3>

                <p className="form-intro">
                  Have an idea or opportunity? Tell me about it.
                </p>
              </div>

              <span
                className="form-send-icon"
                aria-hidden="true"
              >
                <Send size={22} />
              </span>
            </div>

            <label htmlFor="contact-name">
              YOUR NAME
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              autoComplete="name"
              maxLength={100}
              required
            />

            <label htmlFor="contact-email">
              EMAIL ADDRESS
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              maxLength={254}
              required
            />

            <label htmlFor="contact-message">
              YOUR MESSAGE
            </label>

            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message here..."
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              rows={4}
              maxLength={5000}
              required
            />

            <button
              className="contact-submit"
              type="submit"
              disabled={sending}
            >
              <span>
                {sending
                  ? 'SENDING...'
                  : "LET'S CONNECT"}
              </span>

              <ArrowUpRight size={19} />
            </button>

            <p
              className="contact-status"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          </form>
        </div>

        {/* SECTION 2: SOCIAL LINKS */}
        <aside className="contact-social-panel">
          <span className="form-eyebrow">
            ELSEWHERE ON THE INTERNET
          </span>

          <h3>
            Let's connect
            <br />
            beyond the code<span>.</span>
          </h3>

          <p className="social-description">
            I'm always happy to meet fellow developers,
            explore opportunities, and collaborate on
            meaningful ideas.
          </p>

          <div className="social-links">

            {/* GITHUB */}
            <a
              className="social-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
            >
              <span className="social-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={siGithub.path} />
                </svg>
              </span>

              <span className="social-link-text">
                <strong>GitHub</strong>
                <small>Explore my projects</small>
              </span>

              <ExternalLink
                size={17}
                className="social-arrow"
              />
            </a>

            {/* LINKEDIN */}
            <a
              className="social-link"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with me on LinkedIn"
            >
              <span className="social-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <svg
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8.01 18.5H5.03V9h2.98v9.5ZM6.52 7.7a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46ZM19 18.5h-2.97v-4.62c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.7H9.74V9h2.85v1.3h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.18Z"
  />
</svg>
                </svg>
              </span>

              <span className="social-link-text">
                <strong>LinkedIn</strong>
                <small>Let's grow our networks</small>
              </span>

              <ExternalLink
                size={17}
                className="social-arrow"
              />
            </a>

            {/* EMAIL */}
            <a
              className="social-link"
              href={`mailto:${EMAIL_ADDRESS}`}
              aria-label="Send me an email"
            >
              <span className="social-icon">
                <Mail size={22} />
              </span>

              <span className="social-link-text">
                <strong>Email</strong>
                <small>Start a conversation</small>
              </span>

              <ArrowUpRight
                size={19}
                className="social-arrow"
              />
            </a>
          </div>

          <div className="social-bottom">
            <span className="social-status-dot" />
            OPEN TO INTERESTING OPPORTUNITIES
          </div>
        </aside>
      </div>
    </section>
  )
}
