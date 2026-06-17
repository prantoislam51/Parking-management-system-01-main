"use client";

import { CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export type PaymentMethodType = "card" | "bkash" | "nagad";

export interface PaymentFormData {
  paymentMethod: PaymentMethodType;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

interface PaymentFormProps {
  amount: string;
  currency?: string;
  onSubmit: (data: PaymentFormData) => void;
  isProcessing?: boolean;
  submitText?: string;
  showAmount?: boolean;
  className?: string;
}

export function PaymentForm({
  amount,
  currency = "BDT",
  onSubmit,
  isProcessing = false,
  submitText = "Pay Now",
  showAmount = true,
  className = ""
}: PaymentFormProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodType>("card");

  const paymentMethods = [
    {
      id: "card" as const,
      name: "Credit / Debit Card",
      description: "Visa, Mastercard, Amex",
      icon: <CreditCard className="h-5 w-5" />,
      color: "indigo",
      bgGradient: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500",
    },
    {
      id: "bkash" as const,
      name: "bKash",
      description: "Mobile banking",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8h1a4 4 0 110 8h-1v2h1a3 3 0 100-6h-1v2h1v-2h-1V8zM5 9h2a3 3 0 110 6H5V9zm0-4h2a4 4 0 110 8H5V5z"/>
        </svg>
      ),
      color: "pink",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500",
    },
    {
      id: "nagad" as const,
      name: "Nagad",
      description: "Mobile banking",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
        </svg>
      ),
      color: "orange",
      bgGradient: "from-orange-500/20 to-amber-500/20",
      borderColor: "border-orange-500",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      paymentMethod: selectedPayment,
      cardNumber: selectedPayment === "card" ? "4242424242424242" : undefined,
      cardExpiry: selectedPayment === "card" ? "12/28" : undefined,
      cardCvc: selectedPayment === "card" ? "123" : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Payment Methods */}
      <div className="space-y-3">
        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
          Select Payment Method
        </label>

        <div className="grid gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedPayment(method.id)}
              className={`
                w-full flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                ${selectedPayment === method.id
                  ? `${method.bgGradient} ${method.borderColor}`
                  : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                }
              `}
            >
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                selectedPayment === method.id ? `bg-${method.color}-500/30` : "bg-slate-700/50"
              }`}>
                <span className={selectedPayment === method.id ? `text-${method.color}-400` : "text-slate-400"}>
                  {method.icon}
                </span>
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-white">{method.name}</p>
                <p className="text-xs text-slate-400">{method.description}</p>
              </div>
              {selectedPayment === method.id && (
                <div className={`h-6 w-6 rounded-full bg-${method.color}-500 flex items-center justify-center`}>
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Card Details (only for card payment) */}
      {selectedPayment === "card" && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">Card Details</span>
            </div>

            <div className="space-y-3">
              {/* Card Number */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card number"
                  maxLength={19}
                  className="h-12 w-full rounded-xl bg-slate-700/50 border border-slate-600/50 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="h-6 w-8 rounded bg-slate-600/50" />
                  <div className="h-6 w-8 rounded bg-slate-600/50" />
                  <div className="h-6 w-8 rounded bg-slate-600/50" />
                  <div className="h-6 w-8 rounded bg-slate-600/50 flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Expiry & CVC */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="h-12 rounded-xl bg-slate-700/50 border border-slate-600/50 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    maxLength={4}
                    className="h-12 w-full rounded-xl bg-slate-700/50 border border-slate-600/50 px-4 pr-10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
              </div>

              {/* Cardholder Name */}
              <input
                type="text"
                placeholder="Cardholder name"
                className="h-12 w-full rounded-xl bg-slate-700/50 border border-slate-600/50 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/30 rounded-lg p-3">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Your card details are encrypted and secure</span>
          </div>
        </div>
      )}

      {/* Amount Display */}
      {showAmount && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Amount</p>
            <p className="text-2xl font-black text-emerald-400">{currency} {amount}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">per month</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full h-14 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            {submitText}
          </>
        )}
      </button>
    </form>
  );
}