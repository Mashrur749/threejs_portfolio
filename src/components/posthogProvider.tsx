// PostHog Provider - Session Recordings Only
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize if we have the key and are in production/staging
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",

        // Minimal configuration - only session recordings
        person_profiles: "never", // Don't create person profiles - we use GA4 for user tracking
        capture_pageview: false, // GA4 handles pageviews
        capture_pageleave: false, // GA4 handles this
        autocapture: false, // GA4 handles events

        // Enable session recordings with basic privacy
        session_recording: {
          maskAllInputs: true, // Privacy - mask all form inputs
        },
      });
    }
  }, []);

  // Don't render PostHog provider if no key provided
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
