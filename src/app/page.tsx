'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { HoodModel } from '@/components/HoodModel';
import { SSLogoModel } from '@/components/SSLogoModel';

import { Howl } from 'howler';

// Move incantations outside component to avoid dependency issues
const incantations = [
  [
    "We gather.",
    "Not to be seen.",
    "Not to be counted.",
    "But to be present.",
    " ",
    "What was scattered",
    "finds its center again."
  ],
  [
    "We remember.",
    "What the body knew",
    "before the words came.",
    " ",
    "Before the noise.",
    "Before the forgetting.",
    " ",
    "The sound returns first."
  ],
  [
    "We return again.",
    "Not because we are lost—",
    "but because this is the way.",
    " ",
    "The season turns.",
    "The voices rise.",
    "The circle closes."
  ],
  [
    "We have been here before.",
    "In another light.",
    "Under another sky.",
    " ",
    "Yet the rhythm is the same."
  ],
  [
    "And we will gather again.",
    "When the time is right.",
    "When the sound calls us home."
  ]
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [incantation, setIncantation] = useState<string[]>([]);
  const [visibleLineIndex, setVisibleLineIndex] = useState(-1);

  // Setup Audio
  const playThud = () => {
    const randomThud = Math.floor(Math.random() * 4) + 1; // 1-4
    const sound = new Howl({
      src: [`/sounds/thud${randomThud}.mp3`],
      volume: 0.5,
    });
    sound.play();
  };

  useEffect(() => {
    setMounted(true);
    const selectedIncantation = incantations[Math.floor(Math.random() * incantations.length)];
    setIncantation(selectedIncantation);

    // Initial interaction listener (one-time) to unlock audio context if needed
    const handleInteraction = () => {
      playThud();
      window.removeEventListener('click', handleInteraction);
    };
    window.addEventListener('click', () => playThud()); // Keep global click feedback

    // Sequence the lines with audio impact
    let currentIndex = -1;
    const startDelay = 2000; // Wait 2s before starting sequence
    const lineInterval = 1200; // Slow, heavy pace

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex < selectedIncantation.length) {
          setVisibleLineIndex(currentIndex);
          // Play sound for every line reveal, unless it's just a spacer
          if (selectedIncantation[currentIndex].trim() !== "") {
            playThud();
          }
        } else {
          clearInterval(intervalId);
        }
      }, lineInterval);

      return () => clearInterval(intervalId);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', () => playThud());
    }
  }, []);





  // ... (keep existing animations)

  // Text Animation Variants


  const logoAnimation: Variants = {
    hidden: { scale: 0.95, opacity: 0, filter: 'blur(20px)' },
    show: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black selection:bg-neutral-800 selection:text-white">
      {/* Ambient Background Effects - Reduced intensity */}
      <div className="bg-grain opacity-[0.03] pointer-events-none fixed inset-0 z-50"></div>

      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={2} />
          <Suspense fallback={null}>
            <HoodModel />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* Version number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 version mix-blend-difference z-40 text-neutral-500"
      >
        2.8.26
      </motion.div>

      {/* External Link - Centered and always visible */}
      <a
        href="https://pump.fun/profile/sundayservice"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[#FF0000] hover:text-white transition-colors duration-300 tracking-[0.2em] text-sm z-50 font-black uppercase"
      >
        PUMP.FUN
      </a>

      {/* Main Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl px-4 z-10 relative gap-12 md:gap-0">

        {/* Spacer for balance - Left Side */}
        <div className="flex-1 hidden md:block order-1" />

        {/* Center: LOGO */}
        <div className="order-1 md:order-2 flex-shrink-0 relative group cursor-pointer">
          <Link href="/sunday-service">
            <motion.div
              variants={logoAnimation}
              initial="hidden"
              animate="show"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              className="w-48 h-48 md:w-80 md:h-80 relative"
            >
              <div className="w-full h-full relative">
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                  <ambientLight intensity={2} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} />
                  <Environment preset="studio" />
                  <Suspense fallback={null}>
                    <SSLogoModel />
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Spacer for balance - Order 3 ensures it stays on the right */}
        <div className="flex-1 hidden md:block order-3" />
      </div>

      {/* Random Incantation - Bottom Left Fixed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
        className="fixed bottom-16 left-6 z-50 font-mono text-[10px] md:text-xs text-neutral-400 hidden md:block mix-blend-difference"
      >
        {incantation.map((line, i) => (
          <div key={i} className="leading-relaxed tracking-wider uppercase opacity-80">
            {line === " " ? <br /> : line}
          </div>
        ))}
      </motion.div>

      {/* Scrolling Ticker Footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-4 border-t border-white/5 bg-black z-50">
        <motion.div
          className="whitespace-nowrap flex gap-8"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          {Array(10).fill("SUNDAY SERVICE IS BACK  •  GOD IS THE GREATEST  •  NO MORE MEDS  •  THE VISION IS CLEAR  •  FREEDOM  •  ").map((text, i) => (
            <span key={i} className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase font-bold">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
