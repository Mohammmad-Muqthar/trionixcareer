import { motion, useReducedMotion } from "framer-motion";
import "./CareersHero.css";

const EASE = [0.22, 1, 0.36, 1];

/*
  Replace this temporary background image with your own:

  const HERO_IMAGE = "/images/careers-hero-bg.jpg";
*/

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90";

export default function CareersHero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0, distance = 24) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: distance,
        },

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: {
      duration: reduceMotion ? 0 : 0.9,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      className="careers-hero"
      id="careers-home"
      aria-labelledby="careers-hero-title"
    >
      {/* BACKGROUND IMAGE */}

      <div className="careers-hero__background" aria-hidden="true">
        <img
          src={HERO_IMAGE}
          alt=""
          className="careers-hero__background-image"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* DARK GRADIENT OVERLAY */}

      <div className="careers-hero__overlay" aria-hidden="true" />

      {/* CENTERED HERO CONTENT */}

      <div className="careers-hero__container">
        <motion.h1
          id="careers-hero-title"
          className="careers-hero__heading"
          {...reveal(0.1, 32)}
        >
          Your ideas.
          <br />
          Your ambition.
          <br />
          <span>Your next chapter.</span>
        </motion.h1>

        <motion.p
          className="careers-hero__description"
          {...reveal(0.25, 20)}
        >
          Discover a career where creativity, data, and
          technology come together. Bring your perspective
          and explore what you could build with Trionix Global.
        </motion.p>

        <motion.div
          className="careers-hero__actions"
          {...reveal(0.4, 16)}
        >
          <a
            href="#careers-openings"
            className="careers-hero__button"
          >
            Explore opportunities
          </a>
        </motion.div>
      </div>
    </section>
  );
}