"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePerformanceMonitor, QualityLevel } from "../hooks/usePerformanceMonitor";

interface PerformanceContextProps {
  quality: QualityLevel;
}

const PerformanceContext = createContext<PerformanceContextProps | undefined>(undefined);

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const quality = usePerformanceMonitor();

  return (
    <PerformanceContext.Provider value={{ quality }}>
      <div className={`app-wrapper quality-${quality}`}>
        {children}
      </div>
    </PerformanceContext.Provider>
  );
};

export const usePerformance = (): PerformanceContextProps => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error("usePerformance must be used within a PerformanceProvider");
  }
  return context;
};
