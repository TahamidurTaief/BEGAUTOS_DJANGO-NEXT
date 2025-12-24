"use client";
import Image from "next/image";
import YouTubeOverlay from "./YouTubeOverlay";

export default function BestShowroom() {
  return (
    <section className="py-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-4  mb-4">
          <div className="md:col-span-9">
            <h2 className="text-[28px]  md:text-3xl font-medium text-white">
              Experience Beyond Ordinary at BEG
            </h2>
            {/* <p className="text-[14px] max-w-5xl leading-relaxed text-justify text-white">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using.
            </p> */}
          </div>
          <div className=" md:col-span-3 flex justify-center lg:justify-end items-start">
            {/* Video Button */}
            <YouTubeOverlay />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* First Gallery Item */}
          <div className="overflow-hidden rounded-lg h-60 sm:h-72 lg:h-80 relative">
            <Image
              src="/images/best1.png"
              alt="Luxury Car Showroom"
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Second Gallery Item */}
          <div className="overflow-hidden rounded-lg h-60 sm:h-72 lg:h-80 relative">
            <Image
              src="/images/best2.png"
              alt="Showroom Team"
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Third Gallery Item */}
          <div className="overflow-hidden rounded-lg h-60 sm:h-72 lg:h-80 relative sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/best3.png"
              alt="Car Delivery"
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
