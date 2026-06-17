"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./button";
import { createPortal } from "react-dom";
import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "success";
  isLoading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmModalProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const icons = {
    default: <AlertTriangle className="h-6 w-6 text-primary" />,
    danger: <XCircle className="h-6 w-6 text-destructive" />,
    success: <CheckCircle className="h-6 w-6 text-emerald-500" />,
  };

  const buttonVariants = {
    default: "default",
    danger: "destructive",
    success: "secondary",
  } as const;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isLoading && onOpenChange(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-50 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl dark:rounded-4xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 premium-gradient" />
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                {icons[variant]}
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">{title}</h2>
              <p className="text-slate-500 mt-3 font-medium leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl h-12 font-bold border-slate-200 hover:bg-slate-50"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button
                variant={buttonVariants[variant]}
                className={`flex-1 rounded-2xl h-12 font-black shadow-lg ${
                  variant === 'danger' ? 'shadow-rose-500/20' : 
                  variant === 'success' ? 'shadow-emerald-500/20' : 'shadow-primary/20'
                }`}
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : confirmText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}