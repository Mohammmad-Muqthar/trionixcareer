import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "./CareersNavbar.css";

const LOGO = "/images/trionixlogo.png";

const navLinks = [
  { label: "Overview", href: "#careers-home" },
  { label: "Life at Trionix", href: "#careers-culture" },
  { label: "Open positions", href: "#careers-openings" },
];

export default function CareersNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`careers-navbar${
        isScrolled ? " careers-navbar--scrolled" : ""
      }`}
    >
      <div className="careers-navbar__container">
        {/* MOBILE HAMBURGER — LEFT */}

        <button
          type="button"
          className="careers-navbar__menu-button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="careers-mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? (
            <X size={23} strokeWidth={1.8} />
          ) : (
            <Menu size={23} strokeWidth={1.8} />
          )}
        </button>

        {/* LOGO ONLY — NO "CAREERS" LABEL */}

        <a
          href="#careers-home"
          className="careers-navbar__brand"
          onClick={closeMenu}
          aria-label="Trionix Global Careers home"
        >
          <img
            src={LOGO}
            alt="Trionix Global"
            className="careers-navbar__logo"
          />
        </a>

        {/* DESKTOP LINKS */}

        <nav
          className="careers-navbar__desktop-nav"
          aria-label="Careers navigation"
        >
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* NEW OUTLINED EXPLORE BUTTON */}

        <a href="#careers-openings" className="careers-navbar__cta">
          Explore openings
        </a>

        {/* MOBILE SPACER KEEPS LOGO EXACTLY CENTERED */}

        <span
          className="careers-navbar__mobile-spacer"
          aria-hidden="true"
        />
      </div>

      {/* MOBILE MENU — NO NUMBERS OR ARROWS */}

      <nav
        id="careers-mobile-menu"
        className={`careers-navbar__mobile-menu${
          isMenuOpen ? " careers-navbar__mobile-menu--open" : ""
        }`}
        aria-label="Mobile careers navigation"
        inert={!isMenuOpen}
      >
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}

        <a
          href="#careers-openings"
          className="careers-navbar__mobile-cta"
          onClick={closeMenu}
        >
          Explore openings
        </a>
      </nav>
    </header>
  );
}