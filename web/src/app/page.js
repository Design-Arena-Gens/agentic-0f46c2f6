/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SCENE_CONFIG = [
  { key: "family", duration: 5200, Component: SceneFamily },
  { key: "movers", duration: 5200, Component: SceneMovers },
  { key: "map", duration: 5200, Component: SceneMap },
  { key: "logo", duration: Infinity, Component: SceneLogo },
];

const containerVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.6, ease: "easeIn" } },
};

const textReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function ProgressBar({ index }) {
  return (
    <div className="absolute top-10 left-1/2 z-30 flex w-[90vw] max-w-3xl -translate-x-1/2 gap-3">
      {SCENE_CONFIG.map((scene, idx) => {
        const isActive = idx === index;
        const isComplete = idx < index;
        return (
          <div key={scene.key} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            <motion.div
              className="h-full bg-white/90"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: isActive ? 1 : isComplete ? 1 : 0,
                transition: {
                  duration: isActive ? (Number.isFinite(scene.duration) ? scene.duration / 1000 : 1.2) : 0.4,
                  ease: "linear",
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [sceneIndex, setSceneIndex] = useState(0);

  const scenes = useMemo(() => SCENE_CONFIG, []);
  const scene = scenes[sceneIndex];

  useEffect(() => {
    if (!Number.isFinite(scene.duration) || sceneIndex === scenes.length - 1) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setSceneIndex((prev) => Math.min(prev + 1, scenes.length - 1));
    }, scene.duration);

    return () => clearTimeout(timeout);
  }, [scene.duration, sceneIndex, scenes.length]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 text-white">
      <ProgressBar index={sceneIndex} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,250,252,0.16),transparent_45%)]" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={scene.key}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative flex h-[90vh] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-10 shadow-2xl backdrop-blur-xl"
        >
          <scene.Component />
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function SceneFamily() {
  return (
    <div className="relative flex h-full flex-1 flex-col justify-end">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-amber-600/30 to-rose-500/40" />
        <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>
      <motion.h2 variants={textReveal} initial="hidden" animate="visible" className="z-10 text-3xl font-semibold md:text-5xl">
        The stress of relocation ends here.
      </motion.h2>
      <motion.p
        variants={textReveal}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.9 }}
        className="z-10 mt-4 max-w-2xl text-lg leading-relaxed text-amber-100/90 md:text-xl"
      >
        A tired Indian family surrounded by packed boxes waits anxiously. Warm cinematic lighting captures the moment you
        promise to transform.
      </motion.p>

      <div className="relative z-10 mt-auto flex flex-1 items-end justify-between gap-8">
        <FamilyGrouping />
        <StackedBoxes />
      </div>
    </div>
  );
}

function FamilyGrouping() {
  return (
    <div className="relative h-64 w-full max-w-sm">
      <PersonBubble className="left-4 top-12 h-40 w-40 bg-amber-200/70" expression="weary" hair="bun" />
      <PersonBubble className="left-28 top-0 h-48 w-48 bg-amber-100/70" expression="thoughtful" hair="short" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 mx-auto h-4 w-3/4 rounded-full bg-amber-900/40 blur-lg"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}

function PersonBubble({ className, expression, hair }) {
  return (
    <motion.div
      className={`absolute flex items-center justify-center rounded-full shadow-[0_25px_65px_rgba(0,0,0,0.35)] backdrop-blur-md ${className}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="relative h-3/4 w-3/4 rounded-full bg-amber-50/80">
        <div className="absolute inset-x-[22%] top-1/5 h-3/5 rounded-full bg-amber-200/70">
          <EyePair />
          <Mouth expression={expression} />
        </div>
        <Hair style={hair} />
      </div>
    </motion.div>
  );
}

function EyePair() {
  return (
    <div className="absolute inset-x-8 top-14 flex justify-between">
      <motion.span
        className="h-3 w-3 rounded-full bg-amber-900/90"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.span
        className="h-3 w-3 rounded-full bg-amber-900/90"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5 }}
      />
    </div>
  );
}

function Mouth({ expression }) {
  const paths = {
    weary: "M4 6 Q12 2 20 6",
    thoughtful: "M4 10 Q12 6 20 10",
  };
  return (
    <svg viewBox="0 0 24 16" className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden>
      <path d={paths[expression]} stroke="rgba(99,63,35,0.8)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Hair({ style }) {
  if (style === "bun") {
    return (
      <>
        <div className="absolute -top-7 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-amber-900/80" />
        <div className="absolute top-0 h-12 w-full rounded-t-full bg-amber-900/70" />
      </>
    );
  }
  return <div className="absolute top-0 h-12 w-full rounded-t-full bg-amber-900/80" />;
}

function StackedBoxes() {
  return (
    <div className="relative flex h-48 w-48 flex-col gap-2">
      {[1, 0.75, 0.6].map((scale, idx) => (
        <motion.div
          key={idx}
          className="flex flex-1 items-center justify-center rounded-md border border-amber-900/30 bg-amber-400/60 text-amber-950/80 shadow-lg backdrop-blur"
          style={{ transformOrigin: "center bottom" }}
          animate={{ rotate: idx === 1 ? [0, -1, 1, 0] : idx === 0 ? [0, 1, -1, 0] : [0, 0.5, -0.5, 0] }}
          transition={{ duration: 6 + idx, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-[0.3em]">Fragile</span>
        </motion.div>
      ))}
    </div>
  );
}

function SceneMovers() {
  return (
    <div className="relative flex h-full flex-1 flex-col">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/70 via-blue-500/40 to-indigo-600/40" />
      <Sunlight />
      <motion.h2 variants={textReveal} initial="hidden" animate="visible" className="z-10 mt-6 text-3xl font-semibold md:text-5xl">
        Professional movers take charge.
      </motion.h2>
      <motion.p
        variants={textReveal}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.9 }}
        className="z-10 mt-4 max-w-2xl text-lg leading-relaxed text-sky-50/90 md:text-xl"
      >
        Crisp blue uniforms, careful hands, and organized loading reflect the trust your customers feel under bright
        sunlight.
      </motion.p>
      <div className="relative z-10 mt-auto flex flex-1 items-center justify-between gap-10">
        <MoverTeam />
        <MovingTruck />
      </div>
    </div>
  );
}

function Sunlight() {
  return (
    <motion.div
      className="pointer-events-none absolute -top-24 right-16 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl"
      animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
  );
}

function MoverTeam() {
  return (
    <div className="relative flex w-full max-w-sm flex-col gap-6">
      {[0, 1].map((idx) => (
        <motion.div
          key={idx}
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/15 p-5 shadow-lg backdrop-blur"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * idx, duration: 0.7 }}
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/90">
            <motion.span
              className="h-2/3 w-2/3 rounded-xl bg-white/90"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            />
            <div className="absolute -bottom-1 h-5 w-24 rounded-full bg-blue-950/50 blur-md" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50/70">Mover {idx + 1}</p>
            <p className="mt-1 text-base text-blue-50/90">Securely handling delicate furniture.</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MovingTruck() {
  return (
    <div className="relative h-72 w-full max-w-md">
      <motion.div
        className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/20 via-blue-200/20 to-transparent backdrop-blur"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-6 left-4 right-6 h-36 rounded-3xl bg-blue-500/90 shadow-[0_35px_80px_rgba(15,23,42,0.55)]"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className="absolute left-8 top-8 h-16 w-24 rounded-lg bg-slate-100/90" />
        <div className="absolute bottom-0 left-4 h-10 w-10 translate-y-1/2 rounded-full bg-slate-900" />
        <div className="absolute bottom-0 right-4 h-10 w-10 translate-y-1/2 rounded-full bg-slate-900" />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-blue-950/50 blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}

function SceneMap() {
  return (
    <div className="relative flex h-full flex-1 flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.4),transparent_70%)]" />
      <motion.h2 variants={textReveal} initial="hidden" animate="visible" className="z-10 mt-6 text-3xl font-semibold md:text-5xl">
        Nationwide coverage, on time every time.
      </motion.h2>
      <motion.p
        variants={textReveal}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.9 }}
        className="z-10 mt-4 max-w-2xl text-lg leading-relaxed text-sky-100/90 md:text-xl"
      >
        A 3D-inspired map visual with moving trucks highlights Kumar Packers & Movers operating across India&apos;s
        busiest routes.
      </motion.p>
      <div className="relative z-10 mt-6 flex flex-1 items-center justify-center">
        <IndiaMap />
      </div>
    </div>
  );
}

function IndiaMap() {
  const routes = [
    { id: "north", x: [-10, 40], y: [-30, 10] },
    { id: "west", x: [-60, 20], y: [50, -10] },
    { id: "south", x: [-20, 60], y: [120, 60] },
  ];

  return (
    <div className="relative h-full w-full max-w-xl">
      <svg
        viewBox="0 0 360 480"
        className="h-full w-full drop-shadow-[0_35px_100px_rgba(14,165,233,0.35)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path
          d="M182 12L160 62l40 42-28 38-62 22 24 48-26 40 56 48-18 56 42 36 14 70 58 40 32-28-18-62 38-28-36-48 58-68-52-56 28-48-18-38-58-40-14-78z"
          fill="url(#mapGradient)"
          stroke="rgba(191,219,254,0.4)"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      {routes.map((route, idx) => (
        <motion.div
          key={route.id}
          className="absolute left-1/2 top-1/2 h-9 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-100/40 bg-cyan-300/80 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.9, 0.95, 0.9],
            x: route.x,
            y: route.y,
          }}
          transition={{
            duration: 6 + idx * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        >
          <div className="absolute left-1 h-9 w-7 rounded-l-2xl bg-white/90" />
          <div className="absolute bottom-0 left-1 h-4 w-4 translate-y-1/2 rounded-full bg-slate-900/80" />
          <div className="absolute bottom-0 right-1 h-4 w-4 translate-y-1/2 rounded-full bg-slate-900/80" />
        </motion.div>
      ))}
    </div>
  );
}

function SceneLogo() {
  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center text-center">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-sky-600/40 to-indigo-700/40"
        animate={{ opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="relative inline-flex items-center justify-center rounded-full border border-white/25 bg-black/40 px-8 py-4 uppercase tracking-[0.6em]"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.span
          className="bg-gradient-to-r from-cyan-200 via-white to-emerald-200 bg-clip-text text-sm text-transparent md:text-base"
          animate={{ letterSpacing: ["0.45em", "0.6em", "0.45em"] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        >
          Trusted Since 1998
        </motion.span>
      </motion.div>

      <motion.h2
        className="relative mt-8 bg-gradient-to-r from-cyan-200 via-white to-emerald-200 bg-clip-text text-4xl font-semibold uppercase text-transparent drop-shadow-lg md:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Kumar Packers & Movers
      </motion.h2>

      <motion.div
        className="relative mt-6 flex flex-wrap items-center justify-center gap-6 text-lg text-cyan-100 md:text-xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <CallBadge number="9618849713" />
        <CallBadge number="8498868686" />
      </motion.div>

      <motion.p
        className="relative mt-10 max-w-lg text-base text-slate-100/80 md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        End-to-end packing, moving, and relocation support for households and businesses across India. Call now for a free
        quote and stress-free shifting.
      </motion.p>
    </div>
  );
}

function CallBadge({ number }) {
  return (
    <motion.div
      className="flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-300/20 px-5 py-3 text-lg font-semibold text-cyan-50 shadow-[0_20px_45px_rgba(8,47,73,0.45)]"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.77.73 2.58a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.11-.45c.81.36 1.68.61 2.58.73A2 2 0 0 1 22 16.92Z" />
      </svg>
      {number}
    </motion.div>
  );
}
