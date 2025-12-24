// components/layout/Header.tsx
"use client";

import CarinventoryOverlay from "@/components/ui/CarInventoryOverlay";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navigation from "./Navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header absolute w-full z-90 px-6 py-4">
      <div className="relative mx-auto flex items-center justify-between max-w-7xl">
        {/* Left Section: Search */}
        <CarinventoryOverlay />
        {/* /images/logo.png */}
        {/* Center: Logo (absolutely centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Desktop Logo: visible on md and up */}
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="BEG AUTOS"
              width={233}
              height={20}
              className="hidden md:block"
              priority
            />
          </Link>

          {/* Mobile Logo: visible on small screens only */}
          <Link href="/">
            <Image
              src="/images/logo-sm.png"
              alt="BEG AUTOS"
              width={40}
              height={10}
              className=" block md:hidden"
              priority
            />
          </Link>
        </div>

        {/* Right Section: Stock Button + Burger Menu */}
        <div className="flex items-center gap-2 min-w-[120px] justify-end ml-auto ">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-gray-300 transition cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Menu Panel */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
