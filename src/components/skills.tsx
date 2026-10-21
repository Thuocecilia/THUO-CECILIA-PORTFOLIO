import { useState } from 'react'
import './skilss.css'

interface SkillBox {
  id: number
  title: string
  category: string
  skills: string[]
  description: string
}

const skillBoxes: SkillBox[] = [
  { id: 1,
    title: "FRONTEND DEVELOPER",
    category: "01 / FRONTEND DEVELOPMENT",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "UI/UX Implementation",
    ],
    description:
      "I build responsive, interactive web experiences with clean interfaces, thoughtful user experiences and modern frontend technologies.",
  },
  {
     id: 2,
    title: "BACKEND DEVELOPER",
    category: "02 / BACKEND DEVELOPMENT",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Authentication & JWT",
      "Database Design",
    ],
    description:
      "I develop server-side applications, design APIs, manage databases and build the reliable systems that power modern web applications.",
  },
  {
    id:3,
    title: "PRODUCTMANAGEMENT",
    category: "03 / PRODUCT MANAGEMENT",
    skills: [
      "Product Strategy",
      "Roadmapping",
      "User Research",
      "Wireframing & Prototyping",
      "Agile Methodologies",
      "Stakeholder Communication",
    ],
    description:
      "I combine technical expertise with product thinking to define product vision, prioritize features and deliver solutions that meet user needs.",
  },
]

export default function Skills() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section className="hero-skills-container" id="skills">
      <aside className="profile-aside" id="about">
        <div className="avatar-wrapper">
          <img
            src="/images/profile.jpg"
            alt="Thuo's profile"
            className="profile-avatar"
          />
          <span className="role-badge">AVAILABLE TO BUILD</span>
        </div>

        <p className="profile-kicker">DEVELOPER · CREATOR · INNOVATOR</p>

        <h1 className="hero-title">
          Hi, I'm <span className="highlight-name">Thuo.</span>
        </h1>

        <p className="hero-bio">
          I turn ideas into digital experiences. I enjoy building web
          applications, exploring product strategy and approaching challenges
          with an engineer's mindset.
        </p>

        <div className="profile-focus">
          <span className="focus-indicator" />
          <span>Full-Stack Development & Product Thinking</span>
        </div>

        <div className="hero-cta-group">
          <a href="#work" className="btn-primary">
            EXPLORE MY WORK <span>↗</span>
          </a>
          <a href="#contact" className="btn-secondary">
            LET'S CONNECT <span>↗</span>
          </a>
        </div>

        <p className="profile-footer">CURIOUS BY NATURE. BUILT TO CREATE.</p>
      </aside>

      <div className="skills-content">
        <header className="skills-heading">
          <span className="skills-eyebrow">MY EXPERTISE / 001—003</span>
          <h2>
            Skills that turn
            <br />
            <span>ideas into reality.</span>
          </h2>
          <p>
            Explore the disciplines, tools and ideas shaping the work I build.
          </p>
        </header>

        <div className="skills-timeline-wrapper">
          <div className="straight-timeline-line" aria-hidden="true" />

          {skillBoxes.map((box, index) => {
            const isExpanded = expandedId === box.id
            const theme = index % 2 === 0 ? 'theme-blue' : 'theme-mint'
            const side = index % 2 === 0 ? 'row-left' : 'row-right'

            return (
              <div className={`skill-card-row ${side}`} key={box.id}>
                <span
                  className={`timeline-dot ${theme} ${isExpanded ? 'dot-active' : ''}`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  className={`skill-box ${theme} ${isExpanded ? 'expanded' : ''}`}
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedId(isExpanded ? null : box.id)
                  }
                >
                  <span className="skill-card-top">
                    <span className="skill-category-badge">
                      {box.category}
                    </span>
                    <span className="skill-number">
                      0{box.id}
                    </span>
                  </span>

                  <h3 className="skill-title">{box.title}</h3>

                  <ul className="skills-list">
                    {box.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>

                  <span className="skill-description">
                    {box.description}
                  </span>

                  <span className="click-hint">
                    {isExpanded ? 'SHOW LESS −' : 'EXPLORE ROLE +'}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}