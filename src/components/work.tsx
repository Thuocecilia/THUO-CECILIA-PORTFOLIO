
import { useEffect, useState } from 'react'
import './work.css'

type Project = {
  name: string
  description: string
  category: string
  link: string
  screenshots: string[]
}

const projects: Project[] = [
  {
    name: 'MobiDoc',
    description:
      'A healthcare platform concept that helps people discover nearby doctors and access essential health services.',
    category: 'HEALTH TECHNOLOGY',
    link: 'https://github.com/mern-final-project-Thuocecilia/MobiDoc',
    screenshots: [
      '/images/projects/mobidoc-1.jpg',
      '/images/projects/mobidoc-2.jpg',
      '/images/projects/mobidoc-3.jpg',
    ],
  },
  {
    name: 'product management',
    description:
      'A civil-engineering platform connecting construction professionals, skilled workers, and equipment resources.',
    category: 'product management',
    link: 'https://eu.wps.com/cms/docs/d/cbOakj0PJjVgZD3K?platform=pc&refer=copylink',
    screenshots: [
      '/images/product-management-1.jpg',
      '/images/product-management-2.jpg',
      '/images/product-management-3.jpg',
    ],
  },
  {
    name: 'HerRise Network',
    description:
      'A community-focused platform supporting girls and women through education, empowerment, and digital access.',
    category: 'SOCIAL IMPACT',
    link: 'http://127.0.0.1:5501/Landing%20page/index.html',
    screenshots: [
      '/images/herrise-1.jpg',
      '/images/herrise-2.jpg',
      '/images/herrise-3.jpg',
    ],
  },
  {
    name: 'Recipe Finder',
    description:
      'A recipe-discovery experience designed to help people explore meal ideas through a clean, intuitive interface.',
    category: 'WEB DEVELOPMENT',
    link: 'https://github.com/Thuocecilia/RECIPE-FINDER.git ',
    screenshots: [
      '/images/recipe-finder-1.jpg',
      '/images/recipe-finder-2.jpg',
      '/images/recipe-finder-3.jpg',
    ],
  },
]

function ProjectSlideshow({
  project,
}: {
  project: Project
}) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [failedImages, setFailedImages] = useState<string[]>([])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % project.screenshots.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [project.screenshots.length])

  function previousSlide() {
    setActiveSlide(
      (current) =>
        (current - 1 + project.screenshots.length) %
        project.screenshots.length,
    )
  }

  function nextSlide() {
    setActiveSlide(
      (current) => (current + 1) % project.screenshots.length,
    )
  }

  const screenshot = project.screenshots[activeSlide]
  const imageFailed = failedImages.includes(screenshot)

  return (
    <div className="project-showcase">
      <div className="project-browser-bar">
        <div className="browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <span className="browser-project-name">{project.name}</span>

        <span className="browser-live-indicator">
          <span />
          PROJECT PREVIEW
        </span>
      </div>

      <div className="project-slideshow">
        {project.screenshots.map((image, index) => (
          <div
            key={image}
            className={`project-slide ${
              index === activeSlide ? 'project-slide-active' : ''
            }`}
            aria-hidden={index !== activeSlide}
          >
            {!failedImages.includes(image) ? (
              <img
                src={image}
                alt={`${project.name} screenshot ${index + 1}`}
                loading="lazy"
                onError={() =>
                  setFailedImages((current) =>
                    current.includes(image) ? current : [...current, image],
                  )
                }
              />
            ) : (
              <div className="screenshot-placeholder">
                <span className="placeholder-symbol">↗</span>
                <h4>{project.name}</h4>
                <p>Add your project screenshot here</p>
                <code>{image}</code>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          className="slide-arrow slide-arrow-left"
          onClick={previousSlide}
          aria-label={`Previous ${project.name} screenshot`}
        >
          ←
        </button>

        <button
          type="button"
          className="slide-arrow slide-arrow-right"
          onClick={nextSlide}
          aria-label={`Next ${project.name} screenshot`}
        >
          →
        </button>

        <div className="slide-indicators" aria-label="Choose screenshot">
          {project.screenshots.map((image, index) => (
            <button
              type="button"
              key={image}
              className={`slide-indicator ${
                index === activeSlide ? 'slide-indicator-active' : ''
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show screenshot ${index + 1}`}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>

        <span className="slide-counter">
          {String(activeSlide + 1).padStart(2, '0')} /{' '}
          {String(project.screenshots.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section className="work-section" id="work">
      <div className="work-container">
        <header className="work-heading">
          <h2 className="work-title">
            <span className="title-ideas">Ideas into</span>{' '}
            <span className="title-reality">reality.</span>
          </h2>
        </header>

        <div className="work-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <ProjectSlideshow project={project} />

              <div className="project-content">
                <div className="project-text">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <h3>{project.name}</h3>

                  <p>{project.description}</p>
                </div>

                <a
                  className="project-view-link"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  View Project <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <footer className="work-footer">
          <a href="#contact">
            LET'S BUILD SOMETHING <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  )
}
