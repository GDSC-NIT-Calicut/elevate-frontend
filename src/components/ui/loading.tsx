"use client";

import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">

        <div className="absolute h-16 w-16 animate-pulse rounded-full bg-emerald-500/20 blur-xl"></div>
        

        <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-800 border-t-emerald-500"></div>

        <div className="absolute h-2 w-2 rounded-full bg-emerald-500"></div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-zinc-200 font-medium tracking-wide">Loading</h2>
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em] animate-pulse">
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;