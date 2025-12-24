"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define interface for people talk items
interface PeopleTalkItem {
  id: number;
  image: string;
  title: string;
  url: string;
}

// Define interface for API response
interface PeopleTalkResponse {
  results: PeopleTalkItem[];
  next: string | null;
  previous: string | null;
  total_page: number;
  current_page: number;
}

// Define interface for API data wrapper
interface ApiResponse {
  success: boolean;
  message: string;
  data: PeopleTalkResponse;
}

// Define props interface for ImageCard component
interface ImageCardProps {
  image?: string;
  title?: string;
  url?: string;
  className?: string;
  badge?: string;
}

export default function PeopleTalk() {
  // Properly typed state initialization
  const [data, setData] = useState<PeopleTalkResponse>({
    results: [],
    next: null,
    previous: null,
    total_page: 0,
    current_page: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = async () => {
    console.log("Load more clicked", { currentPage, hasMore, isLoadingMore });

    if (!hasMore || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const offset = currentPage * 14; // 14 items per page

      console.log("Fetching page:", nextPage, "offset:", offset);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/people-talk/?limit=14&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = (await response.json()) as ApiResponse;

      console.log(
        "Response:",
        result.data.current_page,
        "of",
        result.data.total_page
      );
      console.log("New results count:", result.data.results.length);

      // Append new results to existing data
      setData((prevData) => ({
        ...result.data,
        results: [...prevData.results, ...result.data.results],
      }));

      setCurrentPage(nextPage);
      // Fix: Check if the newly fetched page is the last page
      setHasMore(nextPage < result.data.total_page);
      setIsLoadingMore(false);
    } catch (err) {
      console.error("Load more error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/people-talk/?limit=14&offset=0`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = (await response.json()) as ApiResponse;

        console.log(
          "Initial fetch:",
          result.data.current_page,
          "of",
          result.data.total_page
        );
        console.log("Initial results count:", result.data.results.length);

        setData(result.data);
        // Fix: Check if there are more pages available
        setHasMore(result.data.total_page > 1);
        setIsLoading(false);
      } catch (err) {
        console.error("Initial fetch error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto mt-15">
        <h1 className="text-4xl font-bold mb-3">BEG across socials</h1>

        <p className="mb-10 text-gray-400 max-w-3xl"></p>

        {/* First Row (3 images) - Now Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[0]?.image}
              url={data.results[0]?.url}
              className="aspect-[4/3] min-h-[200px] md:min-h-[100px]"
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[1]?.image}
              url={data.results[1]?.url}
              className="aspect-[4/3] min-h-[200px] md:min-h-[100px]"
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[2]?.image}
              url={data.results[2]?.url}
              className="aspect-[4/3] min-h-[200px] md:min-h-[100px]"
            />
          </div>
        </div>

        {/* Second Row (2 images, larger) - Now Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[3]?.image}
              url={data.results[3]?.url}
              className="aspect-[16/9] min-h-[200px] md:min-h-[180px]"
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[4]?.image}
              url={data.results[4]?.url}
              className="aspect-[16/9] min-h-[200px] md:min-h-[180px]"
            />
          </div>
        </div>

        {/* Third Row (3 cards) - Now Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <ImageCard
              image={data.results[5]?.image}
              url={data.results[5]?.url}
              className="aspect-[32/15] min-h-[120px] md:min-h-[100px]"
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[6]?.image}
              url={data.results[6]?.url}
              className="aspect-[30/29] min-h-[180px] md:min-h-[100px]"
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[7]?.image}
              url={data.results[7]?.url}
              className="aspect-[30/29] min-h-[180px] md:min-h-[100px]"
            />
          </div>
        </div>

        {/* Final Row - Already Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-4">
          {/* Column 1: 25% - Two landscape images stacked */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="grid grid-rows-2 gap-4">
              <div className="row-span-1">
                <ImageCard
                  image={data.results[8]?.image}
                  url={data.results[8]?.url}
                  className="aspect-[16/9] min-h-[80px] md:min-h-[40px]"
                />
              </div>
              <div className="row-span-1">
                <ImageCard
                  image={data.results[9]?.image}
                  url={data.results[9]?.url}
                  className="aspect-[16/9] min-h-[80px] md:min-h-[40px]"
                />
              </div>
            </div>
          </div>

          {/* Column 2: 25% - One tall portrait image */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ImageCard
              image={data.results[10]?.image}
              url={data.results[10]?.url}
              className="aspect-[16/9] md:aspect-[9/11] lg:aspect-[9/11] min-h-[140px]"
            />
          </div>

          {/* Column 3: 50% - Two rows layout */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="grid grid-rows-2 gap-4">
              {/* Top row: One landscape image */}
              <div className="row-span-1">
                <ImageCard
                  image={data.results[11]?.image}
                  url={data.results[11]?.url}
                  className="aspect-[64/19] md:aspect-[64/20] lg:aspect-[64/19] min-h-[100px] md:min-h-[100px]"
                />
              </div>

              {/* Bottom row: Two images side by side */}
              <div className="row-span-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <ImageCard
                      image={data.results[12]?.image}
                      url={data.results[12]?.url}
                      className="aspect-[16/9] md:aspect-[16/9] min-h-[80px] md:min-h-[10px]"
                    />
                  </div>
                  <div className="col-span-1">
                    <ImageCard
                      image={data.results[13]?.image}
                      url={data.results[13]?.url}
                      className="aspect-[16/9] md:aspect-[16/9] min-h-[80px] md:min-h-[10px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional items from load more - Display in a simple grid */}
        {data.results.length > 14 && (
          <div className="mt-1">
            {/* <h2 className="text-2xl font-bold mb-6">More Content</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.results.slice(14).map((item, index) => (
                <ImageCard
                  key={item.id || index}
                  image={item.image}
                  url={item.url}
                  title={item.title}
                  className="aspect-[4/3] min-h-[200px]"
                />
              ))}
            </div>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {/* Debug info (remove in production) */}
        {/* <div className="mt-4 text-xs text-gray-500">
          <p>Total items: {data.results.length}</p>
          <p>Current page: {currentPage}</p>
          <p>Total pages: {data.total_page}</p>
          <p>Has more: {hasMore.toString()}</p>
        </div> */}
      </div>
    </div>
  );
}

// Image Card Component
function ImageCard({ image, title, url, className, badge }: ImageCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden rounded-lg group ${className}`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>

      {/* Optional Badge */}
      {badge && (
        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded z-20 text-xs">
          {badge}
        </div>
      )}

      {/* Image */}
      <Image
        src={image || "/images/placeholder.png"}
        alt={title || "Beg Autos Social Talk"}
        width={400}
        height={300}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Title */}
      {title && (
        <div className="absolute bottom-0 left-0 p-3 z-20">
          <h3 className="text-white font-medium truncate">{title}</h3>
        </div>
      )}
    </a>
  );
}
