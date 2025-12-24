"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [animateClass, setAnimateClass] = useState("translate-x-full");

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setAnimateClass("translate-x-full"); // Start off-screen

      // Delay to allow DOM to mount before applying animation
      const timeout = setTimeout(() => {
        setAnimateClass("translate-x-0"); // Slide in
      }, 50); // 10ms is enough for smooth transition

      return () => clearTimeout(timeout);
    } else {
      setAnimateClass("translate-x-full"); // Slide out
      const timeout = setTimeout(() => {
        setIsMounted(false); // Unmount after animation
      }, 300); // Match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/3 z-50 bg-black bg-opacity-95 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${animateClass}
      `}
    >
      <div className="flex justify-end p-6">
        <button onClick={onClose} className="text-white hover:text-gray-300">
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col items-start justify-start h-full pt-10 pr-6 pl-10">
        <ul className="space-y-6 text-left">
          {[
            { name: "Home", path: "/" },
            { name: "Inventory", path: "/cars" },
            { name: "Gallery", path: "/gallery" },
            { name: "About Us", path: "/about" },
            { name: "Sell Your Car", path: "/sell" },
          ].map(({ name, path }) => (
            <li key={name}>
              <Link
                href={path}
                onClick={onClose}
                className="text-white text-[16px] sm:text-xl md:text-2xl hover:text-gray-300 transition"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
