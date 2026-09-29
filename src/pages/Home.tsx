import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { SkillNodeDiagram } from '../components/SkillNodeDiagram';
import { VerticalExperienceTimeline } from '../components/VerticalExperienceTimeline';

/**
 * Continuous auto-scrolling marquee component using Framer Motion
 */
interface MarqueeRowProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  onSkillClick?: (skill: string) => void;
}

function MarqueeRow({ items, direction = 'left', speed = 32, onSkillClick }: MarqueeRowProps) {
  // Triplicate array to ensure a seamless infinite scroll across all viewport widths
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden select-none py-1 group">
      <motion.div
        className="flex shrink-0 gap-3.5 items-center will-change-transform"
        animate={{
          x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((skill, idx) => (
          <div
            key={idx}
            onClick={() => onSkillClick?.(skill)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.025] hover:border-amber-400/50 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer text-white/80 hover:text-white"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">
              {skill}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SkillsMarquee({ onSkillClick, theme = 'deep-space' }: { onSkillClick?: (skill: string) => void; theme?: 'deep-space' | 'slate' }) {
  const professionalSkills = [
    'Sales & Revenue Leadership',
    'Regional P&L Management (₹3Cr+ / month)',
    'Enterprise & Key Account Management',
    'Big-Ticket Deal Closures (Up to ₹96L)',
    'Consultative & Solution Selling',
    '₹94 Lakhs Deal (100% Upfront Payment)',
    'SaaS & B2B Sales',
    'Market Expansion & GTM Strategy',
    '50+ Member Sales Organization',
    '65%+ Customer Retention YoY',
  ];

  const technicalSkills = [
    'Mansarovar Branch Expansion (Dec 2024)',
    'Data-Led GTM Dashboards',
    'Pipeline, Revenue & Churn Telemetry',
    '1.3× PCR Champion at IndiaMART',
    '2× Branch Revenue Growth over 5 Years',
    '6,000+ Paid B2B Accounts Scaled',
    'Succession Pipeline (8 L1s & 1 L2 Promoted)',
    'Inside & Direct Sales Cycles',
    '₹1 Cr Revenue in 7 Months (35,000 WRPS)',
    'Permanent Role Conversion in 3 Months',
  ];

  return (
    <div className={`relative w-full py-12 border-b overflow-hidden backdrop-blur-md transition-colors duration-500 ${
      theme === 'slate' ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-black/40 border-white/10'
    }`}>
      {/* Edge gradient masks for seamless fade out */}
      <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none transition-colors duration-500 ${
        theme === 'slate' ? 'bg-gradient-to-r from-[#0f172a] to-transparent' : 'bg-gradient-to-r from-[#07080a] to-transparent'
      }`} />
      <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none transition-colors duration-500 ${
        theme === 'slate' ? 'bg-gradient-to-l from-[#0f172a] to-transparent' : 'bg-gradient-to-l from-[#07080a] to-transparent'
      }`} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
            TECHNICAL & PROFESSIONAL COMPETENCIES
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[11px] font-mono text-amber-400/90 font-medium">INFINITE STREAM</span>
        </div>
        <span className="text-xs text-white/40 font-mono">
          Hover to inspect · Click skill to view proof
        </span>
      </div>

      <div className="space-y-3">
        {/* Track 1: Moving left */}
        <MarqueeRow items={professionalSkills} direction="left" speed={34} onSkillClick={onSkillClick} />

        {/* Track 2: Moving right */}
        <MarqueeRow items={technicalSkills} direction="right" speed={38} onSkillClick={onSkillClick} />
      </div>
    </div>
  );
}

/**
 * Slide-in minimalist contact drawer on the right side of the screen
 */
interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  copied: boolean;
  onCopyEmail: (e: React.MouseEvent) => void;
  theme?: 'deep-space' | 'slate';
}

function ContactDrawer({ isOpen, onClose, copied, onCopyEmail, theme = 'deep-space' }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    organization: '',
    inquiryType: 'Executive Leadership (VP/Director)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    'Executive Leadership (VP/Director)',
    'Enterprise Contract',
    'Commercial Advisory',
    'Direct Message',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      contact: '',
      organization: '',
      inquiryType: 'Executive Leadership (VP/Director)',
      message: '',
    });
    setSubmitted(false);
  };

  const mailtoSubject = encodeURIComponent(
    `[Inquiry: ${formData.inquiryType}] from ${formData.name || 'Executive Contact'}`
  );
  const mailtoBody = encodeURIComponent(
    `Name: ${formData.name}\nContact: ${formData.contact}\nOrganization: ${formData.organization || 'N/A'}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
  );
  const mailtoUrl = `mailto:nareshbhau1993@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto flex justify-end">
          {/* Subtle backdrop overlay (kept light so the hero section & 3D figure behind remain clearly visible) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-in drawer on the right side */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className={`relative z-10 w-full sm:w-[480px] md:w-[520px] h-full backdrop-blur-2xl border-l flex flex-col shadow-2xl overflow-y-auto transition-colors duration-300 ${
              theme === 'slate'
                ? 'bg-[#0f172a]/95 border-slate-700/70 text-slate-100 shadow-slate-950/90'
                : 'bg-[#0a0b0e]/95 border-white/15 text-white shadow-black/90'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Direct Inquiry Form"
          >
            {/* Drawer Header */}
            <div className={`p-6 sm:p-8 border-b flex items-start justify-between gap-4 sticky top-0 backdrop-blur-md z-20 ${
              theme === 'slate' ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-[#0a0b0e]/90 border-white/10'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/90 font-medium">
                    DIRECT INQUIRY · CONFIDENTIAL
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  Get in Touch
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Direct communication line to Naresh Singh Bhau.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer focus:outline-none shrink-0"
                aria-label="Close contact drawer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Quick Contact Info Strip */}
            <div className="px-6 sm:px-8 py-4 bg-white/[0.02] border-b border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <a
                href="mailto:nareshbhau1993@gmail.com"
                className="text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span className="text-amber-400/90 font-mono">Email:</span>
                <span className="underline underline-offset-2">nareshbhau1993@gmail.com</span>
              </a>
              <a
                href="tel:+919901935806"
                className="text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span className="text-amber-400/90 font-mono">Phone:</span>
                <span className="underline underline-offset-2">+91 9901 935 806</span>
              </a>
            </div>

            {/* Drawer Body */}
            <div className="p-6 sm:p-8 flex-1">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inquiry Type Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2.5">
                      Nature of Conversation
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`text-left text-xs p-3 rounded-xl border transition-all cursor-pointer ${
                            formData.inquiryType === type
                              ? 'border-amber-400 bg-amber-500/10 text-white font-medium shadow-sm shadow-amber-500/10'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                formData.inquiryType === type ? 'bg-amber-400' : 'bg-white/20'
                              }`}
                            />
                            <span className="truncate">{type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="drawer-name" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="drawer-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  {/* Email or Phone Input */}
                  <div>
                    <label htmlFor="drawer-contact" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Work Email or Phone <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="drawer-contact"
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. anand@enterprise.com or +91..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  {/* Company / Organization Input */}
                  <div>
                    <label htmlFor="drawer-org" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Organization / Brand <span className="text-white/30 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="drawer-org"
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Scaleup / Industrial Group"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="drawer-message" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Message / Mandate Brief <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      id="drawer-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about the leadership scope, sales org targets, or advisory engagement..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/[0.07] transition-all resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Preparing dispatch...</span>
                      ) : (
                        <>
                          <span>Transmit Direct Inquiry</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs text-white/40 pt-1">
                      <span>Prefer default client?</span>
                      <a
                        href={mailtoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-amber-400/90 hover:text-amber-300 transition-colors"
                      >
                        Open pre-filled in Mail app ↗
                      </a>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 py-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-2">
                      Inquiry Dispatched
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your note regarding <span className="text-amber-400">{formData.inquiryType}</span> has been logged directly for Naresh Singh Bhau.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/40 font-mono">Contact:</span>
                      <span className="text-white font-mono">{formData.contact}</span>
                    </div>
                    {formData.organization && (
                      <div className="flex justify-between">
                        <span className="text-white/40 font-mono">Organization:</span>
                        <span className="text-white">{formData.organization}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-white/10 text-white/60">
                      "{formData.message}"
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href={mailtoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-5 rounded-full bg-white text-black font-medium text-xs sm:text-sm text-center hover:bg-neutral-200 transition-colors"
                    >
                      Also Launch in Mail App (Pre-filled) ↗
                    </a>
                    <button
                      type="button"
                      onClick={onCopyEmail}
                      className="w-full py-3 px-5 rounded-full border border-white/20 text-white font-medium text-xs sm:text-sm text-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      {copied ? 'Direct Email Copied!' : 'Copy nareshbhau1993@gmail.com'}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full py-2 text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Notice */}
            <div className="p-6 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Response time: &lt; 24h</span>
              </span>
              <span className="font-mono">Jaipur · Pan-India</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

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

  // Video seeking refs
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const lastSeekTimestampRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Framer-motion spring physics for mouse-follow and subtle parallax
  // Normalized between -0.5 (left/top) and +0.5 (right/bottom)
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  // Spring configuration for natural, fluid follow
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const springX = useSpring(mouseNormX, springConfig);
  const springY = useSpring(mouseNormY, springConfig);

  // Parallax transforms for the background 3D figure (tuned for fluid organic motion without edge clipping)
  const figureRotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const figureRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const figureTranslateX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const figureTranslateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);
  const [cursorProgress, setCursorProgress] = useState(50); // percentage for visual feedback

  // Theme state: 'deep-space' (default cosmic obsidian) vs 'slate' (high contrast slate mode)
  const [theme, setTheme] = useState<'deep-space' | 'slate'>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'slate' || saved === 'deep-space') return saved;
    } catch {
      // ignore
    }
    return 'deep-space';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'deep-space' ? 'slate' : 'deep-space'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll progress for slim fixed progress bar at top of page
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

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

  // Continuous video frame seek loop tracking cursor targetTime
  useEffect(() => {
    const loop = () => {
      const video = videoRef.current;

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

  // Update mouse position & target video time on pointer movement
  const handlePointerMovement = useCallback(
    (clientX: number, clientY: number) => {
      const normX = Math.max(0, Math.min(1, clientX / window.innerWidth));
      const normY = Math.max(0, Math.min(1, clientY / window.innerHeight));

      // Feed centered values (-0.5 to +0.5) to framer-motion springs
      mouseNormX.set(normX - 0.5);
      mouseNormY.set(normY - 0.5);

      setCursorProgress(Math.round(normX * 100));

      const video = videoRef.current;
      if (video && video.duration && !Number.isNaN(video.duration)) {
        targetTimeRef.current = normX * video.duration;
      }
    },
    [mouseNormX, mouseNormY]
  );

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

  // Skill chip click handler to open related audit modal
  const handleSkillClick = (skill: string) => {
    if (skill.includes('P&L') || skill.includes('Revenue') || skill.includes('Discounting')) {
      setActiveModal('P&L Metrics');
    } else if (skill.includes('Deal') || skill.includes('Closure') || skill.includes('KAM') || skill.includes('Procurement')) {
      setActiveModal('Track Record');
    } else if (skill.includes('Leadership') || skill.includes('Hiring') || skill.includes('Forecasting') || skill.includes('Velocity')) {
      setActiveModal('Leadership');
    } else {
      setActiveModal('Experience');
    }
  };

  // Close modals and drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setMobileMenuOpen(false);
        setContactDrawerOpen(false);
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
    <div
      data-theme={theme}
      className={`relative min-h-screen w-full select-none overflow-x-hidden font-body transition-colors duration-500 ${
        theme === 'slate' ? 'bg-[#0b1120] text-slate-100' : 'bg-black text-white'
      }`}
    >
      {/* SLIM FIXED HORIZONTAL SCROLL PROGRESS BAR (VERY TOP OF THE PAGE) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] sm:h-[3px] z-[60] bg-white/[0.08] pointer-events-none"
        role="progressbar"
        aria-label="Page scroll progress"
      >
        <motion.div
          style={{ scaleX: progressScaleX, transformOrigin: '0%' }}
          className="h-full w-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 shadow-[0_0_10px_rgba(251,191,36,0.65)]"
        />
      </div>

      {/* BACKGROUND VIDEO WRAPPER WITH REAL-TIME 3D PARALLAX & CURSOR SCRUB */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            rotateY: figureRotateY,
            rotateX: figureRotateX,
            x: figureTranslateX,
            y: figureTranslateY,
            transformStyle: 'preserve-3d',
          }}
          className="absolute -top-12 -bottom-12 -left-12 -right-12 will-change-transform"
        >
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
            muted
            playsInline
            preload="auto"
            onSeeked={handleSeeked}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover scale-[1.15]"
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
                'radial-gradient(circle at 25% 60%, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.85) 100%)',
            }}
          />
        </motion.div>

        {/* Fixed outer vignette: guarantees dark borders without rotating */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              'radial-gradient(ellipse at 35% 55%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 45%, rgba(0, 0, 0, 0.92) 100%)',
          }}
        />

        {/* Bottom smooth dark gradient fade to eliminate any red border seam */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-1"
          style={{
            background:
              theme === 'slate'
                ? 'linear-gradient(to top, #0b1120 0%, rgba(11, 17, 32, 0.95) 45%, rgba(11, 17, 32, 0.3) 80%, transparent 100%)'
                : 'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.95) 45%, rgba(0, 0, 0, 0.3) 80%, transparent 100%)',
          }}
        />

        {/* Top subtle fade to blend with navbar */}
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-1"
          style={{
            background:
              theme === 'slate'
                ? 'linear-gradient(to bottom, #0b1120 0%, rgba(11, 17, 32, 0.6) 50%, transparent 100%)'
                : 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%)',
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
            onClick={() => scrollToSection('experience-timeline')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Milestones
          </button>
          <span>,&nbsp;</span>
          <button
            onClick={() => scrollToSection('competency-graph')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Competencies
          </button>
          <span>,&nbsp;</span>
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
            onClick={() => setActiveModal('Leadership')}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Leadership
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* THEME TOGGLE (DEEP SPACE VS SLATE MODE) */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-tight transition-all cursor-pointer focus:outline-none ${
              theme === 'slate'
                ? 'border-sky-400/50 bg-sky-500/15 text-sky-200 hover:border-sky-400 hover:bg-sky-500/25'
                : 'border-amber-400/40 bg-amber-500/10 text-amber-200 hover:border-amber-400 hover:bg-amber-500/20'
            }`}
            aria-label={`Switch theme, currently ${theme === 'deep-space' ? 'Deep Space' : 'Slate Mode'}`}
            title={`Active: ${theme === 'deep-space' ? 'Deep Space (Cosmic Obsidian)' : 'Slate Mode (High Contrast)'} — Click to switch`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                theme === 'slate'
                  ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]'
                  : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
            />
            <span className="font-medium">{theme === 'deep-space' ? 'Deep Space' : 'Slate Mode'}</span>
            <span className="text-[10px] opacity-60">
              {theme === 'deep-space' ? '⇄ Slate' : '⇄ Space'}
            </span>
          </button>

          <a
            href="/resume/Naresh-Singh-Bhau-Resume.pdf"
            download="Naresh-Singh-Bhau-Resume.pdf"
            className="text-[20px] lg:text-[22px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            Download Resume
          </a>
          <button
            onClick={() => setContactDrawerOpen(true)}
            className="text-[20px] lg:text-[22px] text-white/80 hover:text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
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
            scrollToSection('experience-timeline');
          }}
          className="text-left text-[30px] font-medium text-white hover:opacity-60 transition-opacity focus:outline-none"
        >
          Milestones Timeline
        </button>
        <button
          onClick={() => {
            scrollToSection('competency-graph');
          }}
          className="text-left text-[30px] font-medium text-white hover:opacity-60 transition-opacity focus:outline-none"
        >
          Competency Map
        </button>
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
            setContactDrawerOpen(true);
          }}
          className="text-left text-[30px] font-medium text-white/80 hover:text-white transition-opacity focus:outline-none"
        >
          Get in touch
        </button>

        {/* Mobile Theme Appearance Toggle */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs uppercase font-mono tracking-wider text-white/50">
            Appearance
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-tight transition-all cursor-pointer ${
              theme === 'slate'
                ? 'border-sky-400 bg-sky-500/20 text-sky-200'
                : 'border-amber-400 bg-amber-500/20 text-amber-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                theme === 'slate' ? 'bg-sky-400' : 'bg-amber-400'
              }`}
            />
            <span className="font-semibold">
              {theme === 'deep-space' ? 'Deep Space (Dark)' : 'Slate Mode (Contrast)'}
            </span>
          </button>
        </div>
      </div>

      {/* HERO SECTION (z-index: 10) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-end pb-10 sm:pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-12 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col justify-center pt-16 md:pt-0">
          {/* Hero Content container */}
          <div className="max-w-2xl lg:max-w-3xl relative z-10 select-text">

            {/* 1. Intro label */}
            <div
              className="select-text mb-4 sm:mb-5"
              style={{
                fontSize: 'clamp(18px, 3.5vw, 24px)',
                lineHeight: 1.35,
                fontWeight: 400,
                color: '#fff',
              }}
            >
              <span className="text-white/90">Hey there, meet </span>
              <span className="text-white font-semibold">Naresh Singh Bhau</span>,
              <br />
              <span className="text-white/70 text-sm sm:text-base font-medium">
                B2B Revenue Leader · Regional P&L & Enterprise Growth
              </span>
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
                onClick={() => setActiveModal('P&L Metrics')}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
              >
                18%+ YoY Growth
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
        </div>

        {/* Interactive Cursor Indicator Badge (Positioned bottom-left of hero to keep bottom-right clear) */}
        <div className="hidden lg:flex items-center gap-3 absolute bottom-6 left-8 text-xs text-white/50 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-none">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Framer-motion spring active · Cursor follow</span>
          <span className="font-mono text-white/80">{cursorProgress}%</span>
        </div>

        {/* Scroll cue button */}
        <div className="w-full flex justify-center pb-2 pt-6 md:absolute md:bottom-5 md:left-0 md:pb-0 z-10">
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

        {/* Seamless bottom fade on hero section to prevent any visible red seam */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-1"
          style={{
            background:
              theme === 'slate'
                ? 'linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.85) 45%, transparent 100%)'
                : 'linear-gradient(to top, #07080a 0%, rgba(7, 8, 10, 0.85) 45%, transparent 100%)',
          }}
        />
      </section>

      {/* FLOATING 'DOWNLOAD RESUME' BUTTON WITH SUBTLE PULSE ANIMATION (FIXED AT BOTTOM RIGHT) */}
      <aside className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 pointer-events-auto">
        <a
          href="/resume/Naresh-Singh-Bhau-Resume.pdf"
          download="Naresh-Singh-Bhau-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Naresh Singh Bhau's Resume (PDF)"
          title="Download official PDF resume"
          className="relative group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white text-black font-medium text-xs sm:text-sm shadow-2xl shadow-black/80 hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {/* Subtle Outer Pulsing Glow */}
          <span className="absolute -inset-1 rounded-full bg-amber-400/35 blur-sm animate-pulse pointer-events-none" />

          {/* Glowing Beacon Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>

          <span className="tracking-tight select-none font-medium">Download Resume</span>

          {/* Download Icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 transition-transform group-hover:translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>

          {/* Format Badge */}
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/10 text-black/70 font-semibold">
            PDF
          </span>
        </a>
      </aside>

      {/* FULL RESUME DOSSIER SECTIONS (SCROLLABLE) */}
      <div
        id="dossier-overview"
        className={`relative z-10 border-t transition-colors duration-500 ${
          theme === 'slate' ? 'bg-[#0f172a] border-slate-800 text-slate-100' : 'bg-[#07080a] border-white/10 text-white'
        }`}
      >
        {/* CONTINUOUS AUTO-SCROLLING SKILLS MARQUEE (FRAMER MOTION INFINITE LOOP) */}
        <SkillsMarquee onSkillClick={handleSkillClick} theme={theme} />

        {/* SECTION 1: PROFESSIONAL EXPERIENCE TIMELINE (VERTICAL WITH HOVER-TRIGGERED MILESTONES) */}
        <VerticalExperienceTimeline onSelectModal={setActiveModal} theme={theme} />

        {/* SECTION 2: INTERACTIVE COMPETENCY TOPOLOGY (NODE-LINK DIAGRAM) */}
        <SkillNodeDiagram onSelectModal={setActiveModal} theme={theme} />

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
              <h3 className="text-lg font-medium text-white">Regional P&L & Topline Growth</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Owned regional P&L outcomes, aligning topline growth with hiring strategy, attrition control, and productivity-led cost optimisation. Managed ₹3 Cr monthly regional revenue with 18%+ YoY growth.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40">02</span>
              <h3 className="text-lg font-medium text-white">50+ Member Sales Leadership</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Led a 50+ member B2B sales organization (36 Executives, 9 Managers, 3 Branch Managers) with a strong leadership pipeline: 8 L1s promoted to leadership and 1 L2 to Branch Manager.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40">03</span>
              <h3 className="text-lg font-medium text-white">Enterprise Deals (Up to ₹96L)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Closed multi-million-rupee enterprise and B2B deals (up to ₹96 Lakhs) through consultative and solution-based selling, including a landmark ₹94 Lakhs deal with 100% upfront payment.
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
                  <span>BE – Civil Engineering · Chandigarh University</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 w-16 text-xs uppercase font-mono">School:</span>
                  <span>10th & 12th · Army Public School</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 w-16 text-xs uppercase font-mono">Base:</span>
                  <span>Jaipur, Rajasthan · Open to pan-India & global roles (Office, hybrid, or remote)</span>
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
                  type="button"
                  onClick={() => setContactDrawerOpen(true)}
                  className="px-6 py-3.5 rounded-full border border-amber-400/50 bg-amber-500/10 text-amber-300 font-medium text-sm hover:bg-amber-400 hover:text-black text-center transition-colors cursor-pointer"
                >
                  Send Direct Inquiry ↗
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-6 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white hover:text-black text-center transition-colors cursor-pointer"
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
            className={`border rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
              theme === 'slate'
                ? 'bg-[#0f172a] border-slate-700/80 text-slate-100 shadow-slate-950/90'
                : 'bg-[#0b0c0e] border-white/20 text-white shadow-2xl'
            }`}
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
                  Key career achievements verified directly from official executive resume:
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">Deals Up to ₹96 Lakhs</span>
                      <span className="text-xs font-mono text-amber-400">100% Upfront</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Closed multi-million-rupee enterprise deals through consultative selling, including a landmark ₹94 Lakhs contract with 100% upfront payment.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">Youngest Regional Manager (2022)</span>
                      <span className="text-xs font-mono text-white/50">IndiaMART</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Youngest Regional Manager in Jaipur, promoted on one of the fastest growth tracks in the organisation after serving as 1.3× PCR Champion and driving 2× branch revenue growth over 5 years.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">6,000+ Paid B2B Accounts</span>
                      <span className="text-xs font-mono text-white/50">Branch Scale</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Opened and scaled the Jaipur branch to 6,000+ paid B2B accounts. Later launched the new Jaipur Mansarovar branch (Dec 2024) to expand market coverage.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium">BYJU'S Fast-Track Conversion</span>
                      <span className="text-xs font-mono text-white/50">Top Performance</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Generated ₹1 Cr revenue in 7 months, achieving 35,000 WRPS. Secured permanent role within 3 months, exceeding targets and closing ₹2L+ monthly revenue.
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
                    <div className="text-xs text-white/70">IndiaMART InterMESH Ltd. · Jaipur, Rajasthan</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Promoted from Branch Manager. Leading 50+ sales personnel (36 Executives, 9 Managers, 3 Branch Managers), managing ₹3 Cr avg monthly regional revenue, 18%+ YoY growth, and 65% customer retention.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4 py-1">
                    <div className="flex justify-between">
                      <strong className="text-white text-base">Branch Manager</strong>
                      <span className="text-xs font-mono text-white/50">2019 – 2022</span>
                    </div>
                    <div className="text-xs text-white/70">IndiaMART InterMESH Ltd. · Jaipur, Rajasthan</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Opened and scaled the Jaipur branch to 6,000+ paid B2B accounts, driving 2× branch revenue growth over 5 years. Recognized as 1.3× PCR Champion.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4 py-1">
                    <div className="flex justify-between">
                      <strong className="text-white text-base">Senior Business Development Associate (Direct Sales)</strong>
                      <span className="text-xs font-mono text-white/50">2017 – 2019</span>
                    </div>
                    <div className="text-xs text-white/70">BYJU’S, Think & Learn Pvt Ltd · Bengaluru, Karnataka</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Managed inside & direct sales cycles; generated ₹1 Cr revenue in 7 months (35,000 WRPS); secured permanent role within 3 months closing ₹2L+ monthly.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4 py-1">
                    <div className="flex justify-between">
                      <strong className="text-white text-base">Industry Expert (External)</strong>
                      <span className="text-xs font-mono text-white/50">Advisory</span>
                    </div>
                    <div className="text-xs text-white/70">Insight Alpha</div>
                    <p className="text-xs text-white/60 mt-1.5">
                      Selected industry expert providing strategic insights on B2B SaaS, enterprise sales, go-to-market strategy, customer retention, and regional P&L leadership.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/resume/Naresh-Singh-Bhau-Resume.pdf"
                    download="Naresh-Singh-Bhau-Resume.pdf"
                    className="block w-full py-3 text-center bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors"
                  >
                    Download Complete Official Resume (PDF)
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'Leadership' && (
              <div className="space-y-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  Proven organizational governance and leadership pipeline development:
                </p>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">50+ Organization Command</div>
                    <p className="text-xs text-white/60">
                      Led 50+ member B2B sales team across 36 Executives, 9 Managers, and 3 Branch Managers across Rajasthan.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">Internal Leadership Pipeline</div>
                    <p className="text-xs text-white/60">
                      Built a strong talent succession pipeline: 8 L1s promoted to leadership and 1 L2 promoted to Branch Manager.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">Market Expansion (Dec 2024)</div>
                    <p className="text-xs text-white/60">
                      Launched new Jaipur Mansarovar branch in Dec 2024 to expand market coverage, cut travel dependency, and improve field rep productivity.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-medium text-white mb-0.5">Data-Led GTM Dashboards</div>
                    <p className="text-xs text-white/60">
                      Built and managed telemetry dashboards to track pipeline, revenue, productivity, renewals, and churn in real time.
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

      {/* SLIDE-IN MINIMALIST CONTACT DRAWER (SLIDES IN ON THE RIGHT) */}
      <ContactDrawer
        isOpen={contactDrawerOpen}
        onClose={() => setContactDrawerOpen(false)}
        copied={copied}
        onCopyEmail={handleCopyEmail}
        theme={theme}
      />
    </div>
  );
}
