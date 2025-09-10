// PostHog Analytics Provider
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only initialize if we have the key and are in browser
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",

        // Enhanced configuration for portfolio analytics
        person_profiles: "identified_only", // Track identified users only
        capture_pageview: true, // Track page views
        capture_pageleave: true, // Track when users leave
        autocapture: true, // Automatically capture interactions
        
        // Session recording with privacy
        session_recording: {
          maskAllInputs: true, // Mask sensitive inputs
        },

        // Performance monitoring
        capture_performance: true,
        
        // Console logs in development
        debug: process.env.NODE_ENV === "development",
        
        // Bootstrap for better performance
        bootstrap: {
          distinctID: undefined,
          isIdentifiedID: false,
        },
      });

      // Log initialization in development
      if (process.env.NODE_ENV === "development") {
        console.log("PostHog initialized successfully");
      }
    }
  }, []);

  // Track route changes
  useEffect(() => {
    if (pathname && typeof posthog !== "undefined") {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
      
      // Capture page view with additional context
      posthog.capture("$pageview", {
        $current_url: url,
        $pathname: pathname,
      });
    }
  }, [pathname, searchParams]);

  // Don't render PostHog provider if no key provided
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog: No API key provided. Analytics disabled.");
    }
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

// Export posthog for use in other components
export { posthog };