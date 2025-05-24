"use client";

import { useEffect } from "react";

const ClientLayout = () => {
  useEffect(() => {
    const adjustStyles = () => {
      const zoomLevel = Math.round(window.devicePixelRatio * 100);

      let scaleFactor = 1;
      if (zoomLevel === 125) {
        scaleFactor = 0.7;
      } else if (zoomLevel === 150) {
        scaleFactor = 0.75;
      }
      document.documentElement.style.fontSize = `${16 * scaleFactor}px`;
    };

    adjustStyles();
    window.addEventListener("resize", adjustStyles);

    return () => window.removeEventListener("resize", adjustStyles);
  }, []);

  return null;
};

export default ClientLayout;
