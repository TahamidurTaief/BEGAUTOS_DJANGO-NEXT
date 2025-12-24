// app/page.tsx
"use client";

import CarouselSection from "@/components/ui/CarouselSection";
import Features from "@/components/ui/Features";
import LogoCarouselSection from "@/components/ui/LogoCarouselSection";
import Link from "next/link";
import Appointment from "./Appointment";
import BestShowroom from "./BestShowroom";
import FooterHero from "./FooterHero";
import Hero from "./Hero";
import MultipleInventory from "./MultipleInventory";
import Social from "./Social";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />
      <div className="container-responsive">
        {/* Available Cars Now Section */}
        <section className="py-6 sm:py-3 md:py-4 lg:py-8 px-4 sm:px-6 ">
          <div className="max-w-7xl mx-auto w-full">
            {/* Title and See All link */}
            <div
              className="flex flex-col sm:flex-row justify-between
            items-start sm:items-center mb-6 sm:mb-3 md:mb-4 lg:mb-7 gap-4 sm:gap-0"
              id="carousel-section"
            >
              <h2 className="text-[32px] sm:text-2xl md:text-3xl font-medium text-white">
                Current Inventory
              </h2>
              <Link
                href="/cars"
                className="text-gray-200 hover:text-gray-400 transition-colors duration-200 text-sm sm:text-base"
              >
                See All
              </Link>
            </div>

            {/* Car Carousel */}
            <div className="w-full overflow-hidden">
              <CarouselSection />
            </div>
          </div>
        </section>

        <MultipleInventory />
        <LogoCarouselSection />
        <Appointment />
        <BestShowroom />
        <Social />
        <Features />
      </div>
      <FooterHero />
    </div>
  );
}
