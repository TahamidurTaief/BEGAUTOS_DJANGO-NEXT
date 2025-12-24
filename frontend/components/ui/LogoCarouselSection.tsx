"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Brand {
  id: number;
  name: string;
  image: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Brand[];
}

export default function LogoCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Number of logos to show per slide depending on screen size
  const logosPerSlide = 7;

  // Calculate total number of slides
  const totalSlides = Math.ceil(brands.length / logosPerSlide);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inventory/brands/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data) {
          setBrands(result.data);
        } else {
          throw new Error(result.message || "Failed to load brands");
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError(err instanceof Error ? err.message : "Failed to load brands");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Auto-scroll carousel every 5 seconds (only if we have brands)
  useEffect(() => {
    if (brands.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, brands.length]);

  // Get logos for current slide
  const getVisibleLogos = () => {
    const startIndex = currentSlide * logosPerSlide;
    return brands.slice(startIndex, startIndex + logosPerSlide);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
        <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="max-w-7xl mx-auto">
              <div className="h-[178px] relative">
                <div className="flex items-center justify-center gap-4">
                  {/* Loading skeleton */}
                  {Array.from({ length: logosPerSlide }).map((_, index) => (
                    <div
                      key={index}
                      className="w-[140px] sm:w-[160px] md:w-[178px] h-[140px] sm:h-[160px] md:h-[178px] bg-gray-800 shadow-sm flex items-center justify-center p-4 border border-gray-700 rounded-[5px] animate-pulse"
                    >
                      <div className="w-[64px] sm:w-[72px] md:w-[86px] h-[64px] sm:h-[72px] md:h-[86px] bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
        <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] relative overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-red-400 mb-2">Failed to load brand logos</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No brands found
  if (brands.length === 0) {
    return (
      <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
        <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] relative overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-gray-400">No brand logos available</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
      <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="max-w-7xl mx-auto">
            {/* Logo Carousel */}
            <div className="h-[178px] relative">
              <div className="flex items-center justify-center gap-4">
                {getVisibleLogos().map((brand) => (
                  <div
                    key={brand.id}
                    className="w-[140px] sm:w-[160px] md:w-[178px] h-[140px] sm:h-[160px] md:h-[178px] bg-black shadow-sm flex items-center justify-center p-4 border border-gray-800 rounded-[5px]"
                  >
                    <div className="relative w-[64px] sm:w-[72px] md:w-[86px] h-[64px] sm:h-[72px] md:h-[86px]">
                      <Image
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, 86px"
                        onError={(e) => {
                          // Fallback for broken images
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray-400 text-xs text-center">${brand.name}</div>`;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots - Only show if there are multiple slides */}
              {totalSlides > 1 && (
                <div className="flex justify-center mt-8">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                        currentSlide === index ? "bg-white" : "bg-gray-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
