"use client";

import { create } from "zustand";
import type { CommunityItem } from "@/data/communityFeed";
import { getStylePromptTemplate, type CreationFormat, type CreationStyle } from "@/data/contentMap";

export type PanelMode = "idle" | "info" | "create" | "result" | "qr";

type AppState = {
  selectedObject: string | null;
  panelMode: PanelMode;
  selectedStyle: CreationStyle;
  selectedFormat: CreationFormat;
  promptText: string;
  currentResult: CommunityItem | null;
  generatedItems: CommunityItem[];
  isGenerating: boolean;
  error: string | null;
  setSelectedObject: (id: string) => void;
  setPanelMode: (mode: PanelMode) => void;
  setSelectedStyle: (style: CreationStyle) => void;
  setSelectedFormat: (format: CreationFormat) => void;
  setPromptText: (prompt: string) => void;
  setCurrentResult: (item: CommunityItem) => void;
  addGeneratedItem: (item: CommunityItem) => void;
  setGenerating: (value: boolean) => void;
  setError: (message: string | null) => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedObject: null,
  panelMode: "idle",
  selectedStyle: "starlight-gukak",
  selectedFormat: "image",
  promptText: getStylePromptTemplate("starlight-gukak"),
  currentResult: null,
  generatedItems: [],
  isGenerating: false,
  error: null,
  setSelectedObject: (id) => set({ selectedObject: id, panelMode: "info", error: null }),
  setPanelMode: (mode) => set({ panelMode: mode, error: null }),
  setSelectedStyle: (style) => set({ selectedStyle: style, promptText: getStylePromptTemplate(style) }),
  setSelectedFormat: (format) => set({ selectedFormat: format }),
  setPromptText: (prompt) => set({ promptText: prompt }),
  setCurrentResult: (item) => set({ currentResult: item, panelMode: "result", error: null }),
  addGeneratedItem: (item) =>
    set((state) => ({
      generatedItems: [item, ...state.generatedItems].slice(0, 6),
      currentResult: item,
      panelMode: "result",
      error: null
    })),
  setGenerating: (value) => set({ isGenerating: value }),
  setError: (message) => set({ error: message }),
  reset: () =>
    set({
      selectedObject: null,
      panelMode: "idle",
      selectedStyle: "starlight-gukak",
      selectedFormat: "image",
      promptText: getStylePromptTemplate("starlight-gukak"),
      currentResult: null,
      error: null
    })
}));
