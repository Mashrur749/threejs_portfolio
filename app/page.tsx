"use client";

import dynamic from "next/dynamic";
import HeroValueProp from "@/components/HeroValueProp";
import AllSectionsMobile from "@/components/AllSectionsMobile";
import NavigationMobile from "@/components/NavigationMobile";
import ConnectedNavigation from "@/components/ConnectedNavigation";

// Dynamically import the 3D particle scene
const InterconnectedParticles = dynamic(
  () => import("@/components/InterconnectedParticles"),
  {
    ssr: false,
    loading: () => null, // No loading state needed - transparent background
  }
);

export default function Home() {
  return (
    <>
      <NavigationMobile />
      
      {/* Connected Navigation with Progress Bar */}
      <ConnectedNavigation />

      {/* 3D Particle Background */}
      <InterconnectedParticles />

      <main className="relative" style={{ paddingTop: "56px" }}>
        {/* Content Sections */}
        <HeroValueProp />
        <AllSectionsMobile />
      </main>
    </>
  );
}
