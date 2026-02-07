"use client";

import { ModeToggle } from "@/components/layout/ModeToogle";
import React, { useEffect, useState } from "react";

export default function ThemeWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="size-9" />; 

  return <ModeToggle />;
}