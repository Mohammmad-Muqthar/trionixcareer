import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import "./CareersTeamValues.css";

const EASE = [0.22, 1, 0.36, 1];

/*
  DEMO EMPLOYEE STORIES

  Replace the sample photographs and messages with
  genuine, approved employee content before launch.
*/

const teamStories = [
  {
    id: "creative",

    title: "Creating with different perspectives.",

    quote:
      "The best part of creative work is seeing different perspectives come together to make an idea stronger.",

    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=90",

    fullMessage: [
      "For me, the most valuable part of working with a creative team is having the opportunity to exchange ideas. Everyone approaches a challenge differently, and those different perspectives help us discover possibilities we may not have considered on our own.",

      "I enjoy the process of taking an early concept, questioning it, improving it, and shaping it into something meaningful. Collaboration makes that process more interesting because every conversation brings a new way of looking at the work.",

      "What I value most is having the space to keep learning, experiment with ideas, and contribute my own perspective while respecting the strengths of the people around me.",
    ],
  },

  {
    id: "technology",

    title: "Staying curious. Building what comes next.",

    quote:
      "I value being part of a team where curiosity is encouraged and every challenge is an opportunity to learn.",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=90",

    fullMessage: [
      "Technology is constantly evolving, and that is what makes the work exciting for me. There is always a new tool to understand, a problem to explore, or a different approach worth considering.",

      "I appreciate working with people who are willing to ask questions and share what they know. Learning becomes much more valuable when it happens through real projects and open conversations with the team.",

      "The opportunity to keep improving my skills while contributing to meaningful work is what motivates me to approach each new challenge with curiosity.",
    ],
  },

  {
    id: "marketing",

    title: "Better ideas begin with collaboration.",

    quote:
      "Great ideas become even better when strategy, creativity, and technology work together.",

    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=90",

    fullMessage: [
      "One of the things I enjoy about digital marketing is how many different skills contribute to a successful project. Understanding an audience, shaping a message, designing an experience, and measuring results all require different ways of thinking.",

      "Working across these areas gives me a broader perspective. It also reminds me that the strongest ideas often develop through collaboration rather than individual effort alone.",

      "I value being able to learn from people with different expertise and use those insights to improve the work we create together.",
    ],
  },

  {
    id: "data",

    title: "Finding possibilities in complex challenges.",

    quote:
      "Turning complex information into practical solutions is what makes the work meaningful to me.",

    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=90",

    fullMessage: [
      "Working with data and emerging technology involves more than understanding tools. It also means asking the right questions, looking closely at a problem, and deciding how information can support a useful outcome.",

      "I enjoy the combination of analytical thinking and teamwork. Discussing a challenge with people from other disciplines often reveals practical considerations that may not be obvious from a technical perspective alone.",

      "What motivates me is the opportunity to keep exploring new possibilities and apply what I learn to work that has a clear purpose.",
    ],
  },

  {
    id: "design",

    title: "Growing through every new idea.",

    quote:
      "Having room to experiment, ask questions, and keep improving makes the creative process exciting.",

    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=90",

    fullMessage: [
      "Design is a process of exploration. An early idea might change many times before it becomes the right solution, and I believe that willingness to experiment is an important part of good work.",

      "I value environments where feedback can be shared openly and where learning continues throughout a project. Every new challenge introduces a different perspective and an opportunity to improve the way I think about design.",

      "For me, growth comes from staying open to new ideas, learning from others, and remaining curious about what could be done differently.",
    ],
  },
];

/* =========================================================
   EMPLOYEE STORY CARD
========================================================= */

function StoryCard({
  story,
  index,
  onOpen,
  reduceMotion,
}) {
  return (
    <motion.article
      className="team-values__card"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 32,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : (index % 3) * 0.1,
        ease: EASE,
      }}
    >
      {/* LARGE CARD PHOTOGRAPH */}

      <div className="team-values__card-image">
        <img
          src={story.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* CARD CONTENT — NO SMALL TEAM HEADING */}

      <div className="team-values__card-content">
        <h3 className="team-values__card-title">
          {story.title}
        </h3>

        <p className="team-values__card-quote">
          “{story.quote}”
        </p>

        {/* READ MORE LINK */}

        <button
          type="button"
          className="team-values__read-more"
          onClick={(event) => onOpen(story, event)}
          aria-label={`Read more: ${story.title}`}
        >
          <span>Read more</span>

          <ArrowRight
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  );
}

