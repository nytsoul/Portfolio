"use client";

import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <InstrumentationProvider>
      {children}
      <Toaster />
    </InstrumentationProvider>
  );
}
