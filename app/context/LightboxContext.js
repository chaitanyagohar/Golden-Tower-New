'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const LightboxContext = createContext();

export const LightboxProvider = ({ children }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  // Auto open popup after 3 seconds on reload
  useEffect(() => {
    const timer = setTimeout(() => {
      openLightbox();
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <LightboxContext.Provider value={{ isLightboxOpen, openLightbox, closeLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => useContext(LightboxContext);
