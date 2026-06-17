"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard } from "lucide-react";
import { Badge } from "./badge";
import { PaymentForm, PaymentFormData } from "./payment/payment-form";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PaymentFormData) => void;
  slotDetails: {
    slotId: string;
    zoneName: string;
    price: string;
    slotType: string;
  } | null;
  isProcessing?: boolean;
}

export function PaymentModal({
  isOpen,
  onClose,
  onConfirm,
  slotDetails,
  isProcessing
}: PaymentModalProps) {
  if (!slotDetails) return null;

  const handlePaymentSubmit = (data: PaymentFormData) => {
    onConfirm(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl shadow-slate-950/50 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-white mb-1">Complete Payment</h2>
                <p className="text-sm text-slate-400">Secure payment to book your parking slot</p>
              </div>

              {/* Slot Details Card */}
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Booking Summary</span>
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 text-[10px] font-bold capitalize">
                    {slotDetails.slotType}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Zone</span>
                    <span className="text-sm font-bold text-white">{slotDetails.zoneName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Slot ID</span>
                    <span className="text-sm font-bold text-white">{slotDetails.slotId}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form Component */}
              <PaymentForm
                amount={slotDetails.price.replace(/[^0-9]/g, '')}
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
                submitText="Confirm & Pay"
                showAmount={true}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}