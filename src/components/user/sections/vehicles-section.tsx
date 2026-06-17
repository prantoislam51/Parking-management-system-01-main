"use client";

import { mockVehicles } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Input } from "@/components/shared/input";
import { SuccessMessage, ConfirmModal } from "@/components/shared";
import { Car, Plus, Trash2, Edit3, ShieldCheck, X, Bike, Truck, Gauge, Calendar } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { useState } from "react";
import { Vehicle } from "@/lib/types";

export function VehiclesSection() {
  const { isDemoMode } = useDemoModeStore();
  const [vehicles, setVehicles] = useState<Vehicle[]>(isDemoMode ? mockVehicles : []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState<{
    vehicle_number: string;
    brand: string;
    model: string;
    license_number: string;
    vehicle_type: string;
  }>({
    vehicle_number: "",
    brand: "",
    model: "",
    license_number: "",
    vehicle_type: "car",
  });

  const handleAddClick = () => {
    setEditingVehicle(null);
    setFormData({ vehicle_number: "", brand: "", model: "", license_number: "", vehicle_type: "car" });
    setIsFormOpen(true);
  };

  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicle_number: vehicle.vehicle_number,
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      license_number: vehicle.license_number || "",
      vehicle_type: vehicle.vehicle_type
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (editingVehicle) {
      setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? { ...v, ...formData, vehicle_type: formData.vehicle_type as Vehicle["vehicle_type"] } : v));
      setSuccessMsg("Vehicle updated successfully!");
    } else {
      const newVehicle: Vehicle = {
        id: crypto.randomUUID(),
        user_id: "user-1",
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vehicle_number: formData.vehicle_number,
        license_number: formData.license_number,
        vehicle_type: formData.vehicle_type as Vehicle["vehicle_type"],
        brand: formData.brand,
        model: formData.model,
      };
      setVehicles(prev => [newVehicle, ...prev]);
      setSuccessMsg("Vehicle added successfully!");
    }
    setIsFormOpen(false);
    setShowSuccess(true);
  };

  const handleDelete = () => {
    if (vehicleToDelete) {
      setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete));
      setVehicleToDelete(null);
      setSuccessMsg("Vehicle deleted successfully!");
      setShowSuccess(true);
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "bike": return Bike;
      case "truck":
      case "bus": return Truck;
      default: return Car;
    }
  };

  const getVehicleColor = (type: string) => {
    switch (type) {
      case "car": return { bg: "from-indigo-500/20 to-purple-500/20", text: "text-indigo-400", border: "border-indigo-500/30", gradient: "from-indigo-500 to-purple-600" };
      case "bike": return { bg: "from-emerald-500/20 to-teal-500/20", text: "text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500 to-teal-600" };
      default: return { bg: "from-amber-500/20 to-orange-500/20", text: "text-amber-400", border: "border-amber-500/30", gradient: "from-amber-500 to-orange-600" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Vehicles</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Manage and track all your registered vehicles.
          </p>
        </div>
        <Button
          onClick={handleAddClick}
          className="h-12 px-6 font-bold rounded-xl shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 active:scale-95 text-white border-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Vehicle
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-elegant p-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
              <Car className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{vehicles.length}</p>
              <p className="text-xs text-gray-500 font-medium">Total Vehicles</p>
            </div>
          </div>
        </div>
        <div className="card-elegant p-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{vehicles.filter(v => v.is_verified).length}</p>
              <p className="text-xs text-gray-500 font-medium">Verified</p>
            </div>
          </div>
        </div>
        <div className="card-elegant p-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
              <Gauge className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">2</p>
              <p className="text-xs text-gray-500 font-medium">Active Bookings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <Card className="card-elegant animate-in slide-in-from-top-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center">
                  <Car className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Fill in the vehicle information below.</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)} className="rounded-lg text-gray-400 hover:text-white hover:bg-slate-700">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Plate Number</label>
                <Input
                  value={formData.vehicle_number}
                  onChange={e => setFormData(prev => ({ ...prev, vehicle_number: e.target.value }))}
                  placeholder="e.g. DHAKA-METRO-KA-1234"
                  className="h-12 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Brand</label>
                <Input
                  value={formData.brand}
                  onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="e.g. Toyota"
                  className="h-12 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Model</label>
                <Input
                  value={formData.model}
                  onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g. Corolla"
                  className="h-12 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">License Number</label>
                <Input
                  value={formData.license_number}
                  onChange={e => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
                  placeholder="e.g. 12-3456"
                  className="h-12 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Vehicle Type</label>
                <select
                  value={formData.vehicle_type}
                  onChange={e => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
                  className="w-full h-12 px-4 rounded-xl border-2 border-slate-600 bg-slate-900/80 text-sm font-medium text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none cursor-pointer"
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="truck">Truck</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsFormOpen(false)} className="h-12 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-slate-500 transition-all">
                Cancel
              </Button>
              <Button onClick={handleSave} className="h-12 rounded-xl font-bold px-8 shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all">
                {editingVehicle ? "Save Changes" : "Add Vehicle"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vehicle Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {vehicles.map((vehicle) => {
          const VehicleIcon = getVehicleIcon(vehicle.vehicle_type);
          const colors = getVehicleColor(vehicle.vehicle_type);
          return (
            <Card key={vehicle.id} className="card-elegant group hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-0">
                {/* Header with gradient */}
                <div className={`h-20 bg-gradient-to-br ${colors.bg} flex items-center justify-between p-4 border-b ${colors.border}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center border ${colors.border} shadow-lg`}>
                      <VehicleIcon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <div>
                      <Badge className={`bg-gradient-to-r ${colors.gradient} text-white border-0 text-xs px-3 py-1 font-bold rounded-full shadow-lg`}>
                        {vehicle.vehicle_type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  {vehicle.is_verified && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 font-bold rounded-full">
                      <ShieldCheck className="h-3 w-3 mr-1.5" /> Verified
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="text-center py-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Plate Number</p>
                      <p className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{vehicle.vehicle_number}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-center">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Brand</p>
                        <p className="font-bold text-sm text-white">{vehicle.brand || 'N/A'}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-center">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Model</p>
                        <p className="font-bold text-sm text-white">{vehicle.model || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Added {new Date(vehicle.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(vehicle)}
                        className="flex-1 h-10 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:text-white hover:border-indigo-500/50 transition-all"
                      >
                        <Edit3 className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setVehicleToDelete(vehicle.id)}
                        className="h-10 w-10 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-slate-700/50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Empty State Card */}
        {vehicles.length === 0 && (
          <Card className="col-span-full card-elegant border-dashed">
            <CardContent className="p-12 text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">No Vehicles Added</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">Add your first vehicle to start booking parking slots and manage them in one place.</p>
              <Button onClick={handleAddClick} className="h-12 px-8 font-bold rounded-xl shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all">
                <Plus className="h-5 w-5 mr-2" /> Add Your First Vehicle
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmModal
        open={!!vehicleToDelete}
        onOpenChange={() => setVehicleToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />

      <SuccessMessage
        isVisible={showSuccess}
        message={successMsg}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}