/* =========================================================
   POPUP — SLOW ANIMATION, TEXT ONLY
========================================================= */

function StoryPopup({
  story,
  onClose,
  reduceMotion,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  /* LOCK BACKGROUND SCROLL + KEYBOARD ACCESSIBILITY */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable =
        dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      cancelAnimationFrame(focusFrame);

      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <motion.div
      className="team-values-popup"
      initial={
        reduceMotion
          ? false
          : { opacity: 0 }
      }
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        ease: "easeInOut",
      }}
    >
      {/* DIMMED PAGE BACKGROUND */}

      <div
        className="team-values-popup__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* SLOWLY ANIMATED CENTERED PANEL */}

      <motion.div
        ref={dialogRef}
        className="team-values-popup__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-values-popup-title"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.82,
                y: 65,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={
          reduceMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                scale: 0.88,
                y: 45,
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.95,
          ease: EASE,
        }}
      >
        {/* CLOSE BUTTON */}

        <button
          ref={closeButtonRef}
          type="button"
          className="team-values-popup__close"
          onClick={onClose}
          aria-label="Close employee story"
        >
          <X
            size={19}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>

        {/* STORY CONTENT — NO TEAM LABEL */}

        <div className="team-values-popup__scroll">
          <motion.div
            className="team-values-popup__story"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    filter: "blur(5px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: 14,
                    filter: "blur(3px)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              delay: reduceMotion ? 0 : 0.16,
              ease: EASE,
            }}
          >
            <h2
              id="team-values-popup-title"
              className="team-values-popup__title"
            >
              {story.title}
            </h2>

            <blockquote className="team-values-popup__quote">
              “{story.quote}”
            </blockquote>

            <div className="team-values-popup__message">
              {story.fullMessage.map(
                (paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 16,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.65,
                      delay: reduceMotion
                        ? 0
                        : 0.34 + index * 0.12,
                      ease: EASE,
                    }}
                  >
                    {paragraph}
                  </motion.p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN TEAM VALUES COMPONENT
========================================================= */

export default function CareersTeamValues() {
  const reduceMotion = useReducedMotion();

  const sliderRef = useRef(null);
  const cardsRef = useRef([]);
  const activeSlideRef = useRef(0);
  const lastOpenButtonRef = useRef(null);

  const [visibleCards, setVisibleCards] = useState(() => {
    if (typeof window === "undefined") return 3;

    if (
      window.matchMedia("(max-width: 650px)").matches
    ) {
      return 1;
    }

    if (
      window.matchMedia("(max-width: 980px)").matches
    ) {
      return 2;
    }

    return 3;
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const [selectedStory, setSelectedStory] =
    useState(null);

  const maximumSlide = Math.max(
    0,
    teamStories.length - visibleCards
  );

  /* =====================================================
     RESPONSIVE CAROUSEL

     Desktop: 3 cards
     Tablet:  2 cards
     Mobile:  1 card
  ===================================================== */

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      "(max-width: 650px)"
    );

    const tabletQuery = window.matchMedia(
      "(max-width: 980px)"
    );

    const updateLayout = () => {
      const nextVisibleCards = mobileQuery.matches
        ? 1
        : tabletQuery.matches
          ? 2
          : 3;

      setVisibleCards(nextVisibleCards);

      activeSlideRef.current = 0;
      setActiveSlide(0);

      sliderRef.current?.scrollTo({
        left: 0,
        behavior: "instant",
      });
    };

    mobileQuery.addEventListener(
      "change",
      updateLayout
    );

    tabletQuery.addEventListener(
      "change",
      updateLayout
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        updateLayout
      );

      tabletQuery.removeEventListener(
        "change",
        updateLayout
      );
    };
  }, []);

  /* =====================================================
     CAROUSEL NAVIGATION
  ===================================================== */

  const goToSlide = (index) => {
    const slider = sliderRef.current;
    const firstCard = cardsRef.current[0];

    const nextIndex = Math.max(
      0,
      Math.min(maximumSlide, index)
    );

    const targetCard = cardsRef.current[nextIndex];

    if (!slider || !firstCard || !targetCard) {
      return;
    }

    const maximumScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    const targetLeft = Math.min(
      targetCard.offsetLeft - firstCard.offsetLeft,
      maximumScroll
    );

    activeSlideRef.current = nextIndex;
    setActiveSlide(nextIndex);

    slider.scrollTo({
      left: targetLeft,
      behavior: reduceMotion
        ? "instant"
        : "smooth",
    });
  };

  const previousSlide = () => {
    goToSlide(activeSlideRef.current - 1);
  };

  const nextSlide = () => {
    goToSlide(activeSlideRef.current + 1);
  };

  /* =====================================================
     SYNC CONTROLS WHEN USER SWIPES
  ===================================================== */

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    const firstCard = cardsRef.current[0];
    const secondCard = cardsRef.current[1];

    if (!slider || !firstCard || !secondCard) {
      return;
    }

    const step =
      secondCard.offsetLeft - firstCard.offsetLeft;

    if (step <= 0) return;

    const index = Math.round(
      slider.scrollLeft / step
    );

    const nextIndex = Math.max(
      0,
      Math.min(maximumSlide, index)
    );

    activeSlideRef.current = nextIndex;
    setActiveSlide(nextIndex);
  };

  /* =====================================================
     POPUP
  ===================================================== */

  const openStory = (story, event) => {
    lastOpenButtonRef.current =
      event.currentTarget;

    setSelectedStory(story);
  };

  const closePopup = useCallback(() => {
    setSelectedStory(null);
  }, []);

  return (
    <>
      <section
        className="careers-team-values"
        id="careers-team-values"
        aria-labelledby="careers-team-values-heading"
      >
        <div className="team-values__container">
          {/* CENTERED HEADING */}

          <motion.h2
            id="careers-team-values-heading"
            className="team-values__heading"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
          >
            What makes work meaningful.
          </motion.h2>

          {/* CAROUSEL */}

          <div className="team-values__carousel">
            {/* PREVIOUS BUTTON */}

            <button
              type="button"
              className="team-values__carousel-arrow team-values__carousel-arrow--prev"
              onClick={previousSlide}
              disabled={activeSlide === 0}
              aria-label="Previous employee story cards"
            >
              <ChevronLeft
                size={24}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>

            {/* SLIDING CARDS */}

            <div
              ref={sliderRef}
              className="team-values__slider"
              onScroll={handleSliderScroll}
              aria-label="Employee story carousel"
            >
              {teamStories.map((story, index) => (
                <div
                  className="team-values__slide"
                  key={story.id}
                  ref={(element) => {
                    cardsRef.current[index] =
                      element;
                  }}
                >
                  <StoryCard
                    story={story}
                    index={index}
                    onOpen={openStory}
                    reduceMotion={reduceMotion}
                  />
                </div>
              ))}
            </div>

            {/* NEXT BUTTON */}

            <button
              type="button"
              className="team-values__carousel-arrow team-values__carousel-arrow--next"
              onClick={nextSlide}
              disabled={activeSlide >= maximumSlide}
              aria-label="Next employee story cards"
            >
              <ChevronRight
                size={24}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>

      {/* TEXT-ONLY POPUP */}

      {createPortal(
        <AnimatePresence
          onExitComplete={() => {
            lastOpenButtonRef.current?.focus();
          }}
        >
          {selectedStory && (
            <StoryPopup
              key={selectedStory.id}
              story={selectedStory}
              onClose={closePopup}
              reduceMotion={reduceMotion}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}