"use client";

import Contact from "@/components/portfolio/Contact";
import { useProfile } from "@/hooks/use-api";
import { useFallbackProfile } from "@/hooks/use-fallback-profile";

export default function ContactPage() {
  const { data: dbProfile } = useProfile();
  const profile = useFallbackProfile(dbProfile);
  return (
    <div className="py-24 lg:py-32">
      <Contact profile={profile} />
    </div>
  );
}
