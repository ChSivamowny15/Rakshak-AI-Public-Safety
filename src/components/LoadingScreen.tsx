import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setDone(true);
          if (onDone) setTimeout(onDone, 400);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 130);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400"
              />
              <div className="grid h-20 w-20 place-items-center">
                <ShieldCheck className="h-9 w-9 text-cyan-300" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold gradient-text">Rakshak AI</p>
              <p className="mt-1 text-xs text-slate-500">Initializing intelligence grid…</p>
            </div>
            <div className="h-1 w-56 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
