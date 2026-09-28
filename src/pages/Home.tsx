import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to simulate typewriter text reveal with startDelay and configurable speed.
 */
function useTypewriter(text: string, speed = 36, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  // Normalized cursor and target seeking refs
  const targetTimeRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const currentTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isSeekingRef = useRef<boolean>(false);
  const lastSeekTimestampRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [cursorProgress, setCursorProgress] = useState(50); // percentage for visual feedback

  // Typewriter intro text for Naresh Singh Bhau
  const introText =
    '8+ years scaling MSME & enterprise sales orgs. ₹3Cr+ monthly revenue, 50+ member team. Now, what are we building?';
  const { displayed, done } = useTypewriter(introText, 36, 500);

  // Initialize and prime video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    // Warm up HTML5 video decoding pipeline
    const handleCanPlay = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        targetTimeRef.current = video.duration * 0.5;
        try {
          video.currentTime = video.duration * 0.5;
        } catch {
          // ignore seek error
        }
      }
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });

    // Try a silent play/pause to unlock seeking on strict mobile/webkit browsers
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
        })
        .catch(() => {
          // autoplay restriction handled silently
        });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Real-time animation loop: 3D perspective parallax & smooth video seek on cursor move
  useEffect(() => {
    const loop = () => {
      const video = videoRef.current;
      const wrapper = videoWrapperRef.current;

      // 1. Calculate continuous 3D tilt tracking cursor position
      const targetTiltY = (mousePosRef.current.x - 0.5) * 18; // degrees
      const targetTiltX = (0.5 - mousePosRef.current.y) * 12; // degrees
      const targetShiftX = (mousePosRef.current.x - 0.5) * 25; // px
      const targetShiftY = (mousePosRef.current.y - 0.5) * 18; // px

      // Smooth interpolation (lerp)
      currentTiltRef.current.x += (targetTiltX - currentTiltRef.current.x) * 0.12;
      currentTiltRef.current.y += (targetTiltY - currentTiltRef.current.y) * 0.12;

      if (wrapper) {
        wrapper.style.transform = `perspective(1000px) rotateY(${currentTiltRef.current.y.toFixed(2)}deg) rotateX(${currentTiltRef.current.x.toFixed(2)}deg) translate3d(${targetShiftX.toFixed(1)}px, ${targetShiftY.toFixed(1)}px, 0) scale(1.04)`;
      }

      // 2. Video frame scrub tracking horizontal cursor position
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const timeDiff = Math.abs(video.currentTime - targetTimeRef.current);
        const now = performance.now();

        // Safety timeout: if isSeeking is stuck for > 120ms, force unlock
        if (isSeekingRef.current && now - lastSeekTimestampRef.current > 120) {
          isSeekingRef.current = false;
        }

        if (!isSeekingRef.current && timeDiff > 0.03) {
          isSeekingRef.current = true;
          lastSeekTimestampRef.current = now;
          try {
            if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
              (video as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTimeRef.current);
            } else {
              video.currentTime = targetTimeRef.current;
            }
          } catch {
            isSeekingRef.current = false;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Update target time on mouse / touch movement
  const handlePointerMovement = useCallback((clientX: number, clientY: number) => {
    const video = videoRef.current;
    const normX = Math.max(0, Math.min(1, clientX / window.innerWidth));
    const normY = Math.max(0, Math.min(1, clientY / window.innerHeight));

    mousePosRef.current = { x: normX, y: normY };
    setCursorProgress(Math.round(normX * 100));

    if (video && video.duration && !Number.isNaN(video.duration)) {
      targetTimeRef.current = normX * video.duration;
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMovement(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMovement(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handlePointerMovement]);

  // Video seeked callback to queue next target
  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.04) {
      isSeekingRef.current = true;
      lastSeekTimestampRef.current = performance.now();
      try {
        video.currentTime = targetTimeRef.current;
      } catch {
        isSeekingRef.current = false;
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      targetTimeRef.current = video.duration * 0.5;
    }
  };

  // Reveal action pills at 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Clipboard copy handler
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('nareshbhau1993@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll to section helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white select-none overflow-x-hidden font-body">
      {/* BACKGROUND VIDEO WRAPPER WITH REAL-TIME 3D PARALLAX & CURSOR SCRUB */}
      <div
        ref={videoWrapperRef}
        className="fixed inset-0 z-0 pointer-events-none w-full h-full will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.08s ease-out',
        }}
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
          muted
          playsInline
          preload="auto"
          onSeeked={handleSeeked}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '70% center',
            filter: 'brightness(0.92) contrast(1.05)',
          }}
        />

        {/* Cinematic gradient vignette for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 25% 60%, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0.8) 100%)',
          }}
        />
      </div>

      {/* NAVBAR (fixed, z-index: 20) */}
      <header className="fixed top-0 left-0 right-0 z-20 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center backdrop-blur-[2px]">
        {/* Logo (left) */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span
            className="text-[20px] sm:text-[25px] tracking-tight text-white select-none font-medium transition-opacity group-hover:opacity-80"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Naresh Singh Bhau®
          </span>
          <span
            className="text-[24px] sm:text-[28px] text-white select-none leading-none transition-transform group-hover:rotate-45 duration-300"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav className="hidden md:flex items-center text-[21px] lg:text-[23px] text-white">
          <button
            onClick={() => setActiveModal('Track Record')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Track Record
          </button>
          <span>,&nbsp;</span>
          <button
            onClick={() => setActiveModal('Experience')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Experience
          </button>
          <span>,&nbsp;</span>
          <button
            onClick={() => setActiveModal('P&L Metrics')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            P&L Metrics
          </button>
          <span>,&nbsp;</span>
          <button
            onClick={() => setActiveModal('Leadership')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Leadership
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/resume/Naresh-Singh-Bhau-Resume.pdf"
            download="Naresh-Singh-Bhau-Resume.pdf"
            className="text-[21px] lg:text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Download Resume
          </a>
          <button
            onClick={() => setActiveModal('Get in touch')}
            className="text-[21px] lg:text-[23px] text-white/80 hover:text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Contact
          </button>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-30 cursor-pointer rounded-lg bg-black/40 backdrop-blur-md"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay menu (z-index: 19) */}
      <div
        className={`fixed inset-0 z-[19] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 gap-7 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Track Record');
          }}
          className="text-left text-[30px] font-medium text-white hover:opacity-60 transition-opacity focus:outline-none"
        >
          Track Record
        </button>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Experience');
          }}
          className="text-left text-[30px] font-medium text-white hover:opacity-60 transition-opacity focus:outline-none"
        >
          Experience
        </button>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('P&L Metrics');
          }}
          className="text-left text-[30px] font-medium text-white hover:opacity-60 transition-opacity focus:outline-none"
        >
          P&L Metrics
        </button>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Leadership');
          }}
          className="text-left text-[30px] font-medium text-white hover:opacity-60 transition-opacity focus:outline-none"
        >
          Leadership
        </button>
        <div className="h-[1px] bg-white/20 my-2" />
        <a
          href="/resume/Naresh-Singh-Bhau-Resume.pdf"
          download="Naresh-Singh-Bhau-Resume.pdf"
          className="text-left text-[30px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity focus:outline-none"
        >
          Download Resume (PDF)
        </a>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Get in touch');
          }}
          className="text-left text-[30px] font-medium text-white/80 hover:text-white transition-opacity focus:outline-none"
        >
          Get in touch
        </button>
      </div>

      {/* HERO SECTION (z-index: 10) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-end pb-10 sm:pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-12 overflow-hidden">
        {/* Content container: max-w-xl, relative z-10 */}
        <div className="max-w-xl relative z-10 select-text">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet Naresh Singh Bhau,
            <br />
            B2B Revenue Leader · Regional P&L & Enterprise Growth
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6 font-normal min-h-[58px]"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action pill buttons */}
          <div
            className="flex flex-wrap gap-y-1 relative"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* White pill buttons */}
            <button
              type="button"
              onClick={() => setActiveModal('P&L Metrics')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              ₹3Cr+ Monthly Revenue
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('Track Record')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              ₹94 Lakh Deal
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('Leadership')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              50+ Member Org
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('Experience')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              Experience & Roles
            </button>

            <a
              href="/resume/Naresh-Singh-Bhau-Resume.pdf"
              download="Naresh-Singh-Bhau-Resume.pdf"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              Download Resume (PDF)
            </a>

            {/* 1 outline pill button: Email with copy icon */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Click to copy email address"
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none group relative"
            >
              <span>
                Reach me:{' '}
                <span className="underline underline-offset-1">nareshbhau1993@gmail.com</span>
              </span>

              {/* Small 12x12 copy icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:scale-105"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>

              {/* Copied toast tooltip */}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-medium px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Cursor Indicator Badge */}
        <div className="hidden lg:flex items-center gap-3 absolute bottom-6 right-8 text-xs text-white/50 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-none">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Move cursor to pivot 3D figure</span>
          <span className="font-mono text-white/80">{cursorProgress}%</span>
        </div>

        {/* Scroll cue button */}
        <div className="w-full flex justify-center pb-2 pt-6 md:absolute md:bottom-5 md:left-0 md:pb-0">
          <button
            onClick={() => scrollToSection('dossier-overview')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            <span>Explore Full Dossier</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </button>
        </div>
      </section>

      {/* FULL RESUME DOSSIER SECTIONS (SCROLLABLE) */}
      <div id="dossier-overview" className="relative z-10 bg-[#07080a] border-t border-white/10 text-white">
        {/* SECTION 1: EXECUTIVE LEDGER / METRIC WALL */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-mono">
                01 / OPERATOR PROOF
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Verifiable P&L & Scale
              </h2>
            </div>
            <p className="text-sm text-white/60 max-w-md">
              Evidence over adjectives. Every headline figure is audited and grounded in regional sales P&L leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all">
              <div className="text-3xl sm:text-4xl font-medium text-white mb-2 font-mono">₹3Cr+</div>
              <div className="text-sm font-medium text-white/90 mb-1">Average Monthly Revenue</div>
              <div className="text-xs text-white/50 leading-relaxed">
                Direct regional sales leadership at IndiaMART InterMESH Ltd.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all">
              <div className="text-3xl sm:text-4xl font-medium text-white mb-2 font-mono">₹94 Lakh</div>
              <div className="text-sm font-medium text-white/90 mb-1">Largest Closed Deal</div>
              <div className="text-xs text-white/50 leading-relaxed">
                High-ticket enterprise contract negotiated and closed with multi-stakeholder approval.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all">
              <div className="text-3xl sm:text-4xl font-medium text-white mb-2 font-mono">50+ Team</div>
              <div className="text-sm font-medium text-white/90 mb-1">Sales Headcount Led</div>
              <div className="text-xs text-white/50 leading-relaxed">
                3 Branch Managers, 9 Managers, and 36 Executives under direct reporting span.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all">
              <div className="text-3xl sm:text-4xl font-medium text-white mb-2 font-mono">18%+ YoY</div>
              <div className="text-sm font-medium text-white/90 mb-1">Consistent Revenue Growth</div>
              <div className="text-xs text-white/50 leading-relaxed">
                Compound regional year-on-year revenue expansion across key manufacturing & B2B verticals.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all">
              <div className="text-3xl sm:text-4xl font-medium text-white mb-2 font-mono">6,000+</div>
              <div className="text-sm font-medium text-white/90 mb-1">Paid B2B Accounts</div>
              <div className="text-xs text-white/50 leading-relaxed">
                Acquired and expanded during branch inception and scaleup in Jaipur.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all">
              <div className="text-3xl sm:text-4xl font-medium text-white mb-2 font-mono">65%+</div>
              <div className="text-sm font-medium text-white/90 mb-1">YoY Client Retention</div>
              <div className="text-xs text-white/50 leading-relaxed">
                Predictable renewals, low churn, and deep account management health.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROFESSIONAL EXPERIENCE */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-b border-white/10">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-mono">
              02 / CAREER TRAJECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Work Experience
            </h2>
          </div>

          <div className="space-y-12">
            {/* Experience 1: IndiaMART RM */}
            <div className="relative pl-6 sm:pl-8 border-l border-white/20">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">Regional Manager</h3>
                  <div className="text-sm text-white/70">IndiaMART InterMESH Ltd. · Jaipur, Rajasthan</div>
                </div>
                <span className="text-xs font-mono text-white/50 mt-1 sm:mt-0">Jul 2022 – Present</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Promoted to youngest Regional Manager in the region. Full P&L responsibility for Jaipur and surrounding territories, scaling regional bookings to ₹3Cr+ per month.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-white/40 font-mono">→</span>
                  <span>Directly lead a 50+ member sales organization (3 Branch Managers, 9 Managers, 36 Executives).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/40 font-mono">→</span>
                  <span>Structured enterprise sales motions, closing deals up to ₹94 Lakhs with MSME and industrial conglomerates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/40 font-mono">→</span>
                  <span>Maintained 65%+ annual customer retention rate through proactive service reviews and account health frameworks.</span>
                </li>
              </ul>
            </div>

            {/* Experience 2: IndiaMART BM */}
            <div className="relative pl-6 sm:pl-8 border-l border-white/20">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">Branch Manager</h3>
                  <div className="text-sm text-white/70">IndiaMART InterMESH Ltd.</div>
                </div>
                <span className="text-xs font-mono text-white/50 mt-1 sm:mt-0">Jul 2019 – Jun 2022</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Built and managed sales branch from inception, opening 6,000+ paid B2B customer accounts and driving 2× branch revenue growth.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-white/40 font-mono">→</span>
                  <span>Recruited, trained, and mentored junior reps into top-tier performers across Rajasthan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/40 font-mono">→</span>
                  <span>Exceeded quarterly targets continuously, securing rapid promotion to Regional Manager.</span>
                </li>
              </ul>
            </div>

            {/* Experience 3: BYJU'S */}
            <div className="relative pl-6 sm:pl-8 border-l border-white/20">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">Senior Business Development Associate</h3>
                  <div className="text-sm text-white/70">BYJU'S (Think & Learn Pvt. Ltd.)</div>
                </div>
                <span className="text-xs font-mono text-white/50 mt-1 sm:mt-0">May 2017 – Jul 2019</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Direct B2C/B2B consultative sales. Generated ₹1Cr+ revenue in the first 7 months and achieved permanent role conversion in just 3 months.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-white/40 font-mono">→</span>
                  <span>Ranked among the top 1% business development associates across North India.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: LEADERSHIP & CORE COMPETENCIES */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-b border-white/10">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-mono">
              03 / CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Operating Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40">01</span>
              <h3 className="text-lg font-medium text-white">P&L & Revenue Architecture</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Owning top-line and bottom-line outcomes. Budgeting, quota allocation, discounting discipline, and margin protection across all sales tiers.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40">02</span>
              <h3 className="text-lg font-medium text-white">High-Velocity Sales Teams</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Systematic talent acquisition, onboarding bootcamps, and daily pipeline choreography. Proven record retaining 90%+ of core leadership.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40">03</span>
              <h3 className="text-lg font-medium text-white">Enterprise Negotiations</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Direct engagement with CXOs, owners, and procurement boards. Closing multi-year, multi-million-rupee partnerships up to ₹94 Lakhs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: EDUCATION & CONTACT FOOTER */}
        <footer className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/40 block mb-2 font-mono">
                04 / CREDENTIALS & INQUIRIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Built to Convert. Like the Deals I Close.
              </h2>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Open to senior revenue leadership roles (VP Sales, Head of Revenue, Regional Director) and strategic advisory across India & globally.
              </p>

              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 w-16 text-xs uppercase font-mono">Email:</span>
                  <a href="mailto:nareshbhau1993@gmail.com" className="underline hover:text-white">
                    nareshbhau1993@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 w-16 text-xs uppercase font-mono">Phone:</span>
                  <a href="tel:+919901935806" className="underline hover:text-white">
                    +91 9901 935 806
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 w-16 text-xs uppercase font-mono">Degree:</span>
                  <span>B.E. Civil Engineering · Chandigarh University</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 w-16 text-xs uppercase font-mono">Base:</span>
                  <span>Jaipur, India · Open to Pan-India & Global Relocation</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/20 bg-white/[0.03] space-y-6 text-center md:text-left">
              <h3 className="text-xl font-medium">Download Official Executive Resume</h3>
              <p className="text-xs sm:text-sm text-white/60">
                Complete career chronicle with detailed territory metrics, promotion recommendations, and enterprise deal breakdowns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/resume/Naresh-Singh-Bhau-Resume.pdf"
                  download="Naresh-Singh-Bhau-Resume.pdf"
                  className="px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 text-center transition-colors"
                >
                  Download PDF Resume
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-6 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white hover:text-black text-center transition-colors"
                >
                  {copied ? 'Email Copied!' : 'Copy Direct Email'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4">
            <div>© {new Date().getFullYear()} Naresh Singh Bhau. All rights reserved.</div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>

      {/* INTERACTIVE DOSSIER MODAL SHEET */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-[#0b0c0e] border border-white/20 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/40 block mb-1 font-mono">
                  Naresh Singh Bhau · Portfolio Dossier
                </span>
                <h2 className="text-2xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {activeModal}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Content Branches */}
            {activeModal === 'P&L Metrics' && (
              <div className="space-y-5">
                <p className="text-sm text-white/80 leading-relaxed">
                  Direct revenue leadership across Rajasthan with proven P&L performance:
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-2xl font-mono font-medium text-white">₹3Cr+</div>
                    <div className="text-xs text-white/50 mt-1">Monthly Regional Revenue</div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-2xl font-mono font-medium text-white">18%+</div>
                    <div className="text-xs text-white/50 mt-1">Consistent YoY Growth</div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-2xl font-mono font-medium text-white">65%+</div>
                    <div className="text-xs text-white/50 mt-1">Client Retention Rate</div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-2xl font-mono font-medium text-white">6,000+</div>
                    <div className="text-xs text-white/50 mt-1">Paid B2B Accounts</div>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href="/resume/Naresh-Singh-Bhau-Resume.pdf"
                    download="Naresh-Singh-Bhau-Resume.pdf"
                    className="block w-full py-3 text-center bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors"
                  >
                    Download Full P&L Breakdown (PDF)
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'Track Record' && (
              <div className="space-y-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  Key milestones spanning 8+ years of high-ticket B2B enterprise sales and team scale:
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">₹94 Lakh Single Enterprise Deal</span>
                      <span className="text-xs font-mono text-white/50">High-Ticket</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Closed largest single contract in the territory by orchestrating multi-stakeholder procurement and customized service level agreements.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">Youngest Regional Manager</span>
                      <span className="text-xs font-mono text-white/50">IndiaMART</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Promoted from Branch Manager to Regional Manager after launching the branch and doubling regional revenue within 3 years.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">Top 1% BDA Recognition</span>
                      <span className="text-xs font-mono text-white/50">BYJU'S</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Generated ₹1Cr+ revenue in the initial 7 months with conversion to permanent role in 3 months.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'Experience' && (
              <div className="space-y-5">
                <div className="space-y-4">
                  <div className="border-l-2 border-white/30 pl-4 py-1">
                    <div className="flex justify-between">
                      <strong className="text-white text-base">Regional Manager</strong>
                      <span className="text-xs font-mono text-white/50">2022 – Present</span>
                    </div>
                    <div className="text-xs text-white/70">IndiaMART InterMESH Ltd.</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Leading 50+ sales personnel across 3 branches, driving ₹3Cr+ monthly revenue and ₹94L deals.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4 py-1">
                    <div className="flex justify-between">
                      <strong className="text-white text-base">Branch Manager</strong>
                      <span className="text-xs font-mono text-white/50">2019 – 2022</span>
                    </div>
                    <div className="text-xs text-white/70">IndiaMART InterMESH Ltd.</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Built the branch from scratch, acquiring 6,000+ paid B2B clients and achieving 2× revenue growth.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4 py-1">
                    <div className="flex justify-between">
                      <strong className="text-white text-base">Senior Business Development Associate</strong>
                      <span className="text-xs font-mono text-white/50">2017 – 2019</span>
                    </div>
                    <div className="text-xs text-white/70">BYJU'S (Think & Learn Pvt. Ltd.)</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Consultative sales across northern territories; generated ₹1Cr+ in first 7 months.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/resume/Naresh-Singh-Bhau-Resume.pdf"
                    download="Naresh-Singh-Bhau-Resume.pdf"
                    className="block w-full py-3 text-center bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors"
                  >
                    Download Complete Resume (PDF)
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'Leadership' && (
              <div className="space-y-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  How Naresh scales and governs high-performance revenue organizations:
                </p>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">50+ Organization Hierarchy</div>
                    <p className="text-xs text-white/60">
                      Span of control spanning 3 Branch Managers, 9 Team Managers, and 36 Frontline Sales Executives.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">Predictable Pipeline Cadence</div>
                    <p className="text-xs text-white/60">
                      Weekly pipeline stress-tests, conversion velocity tracking, and deal desk oversight on high-ticket renewals.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">Talent Development & Retention</div>
                    <p className="text-xs text-white/60">
                      Promoted over 12 executives into management roles; maintained industry-leading retention across sales managers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'Get in touch' && (
              <div className="space-y-5">
                <p className="text-sm text-white/80 leading-relaxed">
                  Available for confidential conversations regarding Head of Sales, VP Revenue, or Regional Director opportunities.
                </p>
                <div className="space-y-3 pt-1">
                  <a
                    href="mailto:nareshbhau1993@gmail.com"
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 transition-all group"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase text-white/50 block">Direct Email</span>
                      <span className="text-sm sm:text-base font-medium text-white group-hover:underline">
                        nareshbhau1993@gmail.com
                      </span>
                    </div>
                    <span className="text-xs text-white/50">Send ↗</span>
                  </a>

                  <a
                    href="tel:+919901935806"
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 transition-all group"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase text-white/50 block">Phone</span>
                      <span className="text-sm sm:text-base font-medium text-white group-hover:underline">
                        +91 9901 935 806
                      </span>
                    </div>
                    <span className="text-xs text-white/50">Call ↗</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/nareshsinghbhau"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 transition-all group"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase text-white/50 block">LinkedIn Profile</span>
                      <span className="text-sm sm:text-base font-medium text-white group-hover:underline">
                        linkedin.com/in/nareshsinghbhau
                      </span>
                    </div>
                    <span className="text-xs text-white/50">Connect ↗</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCopyEmail}
                    className="w-full py-3 text-center border border-white/30 text-white font-medium rounded-full text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    {copied ? 'Email Copied to Clipboard!' : 'Copy Email Address'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
