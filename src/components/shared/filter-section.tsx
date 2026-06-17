"use client";

import { Search, Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface FilterSectionProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  filterOptions: {
    label: string;
    key: string;
    options: FilterOption[];
  }[];
  activeFilters?: Record<string, string>;
  placeholder?: string;
}

export function FilterSection({
  onSearch,
  onFilterChange,
  filterOptions,
  activeFilters: externalFilters,
  placeholder = "Search..."
}: FilterSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [internalFilters, setInternalFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const activeFilters = externalFilters || internalFilters;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterSelect = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (value === "all") {
      delete newFilters[key];
    }

    if (!externalFilters) {
      setInternalFilters(newFilters);
    }
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    if (!externalFilters) {
      setInternalFilters({});
    }
    onFilterChange({});
  };

  const getSelectedLabel = (key: string) => {
    const section = filterOptions.find(s => s.key === key);
    const selected = section?.options.find(o => o.value === activeFilters[key]);
    return selected?.label;
  };

  const activeCount = Object.keys(activeFilters).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Search Input - Dark Theme */}
        <div className="relative group flex-1">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={placeholder}
              className="h-14 w-full pl-12 pr-4 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium text-sm text-white placeholder:text-slate-500 shadow-lg shadow-slate-900/50 hover:border-slate-600"
            />
          </div>
        </div>

        {/* Filter Toggle Button - Dark Style */}
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`h-14 rounded-2xl font-bold px-6 transition-all duration-300 border-2 ${
            isFilterOpen
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-indigo-500/30'
              : activeCount > 0
                ? 'bg-slate-800 text-indigo-400 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-black animate-pulse">
                {activeCount}
              </span>
            )}
          </div>
        </Button>
      </div>

      {/* Active Filter Pills - Dark Theme */}
      <AnimatePresence>
        {activeCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="text-xs text-slate-500 font-semibold mr-2">Active filters:</span>
            {filterOptions.map((section) => {
              if (activeFilters[section.key]) {
                return (
                  <button
                    key={section.key}
                    onClick={() => handleFilterSelect(section.key, "all")}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all"
                  >
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">{section.label}:</span>
                    <span className="text-xs font-bold text-slate-300">{getSelectedLabel(section.key)}</span>
                    <X className="h-3 w-3 text-slate-500 group-hover:text-rose-400 transition-colors" />
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={clearFilters}
              className="text-xs text-slate-500 hover:text-rose-400 font-bold transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Filter Panel - Dark Theme */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-slate-950/50 overflow-hidden">
              <div className="p-6 lg:p-8">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <SlidersHorizontal className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-200">Filter Parking Slots</h3>
                      <p className="text-xs text-slate-500">Refine your search with detailed filters</p>
                    </div>
                  </div>
                  {activeCount > 0 && (
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-indigo-400">{activeCount}</span> filter{activeCount > 1 ? 's' : ''} applied
                    </div>
                  )}
                </div>

                {/* Filter Sections - Accordion Style */}
                <div className="space-y-3">
                  {filterOptions.map((section, idx) => {
                    const isExpanded = expandedSection === section.key;
                    const hasSelection = !!activeFilters[section.key];

                    return (
                      <div
                        key={section.key}
                        className={`rounded-2xl border transition-all duration-200 ${
                          hasSelection
                            ? 'border-indigo-500/30 bg-indigo-500/5'
                            : 'border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedSection(isExpanded ? null : section.key)}
                          className="w-full px-5 py-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold transition-colors ${
                              hasSelection ? 'text-indigo-400' : 'text-slate-400'
                            }`}>
                              {section.label}
                            </span>
                            {hasSelection && (
                              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500 text-white text-[10px] font-black">
                                1
                              </span>
                            )}
                          </div>
                          <ChevronDown className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5">
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => handleFilterSelect(section.key, "all")}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                                      !activeFilters[section.key]
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-slate-700 text-slate-300 border border-slate-600 hover:border-indigo-500 hover:bg-indigo-500/10'
                                    }`}
                                  >
                                    All {section.label}s
                                  </button>
                                  {section.options.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => handleFilterSelect(section.key, option.value)}
                                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                                        activeFilters[section.key] === option.value
                                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                                          : 'bg-slate-700 text-slate-300 border border-slate-600 hover:border-indigo-500 hover:bg-indigo-500/10'
                                      }`}
                                    >
                                      {option.icon && <span className="mr-2">{option.icon}</span>}
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-800">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-rose-400 font-bold transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Reset All Filters
                  </button>
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-lg shadow-indigo-500/20 font-bold"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
