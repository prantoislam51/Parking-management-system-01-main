"use client";

import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};

interface SuccessMessageProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function SuccessMessage({ message, isVisible, onClose }: SuccessMessageProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-9999 flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 border border-emerald-400/50"
        >
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-wider">Success!</p>
            <p className="text-white/90 text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
