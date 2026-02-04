'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SundayService() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black text-white selection:bg-neutral-800">
      <div className="bg-grain opacity-[0.03] pointer-events-none fixed inset-0 z-50"></div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-4xl px-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 space-y-2"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 uppercase">Live Transmission</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-mono">SUNDAY SERVICE</h1>
        </motion.div>

        {/* Central Player Interface */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-lg aspect-square border border-white/10 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-6 md:gap-8 relative p-4 md:p-8 group"
        >
          {/* Spinning Ring Animation - Static in offline mode */}
          <div className="absolute inset-0 border border-dotted border-white/5 rounded-full m-8 opacity-20"></div>

          {/* Logo */}
          <motion.div
            className="w-32 h-32 relative"
          >
            <Image
              src="/logo.png"
              alt="Sunday Service"
              fill
              className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] opacity-50"
            />
          </motion.div>

          {/* Status Text/Controls */}
          <div className="text-center space-y-4 relative z-10 control-group">
            <div className="font-mono text-2xl font-bold tracking-widest text-neutral-600">
              --:--:--
            </div>

            <div
              className="px-8 py-3 border border-white/5 bg-white/5 text-neutral-500 font-mono text-xs uppercase tracking-widest cursor-not-allowed select-none"
            >
              SIGNAL OFFLINE
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 text-center space-y-2"
        >
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Next Service Date:</p>
          <div className="font-mono text-xl tracking-widest text-[#FF0000]">02.08.26</div>
        </motion.div>
      </div>

      {/* Navigation */}
      <Link href="/" className="fixed bottom-8 left-1/2 -translate-x-1/2 text-neutral-600 hover:text-white font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-300">
        RETURN
      </Link>
    </main>
  );
} 