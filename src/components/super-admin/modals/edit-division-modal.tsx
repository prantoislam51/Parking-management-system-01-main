"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import toast from "react-hot-toast";

interface Division {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

interface EditDivisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  division: Division | null;
}

export function EditDivisionModal({ isOpen, onClose, division }: EditDivisionModalProps) {
  const [formData, setFormData] = useState({ name: "", code: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (division) {
      setFormData({ name: division.name, code: division.code });
    }
  }, [division]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.code) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Division updated successfully");
    setIsLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-50 w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Edit Division</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Division Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 rounded-xl border-slate-200" placeholder="Enter division name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Division Code</label>
                <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="h-12 rounded-xl border-slate-200" placeholder="e.g., DHA" />
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <Button variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl font-bold border-slate-200">Cancel</Button>
              <Button onClick={handleSubmit} isLoading={isLoading} className="flex-1 h-12 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500">
                <Save className="h-4 w-4 mr-2" />Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
