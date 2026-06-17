"use client";

import { mockSlots, mockZones, mockDivisions, mockDistricts, mockAreas } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { FilterSection } from "@/components/shared";
import { SuccessMessage } from "@/components/shared/success-message";
import { PaymentModal } from "@/components/shared/payment-modal";
import { MapPin, Car, Bike, Truck, Zap, Star, ArrowRight, Clock, CheckCircle2, X } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { formatCurrency } from "@/lib/utils";
import { useState, useMemo } from "react";

export function SlotsSection() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    id: string;
    slotId: string;
    zoneName: string;
    price: string;
    slotType: string;
  } | null>(null);

  const handleFilterChange = (newFilters: Record<string, string>) => {
    const updatedFilters = { ...newFilters };
    if (activeFilters.division_id !== newFilters.division_id) {
      delete updatedFilters.district_id;
      delete updatedFilters.area_id;
    } else if (activeFilters.district_id !== newFilters.district_id) {
      delete updatedFilters.area_id;
    }
    setActiveFilters(updatedFilters);
  };

  const handleBookSlot = (slot: typeof mockSlots[0], zone: typeof mockZones[0] | undefined) => {
    setSelectedSlot({
      id: slot.id,
      slotId: slot.unique_slot_id,
      zoneName: zone?.zone_name || "Premium Zone",
      price: formatCurrency(slot.price_per_month),
      slotType: slot.slot_type,
    });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentConfirm = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      setSuccessMessage(`Successfully booked slot ${selectedSlot?.slotId}! Payment completed.`);
      setShowSuccess(true);
      setSelectedSlot(null);
    }, 2000);
  };

  const filteredSlots = useMemo(() => {
    const slots = isDemoMode ? mockSlots : [];
    const zones = isDemoMode ? mockZones : [];
    const areas = isDemoMode ? mockAreas : [];
    const districts = isDemoMode ? mockDistricts : [];

    return slots.filter(slot => {
      const zone = zones.find(z => z.id === slot.zone_id);
      const area = areas.find(a => a.id === zone?.area_id);
      const district = districts.find(d => d.id === area?.district_id);

      const matchesSearch =
        slot.unique_slot_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        zone?.zone_name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDivision = !activeFilters.division_id || district?.division_id === activeFilters.division_id;
      const matchesDistrict = !activeFilters.district_id || area?.district_id === activeFilters.district_id;
      const matchesArea = !activeFilters.area_id || zone?.area_id === activeFilters.area_id;
      const matchesType = !activeFilters.slot_type || slot.slot_type === activeFilters.slot_type;
      const matchesStatus = !activeFilters.status || slot.status === activeFilters.status;

      return matchesSearch && matchesDivision && matchesDistrict && matchesArea && matchesType && matchesStatus;
    });
  }, [isDemoMode, searchQuery, activeFilters]);

  const divisions = useMemo(() => (isDemoMode ? mockDivisions : []), [isDemoMode]);
  const districts = useMemo(() => (isDemoMode ? mockDistricts : []), [isDemoMode]);
  const areas = useMemo(() => (isDemoMode ? mockAreas : []), [isDemoMode]);
  const zones = useMemo(() => (isDemoMode ? mockZones : []), [isDemoMode]);

  const filterOptions = useMemo(() => [
    { label: "Division", key: "division_id", options: divisions.map(d => ({ label: d.name, value: d.id })) },
    { label: "District", key: "district_id", options: districts.filter(d => !activeFilters.division_id || d.division_id === activeFilters.division_id).map(d => ({ label: d.name, value: d.id })) },
    { label: "Area", key: "area_id", options: areas.filter(a => !activeFilters.district_id || a.district_id === activeFilters.district_id).map(a => ({ label: a.name, value: a.id })) },
    { label: "Slot Type", key: "slot_type", options: [{ label: "Car", value: "car" }, { label: "Bike", value: "bike" }, { label: "Truck", value: "truck" }, { label: "Bus", value: "bus" }] },
    { label: "Status", key: "status", options: [{ label: "Available", value: "available" }, { label: "Booked", value: "booked" }, { label: "Occupied", value: "occupied" }] },
  ], [divisions, districts, areas, activeFilters.division_id, activeFilters.district_id]);

  const getSlotIcon = (type: string) => {
    switch (type) {
      case "bike": return Bike;
      case "truck":
      case "bus": return Truck;
      default: return Car;
    }
  };

  const getSlotColors = (type: string) => {
    switch (type) {
      case "bike": return { bg: "from-emerald-500/20 to-teal-500/20", text: "text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500 to-teal-600", badge: "bg-emerald-500" };
      case "truck":
      case "bus": return { bg: "from-amber-500/20 to-orange-500/20", text: "text-amber-400", border: "border-amber-500/30", gradient: "from-amber-500 to-orange-600", badge: "bg-amber-500" };
      default: return { bg: "from-indigo-500/20 to-purple-500/20", text: "text-indigo-400", border: "border-indigo-500/30", gradient: "from-indigo-500 to-purple-600", badge: "bg-indigo-500" };
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "available": return { bg: "bg-emerald-500", text: "text-emerald-400" };
      case "booked": return { bg: "bg-amber-500", text: "text-amber-400" };
      default: return { bg: "bg-rose-500", text: "text-rose-400" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                <span className="animated-gradient-text">Parking Slots</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-400 mt-1 text-sm font-medium ml-15">
            Find and book the perfect parking spot in your area.
          </p>
        </div>
      </div>

      {/* Enhanced Filter Section */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm border border-slate-200/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Live Results</span>
        </div>
        <FilterSection
          onSearch={setSearchQuery}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          placeholder="Search Slot ID, Zone, or Location..."
        />
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 font-medium">Showing</span>
            <span className="text-lg font-black text-white">{filteredSlots.length}</span>
            <span className="text-sm text-gray-400 font-medium">slots</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-gray-400">{filteredSlots.filter(s => s.status === "available").length} Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-gray-400">{filteredSlots.filter(s => s.status === "booked").length} Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="text-gray-400">{filteredSlots.filter(s => s.status === "occupied").length} Occupied</span>
          </div>
        </div>
      </div>

      {/* Slots Grid - Enhanced */}
      {filteredSlots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSlots.map((slot, index) => {
            const zone = zones.find(z => z.id === slot.zone_id);
            const SlotIcon = getSlotIcon(slot.slot_type);
            const colors = getSlotColors(slot.slot_type);
            const statusColors = getStatusColors(slot.status);

            return (
              <Card
                key={slot.id}
                className="card-elegant group hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/5 to-pink-500/5" />

                  {/* Header with gradient */}
                  <div className="relative h-36 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <SlotIcon className="h-32 w-32 text-white/10 group-hover:scale-110 group-hover:text-white/15 transition-all duration-500" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className={`${statusColors.bg} text-white border-0 px-4 py-1.5 font-bold text-[10px] uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${slot.status === "available" ? "bg-white animate-pulse" : "bg-white/60"} mr-2`} />
                        {slot.status}
                      </Badge>
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                      <Star className="h-4 w-4 text-white" />
                    </button>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172b] via-transparent to-transparent" />

                    {/* Price tag */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider mb-0.5">Monthly Price</p>
                      <p className="text-3xl font-black text-white tracking-tight">{formatCurrency(slot.price_per_month)}</p>
                    </div>
                  </div>

                  <div className="p-5 relative z-10">
                    <div className="space-y-4">
                      {/* Zone Info - Enhanced */}
                      <div className="flex items-center gap-4 p-3 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/30">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg`}>
                          <MapPin className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-white leading-none truncate">{zone?.zone_name || "Premium Zone"}</h3>
                          <p className="text-[10px] text-gray-500 font-medium mt-1 truncate">{zone?.address || "Location information"}</p>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Star className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                        </div>
                      </div>

                      {/* Slot Details */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 border border-slate-700/30">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                            <Zap className={`h-4 w-4 ${colors.text}`} />
                          </div>
                          <div>
                            <p className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">Slot ID</p>
                            <p className="font-bold text-xs text-white">{slot.unique_slot_id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`bg-gradient-to-r ${colors.gradient} text-white border-0 text-[10px] font-bold py-1 px-3 rounded-lg uppercase shadow-sm`}>
                            {slot.slot_type}
                          </Badge>
                        </div>
                      </div>

                      {/* Rating & Features */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "fill-gray-600 text-gray-600"}`} />
                          ))}
                          <span className="text-[11px] text-gray-400 ml-1 font-medium">4.0</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 24h Access
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-600" />
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Verified
                          </span>
                        </div>
                      </div>

                      {/* Book Button - Enhanced */}
                      <Button
                        onClick={() => handleBookSlot(slot, zone)}
                        className={`w-full h-12 rounded-2xl font-bold text-sm shadow-lg transition-all duration-300 active:scale-95 group-hover:shadow-xl ${
                          slot.status === "available"
                            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white shadow-indigo-500/30"
                            : "bg-slate-700 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={slot.status !== "available"}
                      >
                        {slot.status === "available" ? (
                          <>
                            <span>Book Now</span>
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          "Currently Unavailable"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State - Enhanced */
        <Card className="card-elegant border-dashed overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="relative">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6 border border-slate-600/30">
                <MapPin className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">No Slots Found</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                Try adjusting your filters or search query to find available parking slots.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters({});
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/20 font-bold"
              >
                <X className="h-4 w-4 mr-2" /> Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedSlot(null);
        }}
        onConfirm={handlePaymentConfirm}
        slotDetails={selectedSlot}
        isProcessing={isProcessing}
      />

      {/* Success Message */}
      <SuccessMessage
        message={successMessage}
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}