"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Select } from "@/components/shared/select";
import { mockAreas, mockSubAdmins } from "@/lib/data";
import toast from "react-hot-toast";

interface Zone {
  id: string;
  zone_name: string;
  zone_code: string;
  area_id: string;
  sub_admin_id: string;
  total_slots: number;
  is_active: boolean;
}

interface EditZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  zone: Zone | null;
}

export function EditZoneModal({ isOpen, onClose, zone }: EditZoneModalProps) {
  const [formData, setFormData] = useState({
    zone_name: "",
    zone_code: "",
    area_id: "",
    sub_admin_id: "",
    total_slots: 0,
    is_active: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (zone) {
      setFormData({
        zone_name: zone.zone_name,
        zone_code: zone.zone_code,
        area_id: zone.area_id,
        sub_admin_id: zone.sub_admin_id,
        total_slots: zone.total_slots,
        is_active: zone.is_active,
      });
    }
  }, [zone]);

  const handleSubmit = async () => {
    if (!formData.zone_name || !formData.zone_code || !formData.area_id) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Zone updated successfully");
    setIsLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-50 w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-violet-500" />
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Edit Zone</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Zone Name</label>
                  <Input value={formData.zone_name} onChange={(e) => setFormData({ ...formData, zone_name: e.target.value })} className="h-12 rounded-xl border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Zone Code</label>
                  <Input value={formData.zone_code} onChange={(e) => setFormData({ ...formData, zone_code: e.target.value })} className="h-12 rounded-xl border-slate-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Area</label>
                <Select value={formData.area_id} onChange={(e) => setFormData({ ...formData, area_id: e.target.value })} className="h-12 rounded-xl border-slate-200">
                  <option value="">Select Area</option>
                  {mockAreas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Manager</label>
                <Select value={formData.sub_admin_id} onChange={(e) => setFormData({ ...formData, sub_admin_id: e.target.value })} className="h-12 rounded-xl border-slate-200">
                  <option value="">Select Manager</option>
                  {mockSubAdmins.map(a => <option key={a.id} value={a.id}>{a.first_name} {a.last_name}</option>)}
                </Select>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Zone Status</p>
                  <p className="text-xs text-slate-500">Enable or disable this zone</p>
                </div>
                <button onClick={() => setFormData({ ...formData, is_active: !formData.is_active })} className={`relative w-12 h-7 rounded-full transition-all duration-300 ${formData.is_active ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-slate-200"}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${formData.is_active ? "left-6" : "left-1"}`} />
                </button>
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
