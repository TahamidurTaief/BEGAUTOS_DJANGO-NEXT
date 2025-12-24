import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ResultItem {
  image: string;
  title: string;
  url: string;
  is_featured: boolean; // Add this property to your interface
}

interface ApiResponse {
  results: ResultItem[];
  next: string | null;
  previous: string | null;
  total_page: number;
  current_page: number;
}

export default function TestimonialGallerySection() {
  const [data, setData] = useState<ApiResponse>({
    results: [],
    next: null,
    previous: null,
    total_page: 0,
    current_page: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/people-talk/?limit=100`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        // Filter featured items and get the last 9 - now properly typed
        const featuredItems = result.data.results
          .filter((item: ResultItem) => item.is_featured)
          .slice(-9);

        setData({
          ...result.data,
          results: featuredItems,
        });

        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">Error: {error}</div>
        </div>
      </section>
    );
  }

  // Helper function to get image URL or fallback
  const getImageUrl = (index: number) => {
    return data.results[index]?.image || "/images/placeholder.png";
  };

  const getImageTitle = (index: number) => {
    return data.results[index]?.title || "BEG Social Image";
  };

  const getImageLink = (index: number) => {
    return data.results[index]?.url || "#";
  };

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-[32px] sm:text-2xl md:text-3xl font-medium mb-4 text-white">
            BEG across socials
          </h2>
          {/* <p className="text-[14px] max-w-5xl leading-relaxed text-justify text-white">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using.
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {/* Large image top */}
            <div className="aspect-square">
              <a
                href={getImageLink(0)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                <div className="relative aspect-square rounded-[4px] overflow-hidden">
                  <Image
                    src={getImageUrl(0)}
                    alt={getImageTitle(0)}
                    width={400} // Change from 414 to 400
                    height={400} // Change from 414 to 400
                     // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                    className="object-cover rounded-[4px] w-full h-full"
                  />
                </div>
                <div className="absolute bottom-3 left-3 text-white z-20">
                  <p className="font-medium">{getImageTitle(0)}</p>
                </div>
              </a>
            </div>
            {/* Two small images bottom */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square">
                <a
                  href={getImageLink(1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                  <div className="relative aspect-square rounded-[4px] overflow-hidden">
                    <Image
                      src={getImageUrl(1)}
                      alt={getImageTitle(1)}
                      width={200}
                      height={200}
                       // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                      className="object-cover rounded-[4px] w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <p className="font-medium text-sm">{getImageTitle(1)}</p>
                  </div>
                </a>
              </div>
              <div className="aspect-square">
                <a
                  href={getImageLink(2)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                  <div className="relative aspect-square rounded-[4px] overflow-hidden">
                    <Image
                      src={getImageUrl(2)}
                      alt={getImageTitle(2)}
                      width={200}
                      height={200}
                       // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                      className="object-cover rounded-[4px] w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <p className="font-medium text-sm">{getImageTitle(2)}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {/* Two small images top */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square">
                {" "}
                <a
                  href={getImageLink(3)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                  <div className="relative aspect-square rounded-[4px] overflow-hidden">
                    <Image
                      src={getImageUrl(3)}
                      alt={getImageTitle(3)}
                      width={200}
                      height={200}
                       // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                      className="object-cover rounded-[4px] w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <p className="font-medium text-sm">{getImageTitle(3)}</p>
                  </div>
                </a>
              </div>
              <div className="aspect-square">
                <a
                  href={getImageLink(4)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                  <div className="relative aspect-square rounded-[4px] overflow-hidden">
                    <Image
                      src={getImageUrl(4)}
                      alt={getImageTitle(4)}
                      width={200}
                      height={200}
                       // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                      className="object-cover rounded-[4px] w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <p className="font-medium text-sm">{getImageTitle(4)}</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Large image bottom */}
            <div className="aspect-square">
              <a
                href={getImageLink(5)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                <div className="relative aspect-square rounded-[4px] overflow-hidden">
                  <Image
                    src={getImageUrl(5)}
                    alt={getImageTitle(5)}
                    width={400} // Change from 414 to 400
                    height={400} // Change from 414 to 400
                     // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                    className="object-cover rounded-[4px] w-full h-full"
                  />
                </div>
                <div className="absolute bottom-3 left-3 text-white z-20">
                  <p className="font-medium">{getImageTitle(5)}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            {/* Large image top */}
            <div className="aspect-square">
              <a
                href={getImageLink(6)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                <div className="relative aspect-square rounded-[4px] overflow-hidden">
                  <Image
                    src={getImageUrl(6)}
                    alt={getImageTitle(6)}
                     // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                    width={400} // Change from 414 to 400
                    height={400} // Change from 414 to 400
                    className="object-cover rounded-[4px] w-full h-full"
                  />
                </div>
                <div className="absolute bottom-3 left-3 text-white z-20">
                  <p className="font-medium">{getImageTitle(6)}</p>
                </div>
              </a>
            </div>
            {/* Two small images bottom */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square">
                <a
                  href={getImageLink(7)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                  <div className="relative aspect-square rounded-[4px] overflow-hidden">
                    <Image
                      src={getImageUrl(7)}
                      alt={getImageTitle(7)}
                      width={200}
                      height={200}
                       // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                      className="object-cover rounded-[4px] w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <p className="font-medium text-sm">{getImageTitle(7)}</p>
                  </div>
                </a>
              </div>
              <div className="aspect-square">
                <a
                  href={getImageLink(8)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded-[4px]"></div>
                  <div className="relative aspect-square rounded-[4px] overflow-hidden">
                    <Image
                      src={getImageUrl(8)}
                      alt={getImageTitle(8)}
                      width={200}
                      height={200}
                       // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                      className="object-cover rounded-[4px] w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <p className="font-medium text-sm">{getImageTitle(8)}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* See All button */}
        <div className="mt-5 text-center">
          <Link href="/gallery">
            <div className=" py-3 px-6 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 text-white rounded-[4px]">
              See All
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
