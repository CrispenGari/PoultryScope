import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { zustandStorage } from "./storage";
import { STORAGE_NAME } from "../constants";
export type TStorage = { wishlists: boolean };
export type TSettings = {
  haptics: boolean;
  sound: boolean;
  new: boolean;
  notifications: boolean;
};

const initialSettings: TSettings = {
  haptics: true,
  sound: true,
  new: true,
  notifications: true,
};

interface TSettingsState {
  settings: TSettings;
  update: (settings: TSettings) => void;
  restore: () => void;
}

export const useSettingsStore = create<TSettingsState>()(
  persist(
    (set, _get) => ({
      settings: initialSettings,
      update: (settings) => set({ ..._get(), settings }),
      restore: () => set({ ..._get(), settings: initialSettings }),
    }),
    {
      name: STORAGE_NAME.SETTINGS,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
