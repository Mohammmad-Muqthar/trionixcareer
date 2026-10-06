import { useEffect, useRef, useState } from "react";
import "./CareersFooter.css";

const footerGroups = [
  {
    title: "Subsidiaries",
    links: [
      ["EdgeVerve Systems", ""],
      ["Infosys BPM", ""],
      ["Infosys Consulting", ""],
      ["Infosys Public Services", ""],
    ],
  },
  {
    title: "Programs",
    links: [
      ["Infosys Foundation", ""],
      ["Infosys Foundation USA", ""],
      ["Infosys Science Foundation", ""],
      ["Infosys Leadership Institute", ""],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", ""],
      ["Investors", ""],
      ["Navigate your next", ""],
      ["Careers", ""],
      ["ESG", ""],
      ["Newsroom", ""],
      ["Alumni", ""],
    ],
  },
  {
    title: "Support",
    links: [
      ["Terms of Use", ""],
      ["Privacy Statement", ""],
      ["Cookie Policy", ""],
      ["Safe Harbour Provision", ""],
      ["Site Map", ""],
      ["Modern Slavery Statement", ""],
      ["Payment Guide for Suppliers", ""],
    ],
  },
];

const countries = [
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Croatia",
  "Czech",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Hong Kong",
  "Hungary",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Liechtenstein",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Mauritius",
  "Mexico",
  "New Zealand",
  "Norway",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "Southeast Asia",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "The Netherlands",
  "United Arab Emirates",
  "United Kingdom (UK)",
  "United States",
];

// Add your own social profile URLs in the empty strings.
const socialLinks = [
  ["Facebook", "", "facebook"],
  ["LinkedIn", "", "linkedin"],
  ["X", "", "x"],
  ["YouTube", "", "youtube"],
];

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.8 10h14.4M10 2.5c2 2.1 3 4.6 3 7.5s-1 5.4-3 7.5c-2-2.1-3-4.6-3-7.5s1-5.4 3-7.5Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="m3 6 5 5 5-5" />
    </svg>
  );
}

function SocialIcon({ type }) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.6V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V11H8v3h2.5v7h3Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 8.2H2.1V21h3.1V8.2ZM3.7 3a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM8.3 8.2h3v1.7h.1c.4-.8 1.5-2 3.6-2 3.9 0 4.6 2.5 4.6 5.8V21h-3.1v-6.4c0-1.6 0-3.5-2.1-3.5s-2.5 1.7-2.5 3.4V21H8.3V8.2Z" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21.4 7.2a2.7 2.7 0 0 0-1.9-1.9C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.5.5a2.7 2.7 0 0 0-1.9 1.9C2.2 8.9 2.2 12 2.2 12s0 3.1.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8Z" />
        <path
          d="m10.2 15.7 5.1-3.7-5.1-3.7v7.4Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18.9 2.5h3l-6.5 7.4L23 20.5h-6l-4.7-6.3-5.5 6.3H3.9l6.9-7.9L3.5 2.5h6.1l4.2 5.7 5.1-5.7Zm-1 16h1.6L8.7 4.2H7L17.9 18.5Z" />
    </svg>
  );
}

function BackToTopIcon() {
  return (
    <span className="site-footer__scroll-inner" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function CareersFooter() {
  const [openGroup, setOpenGroup] = useState(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const locationRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!locationOpen) return undefined;

    const closeLocation = (event) => {
      if (!locationRef.current?.contains(event.target)) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeLocation);

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeLocation
      );
    };
  }, [locationOpen]);

  const scrollToTop = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer" className="site-footer">
      <nav aria-label="Footer navigation">
        <div className="site-footer__container site-footer__main">
          <div className="site-footer__groups">
            {footerGroups.map((group, index) => {
              const linksId = `site-footer-links-${index}`;
              const isOpen = openGroup === index;

              return (
                <section
                  className="site-footer__group"
                  key={group.title}
                >
                  <button
                    type="button"
                    className="site-footer__group-heading"
                    aria-expanded={isOpen}
                    aria-controls={linksId}
                    onClick={() =>
                      setOpenGroup((current) =>
                        current === index ? null : index
                      )
                    }
                  >
                    <span>{group.title}</span>

                    <span className="site-footer__heading-chevron">
                      <ChevronDownIcon />
                    </span>
                  </button>

                  <ul
                    id={linksId}
                    className={`site-footer__links${
                      isOpen ? " is-open" : ""
                    }`}
                  >
                    {group.links.map(([label, href]) => (
                      <li key={label}>
                        <a
                          href={href || undefined}
                          title={label}
                          target={
                            href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__container">
            <div className="site-footer__bottom-grid">
              {/* LOCATION */}

              <div className="site-footer__location-column">
                <div
                  ref={locationRef}
                  className="site-footer__location"
                >
                  <button
                    type="button"
                    className="site-footer__location-button"
                    aria-label="Select Location"
                    aria-expanded={locationOpen}
                    aria-haspopup="listbox"
                    onClick={() =>
                      setLocationOpen((current) => !current)
                    }
                  >
                    <GlobeIcon />

                    <span>Location</span>

                    <span
                      className={`site-footer__location-chevron${
                        locationOpen ? " is-open" : ""
                      }`}
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>

                  {locationOpen && (
                    <div className="site-footer__location-menu">
                      <ul role="listbox" aria-label="Locations">
                        {countries.map((country) => (
                          <li key={country}>
                            <a
                              href={`#location-${country
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")}`}
                              onClick={() =>
                                setLocationOpen(false)
                              }
                            >
                              {country}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* COPYRIGHT */}

              <div className="site-footer__copyright-column">
                <p>Copyright © 2026 Infosys Limited</p>
              </div>

              {/* SOCIAL ICONS */}

              <div className="site-footer__social-column">
                <ul className="site-footer__social-list">
                  {socialLinks.map(([label, href, type]) => (
                    <li
                      className="site-footer__social-item"
                      key={label}
                    >
                      <a
                        className="site-footer__social-link"
                        href={href || undefined}
                        target={href ? "_blank" : undefined}
                        rel={href ? "noreferrer" : undefined}
                        title={`Follow us on ${label}`}
                        aria-label={`Follow us on ${label}`}
                      >
                        <span className="site-footer__social-icon site-footer__social-icon--top">
                          <SocialIcon type={type} />
                        </span>

                        <span className="site-footer__social-icon site-footer__social-icon--bottom">
                          <SocialIcon type={type} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* BACK TO TOP */}

      <button
        type="button"
        className={`site-footer__scroll-up${
          showTop ? " show" : ""
        }`}
        title="Go to Top"
        aria-label="Go to Top"
        onClick={scrollToTop}
      >
        <span className="site-footer__scroll-circle">
          <BackToTopIcon />
        </span>
      </button>
    </footer>
  );
}