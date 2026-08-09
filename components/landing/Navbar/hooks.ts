"use client";

import { useEffect, useState } from "react";

export function useNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return {
    mobileOpen,
    scrolled,
    openMenu: () => setMobileOpen(true),
    closeMenu: () => setMobileOpen(false),
    toggleMenu: () => setMobileOpen((prev) => !prev),
  };
}