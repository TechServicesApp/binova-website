"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MoveRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80",
    category: "Our Vision",
    title: "World Leading Conglomerate",
    subtitle: "Bridging Continents · Creating Value",
    description: "An international group connecting North America to Central Africa, investing in 14+ sectors for sustainable growth and excellence-driven projects.",
    accent: "#135B34",
    index: "01",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
    category: "Our Services",
    title: "End-to-End Solutions",
    subtitle: "From Feasibility to Delivery",
    description: "Feasibility studies, design & execution, equipment supply and project management. Comprehensive solutions built on decades of expertise.",
    accent: "#D4AF37",
    index: "02",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80",
    category: "Innovation",
    title: "Smart Industries",
    subtitle: "State-of-the-Art Solutions",
    description: "Intelligent industries redefining standards across every sector with minimal environmental footprint and maximum positive impact.",
    accent: "#1a8a4c",
    index: "03",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1800&q=80",
    category: "Excellence",
    title: "50+ Experts",
    subtitle: "2 Continents · 14+ Sectors",
    description: "A world-class team united by a passion for excellence. From finance to agriculture, energy to telecommunications, we are building the future.",
    accent: "#135B34",
    index: "04",
  },
];

const DURATION = 5500;

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setCurrent(index);
    setProgress(0);
    startTimeRef.current = performance.now();
    if (progressRef.current) clearInterval(progressRef.current);
  }, [current]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    startTimeRef.current = performance.now();
    const tick = () => {
      if (!startTimeRef.current) return;
      const elapsed = performance.now() - startTimeRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p >= 1) next();
    };
    progressRef.current = setInterval(tick, 16);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, next]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4] pt-20">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.45, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(0.2) brightness(1.05)',
          }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/65 to-white/30" />
      
      {/* Blur effect on text side */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent backdrop-blur-lg" 
        style={{
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 70%)',
          maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 70%)',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-15"
        style={{ 
          background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}20 0%, transparent 60%)` 
        }}
      />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Background Index */}
      <div 
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 pointer-events-none select-none font-display text-[clamp(140px,18vw,220px)] font-bold tracking-tighter"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px rgba(19,91,52,0.04)',
        }}
      >
        {slide.index}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              {/* Category Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-6 flex items-center gap-3"
              >
                <div 
                  className="h-px w-8 transition-colors"
                  style={{ background: slide.accent }}
                />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#4A5568]">
                  {slide.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-5 font-display text-6xl font-bold leading-[0.95] tracking-tight text-[#2D3748] md:text-7xl lg:text-8xl"
              >
                {slide.title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="italic" style={{ color: slide.accent }}>
                        {word}
                      </span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#A0AEC0]"
              >
                {slide.subtitle}
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mb-6 ml-1 h-12 w-px origin-top"
                style={{ background: `linear-gradient(180deg, ${slide.accent}, transparent)` }}
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-10 max-w-lg font-sans text-sm leading-relaxed text-[#4A5568] md:text-base"
              >
                {slide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 rounded-sm px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:shadow-lg"
                  style={{ background: slide.accent }}
                >
                  Discover More
                  <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="rounded-sm border border-[#E2E8F0] bg-white/80 px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.15em] text-[#4A5568] backdrop-blur-sm transition-all hover:border-[#135B34]/30 hover:bg-white hover:text-[#135B34]"
                >
                  Our Services
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Image Frame 
      <div className="absolute right-0 top-0 bottom-0 hidden w-[38%] items-center justify-end lg:flex pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative mr-[7vw] h-[380px] w-[280px] overflow-hidden"
          >
            <div className="absolute inset-0 border border-[#E2E8F0]" />
            <div 
              className="absolute -bottom-2 -right-2 h-full w-full border opacity-30"
              style={{ borderColor: slide.accent }}
            />
            <motion.div
              animate={{ scale: 1.08 }}
              transition={{ duration: 8, ease: 'easeOut' }}
              className="h-full w-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'saturate(0.6) brightness(0.85) contrast(1.1)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>*/}

      {/* Counter 
      <div className="absolute bottom-20 left-6 z-10 flex items-center gap-4 lg:left-[7vw]">
        <span className="font-display text-sm font-semibold text-[#2D3748]">
          {String(current + 1).padStart(2, '0')}
        </span>
        <div className="h-px w-5 bg-[#E2E8F0]" />
        <span className="font-display text-xs font-medium text-[#A0AEC0]">
          {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>*/}

      {/* Navigation Dots */}
      <div className="absolute bottom-20 right-6 z-10 flex items-center gap-2.5 lg:right-[7vw]">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="group relative h-0.5 overflow-hidden transition-all"
            style={{ width: i === current ? '2rem' : '1.75rem' }}
          >
            <div 
              className="h-full transition-all"
              style={{
                background: i === current ? slide.accent : 'rgba(226,232,240,0.5)',
              }}
            />
            {i === current && (
              <div
                className="absolute inset-0 origin-left"
                style={{
                  background: slide.accent,
                  transform: `scaleX(${progress})`,
                  transition: 'none',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Arrow Navigation 
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 lg:right-[7vw] lg:flex">
        <button
          onClick={prev}
          className="flex h-11 w-11 items-center justify-center border border-[#E2E8F0] bg-white/80 text-[#4A5568] backdrop-blur-sm transition-all hover:border-[#135B34] hover:bg-white hover:text-[#135B34]"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="flex h-11 w-11 items-center justify-center border border-[#E2E8F0] bg-white/80 text-[#4A5568] backdrop-blur-sm transition-all hover:border-[#135B34] hover:bg-white hover:text-[#135B34]"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>*/}

      {/* Scroll Hint 
      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-2.5 lg:left-[7vw]">
        <motion.div
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-7 w-px bg-gradient-to-b from-[#135B34]/30 to-transparent"
        />
        <span className="font-sans text-[9px] font-normal uppercase tracking-[0.25em] text-[#A0AEC0]">
          Scroll
        </span>
      </div>*/}

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 z-20 h-0.5 origin-left transition-colors duration-1000"
        style={{
          width: `${progress * 100}%`,
          background: slide.accent,
        }}
      />
    </section>
  );
}
