import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "./CareersCulture.css";

const EASE = [0.22, 1, 0.36, 1];

/*
  SAMPLE DATA

  These are demonstration images and YouTube videos,
  not actual Trionix Global employee interviews.

  Replace the data below with your real employee
  interview details when they are available.
*/

const employeeVideos = [
  {
    id: "employee-1",
    title: "Life at Trionix Global",
    caption:
      "Discover the people, experiences, and ideas behind our everyday work.",
    thumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=90",
    youtubeUrl:
      "https://www.youtube.com/watch?v=M7lc1UVf-VE",
  },
  {
    id: "employee-2",
    title: "Growing Together",
    caption:
      "Hear how teamwork and fresh perspectives create opportunities to learn.",
    thumbnail:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=90",
    youtubeUrl:
      "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    id: "employee-3",
    title: "The Creative Journey",
    caption:
      "Explore the curiosity and collaboration that inspire meaningful work.",
    thumbnail:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=90",
    youtubeUrl:
      "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
  {
    id: "employee-4",
    title: "Building What Comes Next",
    caption:
      "See how different skills and ideas come together across our teams.",
    thumbnail:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=90",
    youtubeUrl:
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
];

/* =========================================================
   YOUTUBE ID
========================================================= */

function getYouTubeId(youtubeUrl) {
  try {
    const url = new URL(youtubeUrl);
    const hostname = url.hostname
      .replace(/^www\./, "")
      .replace(/^m\./, "");

    let id = "";

    if (hostname === "youtu.be") {
      id = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (
      hostname === "youtube.com" ||
      hostname === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        id = url.searchParams.get("v") || "";
      } else if (
        url.pathname.startsWith("/embed/") ||
        url.pathname.startsWith("/shorts/")
      ) {
        id = url.pathname.split("/").filter(Boolean)[1] || "";
      }
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : "";
  } catch {
    return "";
  }
}

/* =========================================================
   PLAY ICON
========================================================= */

function PlayIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M12 7.5C12 5.5 14.2 4.3 15.9 5.4L34 17.8C35.5 18.8 35.5 21.2 34 22.2L15.9 34.6C14.2 35.7 12 34.5 12 32.5V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* =========================================================
   EMPLOYEE VIDEO CARD
========================================================= */

function EmployeeVideoCard({
  video,
  index,
  isPlaying,
  onPlay,
  reduceMotion,
}) {
  const youtubeId = getYouTubeId(video.youtubeUrl);

  return (
    <motion.article
      className="careers-culture__card"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
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
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
    >
      <div className="careers-culture__video-frame">
        {isPlaying && youtubeId ? (
          /* VIDEO PLAYS INSIDE THE CARD */

          <iframe
            className="careers-culture__iframe"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&playsinline=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          /* NEW THUMBNAIL — NO BRAND TEXT */

          <button
            type="button"
            className="careers-culture__video-button"
            onClick={() => onPlay(video.id)}
            aria-label={`Play ${video.title}`}
            disabled={!youtubeId}
          >
            <img
              src={video.thumbnail}
              alt=""
              className="careers-culture__thumbnail"
              loading="lazy"
              decoding="async"
            />

            <span
              className="careers-culture__image-overlay"
              aria-hidden="true"
            />

            <span className="careers-culture__image-title">
              {video.title}
            </span>

            <span
              className="careers-culture__play-button"
              aria-hidden="true"
            >
              <PlayIcon />
            </span>
          </button>
        )}
      </div>

      <h3 className="careers-culture__caption">
        {video.caption}
      </h3>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CareersCulture() {
  const reduceMotion = useReducedMotion();

  const sliderRef = useRef(null);
  const cardsRef = useRef([]);

  const activePageRef = useRef(0);

  const [cardsPerPage, setCardsPerPage] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 650px)").matches
      ? 1
      : 2
  );

  const [activePage, setActivePage] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const totalPages = Math.ceil(
    employeeVideos.length / cardsPerPage
  );

  /* =====================================================
     RESPONSIVE LAYOUT

     Desktop: 2 cards per page
     Mobile: 1 card per page
  ===================================================== */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 650px)"
    );

    const updateLayout = () => {
      setCardsPerPage(mediaQuery.matches ? 1 : 2);

      activePageRef.current = 0;
      setActivePage(0);
      setPlayingVideoId(null);

      sliderRef.current?.scrollTo({
        left: 0,
        behavior: "instant",
      });
    };

    updateLayout();

    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateLayout
      );
    };
  }, []);

  /* =====================================================
     GO TO CAROUSEL PAGE
  ===================================================== */

  const goToPage = (pageIndex) => {
    const slider = sliderRef.current;
    const firstCard = cardsRef.current[0];

    const targetIndex = pageIndex * cardsPerPage;
    const targetCard = cardsRef.current[targetIndex];

    if (!slider || !firstCard || !targetCard) return;

    const maximumScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    const targetLeft = Math.min(
      targetCard.offsetLeft - firstCard.offsetLeft,
      maximumScroll
    );

    /* Stop playback when changing pages */

    if (pageIndex !== activePageRef.current) {
      setPlayingVideoId(null);
    }

    activePageRef.current = pageIndex;
    setActivePage(pageIndex);

    slider.scrollTo({
      left: targetLeft,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  /* =====================================================
     LEFT / RIGHT BUTTONS
  ===================================================== */

  const previousPage = () => {
    if (activePageRef.current <= 0) return;

    goToPage(activePageRef.current - 1);
  };

  const nextPage = () => {
    if (activePageRef.current >= totalPages - 1) return;

    goToPage(activePageRef.current + 1);
  };

  /* =====================================================
     UPDATE PAGINATION ON MOBILE SWIPE
  ===================================================== */

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    const firstCard = cardsRef.current[0];

    if (!slider || !firstCard) return;

    const maximumScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    let nearestPage = 0;
    let nearestDistance = Infinity;

    for (
      let pageIndex = 0;
      pageIndex < totalPages;
      pageIndex += 1
    ) {
      const targetIndex = pageIndex * cardsPerPage;
      const targetCard = cardsRef.current[targetIndex];

      if (!targetCard) continue;

      const targetLeft = Math.min(
        targetCard.offsetLeft - firstCard.offsetLeft,
        maximumScroll
      );

      const distance = Math.abs(
        slider.scrollLeft - targetLeft
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = pageIndex;
      }
    }

    if (nearestPage !== activePageRef.current) {
      activePageRef.current = nearestPage;
      setActivePage(nearestPage);

      /* Stop the video when its page is no longer active */

      setPlayingVideoId(null);
    }
  };

  return (
    <section
      className="careers-culture"
      id="careers-culture"
      aria-labelledby="careers-culture-heading"
    >
      <div className="careers-culture__container">
        {/* CENTERED HEADING — NO DECORATIVE LINES */}

        <motion.div
          className="careers-culture__header"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            duration: reduceMotion ? 0 : 0.75,
            ease: EASE,
          }}
        >
          <h2
            id="careers-culture-heading"
            className="careers-culture__heading"
          >
            Hear From Our Employees
          </h2>

          <p className="careers-culture__subtitle">
            Explore the people, perspectives, and ideas behind
            life at Trionix Global.
          </p>
        </motion.div>

        {/* CAROUSEL WITH BUTTONS ON BOTH SIDES */}

        <div className="careers-culture__carousel">
          {/* LEFT BUTTON */}

          <button
            type="button"
            className="careers-culture__nav careers-culture__nav--prev"
            onClick={previousPage}
            disabled={activePage === 0}
            aria-label="Previous employee videos"
          >
            <ChevronLeft size={25} strokeWidth={1.8} />
          </button>

          {/* VIDEO TRACK */}

          <div
            ref={sliderRef}
            className="careers-culture__slider"
            onScroll={handleSliderScroll}
            aria-label="Employee video carousel"
          >
            {employeeVideos.map((video, index) => (
              <div
                className="careers-culture__slide"
                key={video.id}
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
              >
                <EmployeeVideoCard
                  video={video}
                  index={index}
                  isPlaying={playingVideoId === video.id}
                  onPlay={setPlayingVideoId}
                  reduceMotion={reduceMotion}
                />
              </div>
            ))}
          </div>

          {/* RIGHT BUTTON */}

          <button
            type="button"
            className="careers-culture__nav careers-culture__nav--next"
            onClick={nextPage}
            disabled={activePage === totalPages - 1}
            aria-label="Next employee videos"
          >
            <ChevronRight size={25} strokeWidth={1.8} />
          </button>
        </div>

        {/* PAGINATION DOTS */}

        <div
          className="careers-culture__pagination"
          aria-label="Employee video carousel pages"
        >
          {Array.from({ length: totalPages }).map(
            (_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                className={`careers-culture__pagination-dot${
                  activePage === pageIndex
                    ? " careers-culture__pagination-dot--active"
                    : ""
                }`}
                aria-label={`Show video group ${pageIndex + 1}`}
                aria-current={
                  activePage === pageIndex ? "page" : undefined
                }
                onClick={() => goToPage(pageIndex)}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}