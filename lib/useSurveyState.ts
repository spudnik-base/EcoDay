"use client";

import { useEffect, useState } from "react";
import { initialState, loadState, saveState } from "./storage";
import type { SurveyState } from "./types";
import type { AbioticKey, SpeciesId } from "./constants";

export function useSurveyState() {
  const [state, setState] = useState<SurveyState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    if (loaded) setState(loaded);
    setHydrated(true);
  }, []);

  function commit(next: SurveyState) {
    setState(next);
    saveState(next);
  }

  function update(patch: Partial<SurveyState>) {
    commit({ ...state, ...patch });
  }

  function updateGps(patch: Partial<SurveyState["gps"]>) {
    commit({ ...state, gps: { ...state.gps, ...patch } });
  }

  function setAbiotic(key: AbioticKey, i: 0 | 1 | 2, v: string) {
    const next = [...state.ab[key]] as [string, string, string];
    next[i] = v;
    commit({ ...state, ab: { ...state.ab, [key]: next } });
  }

  function stepBio(id: SpeciesId, delta: number) {
    const c = Math.max(0, (state.bio[id] || 0) + delta);
    commit({ ...state, bio: { ...state.bio, [id]: c } });
  }

  function setMeadowCover(letter: string, v: string) {
    commit({
      ...state,
      mdw: { ...state.mdw, cover: { ...state.mdw.cover, [letter]: v } }
    });
  }

  function setMeadowSite(s: "marsh" | "drained") {
    commit({ ...state, mdw: { ...state.mdw, site: s } });
  }

  function reset() {
    commit(initialState());
  }

  return {
    state,
    hydrated,
    update,
    updateGps,
    setAbiotic,
    stepBio,
    setMeadowCover,
    setMeadowSite,
    reset
  };
}

export type UseSurveyState = ReturnType<typeof useSurveyState>;
