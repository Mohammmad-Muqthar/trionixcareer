import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./CareersCTA.css";

const CTA_CONTENT = {
  heading: "Your next chapter starts here.",

  description:
    "Bring your ideas, curiosity, and ambition. Explore opportunities to grow and create meaningful work with Trionix Global.",

  buttonText: "Explore open positions",
  buttonLink: "#careers-openings",

  // Replace this URL with your actual team photograph when ready.
  image:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=90",
};

const EASE = [0.22, 1, 0.36, 1];

export default function CareersCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="careers-cta"
      aria-labelledby="careers-cta-heading"
    >
      <div className="careers-cta__container">
        <div className="careers-cta__banner">
          {/* LEFT — TEXT AND CTA */}

          <motion.div
            className="careers-cta__content"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
          >
            <h2
              id="careers-cta-heading"
              className="careers-cta__heading"
            >
              {CTA_CONTENT.heading}
            </h2>

            <p className="careers-cta__description">
              {CTA_CONTENT.description}
            </p>

            <a
              href={CTA_CONTENT.buttonLink}
              className="careers-cta__button"
            >
              <span>{CTA_CONTENT.buttonText}</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* RIGHT — ONE IMAGE ONLY */}

          <motion.div
            className="careers-cta__image-wrap"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.1,
              ease: EASE,
            }}
          >
            <img
              className="careers-cta__image"
              src={CTA_CONTENT.image}
              alt="Colleagues collaborating around a table"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}