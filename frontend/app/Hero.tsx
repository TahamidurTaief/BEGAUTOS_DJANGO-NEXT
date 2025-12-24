"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SliderData {
  heading: string;
  image: string; // This will be the video URL
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: SliderData;
}

export default function Hero() {
  const [sliderData, setSliderData] = useState<SliderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch slider data from API
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/slider`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch slider data");
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data) {
          setSliderData(result.data);
        } else {
          throw new Error(result.message || "Failed to load slider data");
        }
      } catch (err) {
        console.error("Error fetching slider data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load slider data"
        );
        // Set fallback data in case of error
        setSliderData({
          heading: "Finest Luxury Car Studio",
          image: "/videos/hero-bg.mp4", // fallback to local video
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="h-screen relative flex">
        {/* Loading background */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <div className="absolute inset-0 bg-black/70 z-10" />
        </div>

        {/* Loading content */}
        <div className="z-10 text-white px-4 w-full flex flex-col items-start max-w-7xl mt-[60vh] ml-4 md:ml-12 lg:ml-30">
          {/* Loading skeleton for heading */}
          <div className="bg-gray-700 animate-pulse rounded mb-6">
            <div className="h-12 sm:h-16 md:h-20 w-96 max-w-full"></div>
          </div>

          {/* Loading skeleton for buttons */}
          <div className="flex flex-row gap-2 sm:gap-5 w-full max-w-sm">
            <div className="bg-gray-700 animate-pulse rounded h-12 flex-1"></div>
            <div className="bg-gray-700 animate-pulse rounded h-12 flex-1"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#carousel-section"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce arrow-down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19.281 14.0306L12.531 20.7806C12.4614 20.8504 12.3787 20.9057 12.2876 20.9434C12.1966 20.9812 12.099 21.0006 12.0004 21.0006C11.9019 21.0006 11.8043 20.9812 11.7132 20.9434C11.6222 20.9057 11.5394 20.8504 11.4698 20.7806L4.71979 14.0306C4.57906 13.8899 4.5 13.699 4.5 13.501C4.5 13.301 4.57906 13.1101 4.71979 12.9694C4.86052 12.8286 5.05139 12.7496 5.25042 12.7496C5.44944 12.7496 5.64031 12.8286 5.78104 12.9694L11.2504 18.4397V3.75C11.2504 3.55109 11.3294 3.36032 11.4701 3.21967C11.6107 3.07902 11.8015 3 12.0004 3C12.1993 3 12.3901 3.07902 12.5307 3.21967C12.6714 3.36032 12.7504 3.55109 12.7504 3.75V18.4397L18.2198 12.9694C18.3605 12.8286 18.5514 12.7496 18.7504 12.7496C18.9494 12.7496 19.1403 12.8286 19.281 12.9694C19.4218 13.1101 19.5008 13.301 19.5008 13.5C19.5008 13.699 19.4218 13.8899 19.281 14.0306Z"
              fill="white"
            />
          </svg>
        </a>
      </section>
    );
  }

  return (
    <section className="h-screen relative flex">
      {/* Background video from API */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {sliderData?.image && (
          <video
            className="w-full h-full object-cover"
            src={sliderData.image}
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => {
              console.error("Video failed to load:", sliderData.image);
              // Optionally set a fallback background
              const videoElement = e.target as HTMLVideoElement;
              videoElement.style.display = "none";
              if (videoElement.parentElement) {
                videoElement.parentElement.style.backgroundColor = "#1f2937";
              }
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      {/* Hero content with dynamic heading */}
      <div className="z-10 text-white px-4 w-full flex flex-col items-start max-w-7xl mt-[60vh] ml-4 md:ml-12 lg:ml-30">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
          {sliderData?.heading || "Finest Luxury Car Studio"}
        </h1>

        {error && (
          <div className="bg-red-800/50 text-white px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-row gap-2 sm:gap-5">
          <Link
            href="/cars/brand-new"
            className="text-white px-2 py-3 sm:px-8 rounded border-2 text-xs sm:text-lg font-medium hover:bg-opacity-90 transition bg-transparent flex-1 whitespace-nowrap text-center"
          >
            Brand New
          </Link>
          <Link
            href="/cars/pre-owned"
            className="text-white px-2 py-3 sm:px-8 rounded border-2 text-xs sm:text-lg font-medium hover:bg-opacity-90 transition bg-transparent flex-1 whitespace-nowrap text-center"
          >
            Pre-Owned
          </Link>
        </div>

        {/* SVG Scroll Indicator */}
        <a
          href="#carousel-section"
          className="absolute bottom-10 md:bottom-4 left-1/2 -translate-x-1/2 animate-bounce arrow-down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19.281 14.0306L12.531 20.7806C12.4614 20.8504 12.3787 20.9057 12.2876 20.9434C12.1966 20.9812 12.099 21.0006 12.0004 21.0006C11.9019 21.0006 11.8043 20.9812 11.7132 20.9434C11.6222 20.9057 11.5394 20.8504 11.4698 20.7806L4.71979 14.0306C4.57906 13.8899 4.5 13.699 4.5 13.501C4.5 13.301 4.57906 13.1101 4.71979 12.9694C4.86052 12.8286 5.05139 12.7496 5.25042 12.7496C5.44944 12.7496 5.64031 12.8286 5.78104 12.9694L11.2504 18.4397V3.75C11.2504 3.55109 11.3294 3.36032 11.4701 3.21967C11.6107 3.07902 11.8015 3 12.0004 3C12.1993 3 12.3901 3.07902 12.5307 3.21967C12.6714 3.36032 12.7504 3.55109 12.7504 3.75V18.4397L18.2198 12.9694C18.3605 12.8286 18.5514 12.7496 18.7504 12.7496C18.9494 12.7496 19.1403 12.8286 19.281 12.9694C19.4218 13.1101 19.5008 13.301 19.5008 13.5C19.5008 13.699 19.4218 13.8899 19.281 14.0306Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
