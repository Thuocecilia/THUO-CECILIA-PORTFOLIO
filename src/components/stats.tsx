
import { useEffect, useRef, useState } from "react";
import "./stats.css";

const stats = [
  {
    number: "10+",
    label: "Projects Built",
    detail: "Ideas turned into reality",
    symbol: "01",
  },
  {
    number: "—",
    label: "Organizations",
    detail: "Teams and people collaborated with",
    symbol: "02",
  },
  {
    number: "—",
    label: "Technologies",
    detail: "Tools used to build and create",
    symbol: "03",
  },
];

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`stats-section ${visible ? "stats-visible" : ""}`}
      ref={sectionRef}
      aria-label="Portfolio statistics"
    >
      <div className="stats-heading">
        <span className="stats-kicker">MY WORK</span>
        <h2>
          ONE PROJECT AT A TIME
        </h2>
        <p>A snapshot of the things I'm building and learning.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <article
            className="stat-card"
            key={stat.symbol}
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <span className="stat-index">{stat.symbol}</span>

            <div className="stat-number">{stat.number}</div>

            <h3 className="stat-title">{stat.label}</h3>

            <p className="stat-detail">{stat.detail}</p>

            <span className="stat-card-line" />
          </article>
        ))}
      </div>
    </section>
  );
}
