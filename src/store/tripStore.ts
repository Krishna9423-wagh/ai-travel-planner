import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trip, TripFormData } from '@/types/trip';

interface TripStore {
  // Saved trips
  savedTrips: Trip[];
  saveTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  getTripById: (id: string) => Trip | undefined;

  // Current planning state
  currentForm: Partial<TripFormData>;
  setCurrentForm: (form: Partial<TripFormData>) => void;
  resetForm: () => void;

  // Generation state
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  generatingMessage: string;
  setGeneratingMessage: (msg: string) => void;

  // Active step in wizard
  wizardStep: number;
  setWizardStep: (step: number) => void;
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      savedTrips: [],
      saveTrip: (trip) =>
        set((state) => ({
          savedTrips: [trip, ...state.savedTrips.filter((t) => t.id !== trip.id)],
        })),
      deleteTrip: (id) =>
        set((state) => ({
          savedTrips: state.savedTrips.filter((t) => t.id !== id),
        })),
      updateTrip: (id, updates) =>
        set((state) => ({
          savedTrips: state.savedTrips.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        })),
      getTripById: (id) => get().savedTrips.find((t) => t.id === id),

      currentForm: {},
      setCurrentForm: (form) =>
        set((state) => ({ currentForm: { ...state.currentForm, ...form } })),
      resetForm: () => set({ currentForm: {}, wizardStep: 0 }),

      isGenerating: false,
      setIsGenerating: (val) => set({ isGenerating: val }),
      generatingMessage: '',
      setGeneratingMessage: (msg) => set({ generatingMessage: msg }),

      wizardStep: 0,
      setWizardStep: (step) => set({ wizardStep: step }),
    }),
    {
      name: 'ai-travel-planner-store',
      partialize: (state) => ({ savedTrips: state.savedTrips }),
    }
  )
);
