"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

// Define the car type based on the API response
interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  engine_capacity: string;
  fuel_type: string;
  mileage: string;
  price: string;
  feature_image: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    total_page: number;
    current_page: number;
    pagesize: number;
    total_rows: number;
    next: string | null;
    previous: string | null;
    results: Car[];
  };
}

interface RelatedCarsCarouselProps {
  carId: number;
}

export default function RelatedCarsCarousel({
  carId,
}: RelatedCarsCarouselProps) {
  const sliderRef = useRef<Slider>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inventory/detail/${carId}/related/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch related cars");
        }

        const data: ApiResponse = await response.json();

        if (data.success && data.data.results) {
          setCars(data.data.results);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching related cars:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (carId) {
      fetchRelatedCars();
    }
  }, [carId]);

  const settings = {
    dots: true,
    infinite: cars.length > 1, // Only enable infinite when more than 1 car
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: cars.length > 1, // Only autoplay when more than 1 car
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: cars.length > 1,
          autoplay: cars.length > 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: cars.length > 1,
          autoplay: cars.length > 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: cars.length > 1,
          autoplay: cars.length > 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading related cars...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!cars.length) {
    return <div className="text-center py-10">No related cars available</div>;
  }

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {cars.map((car) => (
          <div key={car.id} className="px-3">
            <div className="group">
              <Link href={`/car-details/${car?.id}`}>
                <div className="aspect-[292/400] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={car?.feature_image || "/images/car-placeholder.jpg"}
                    alt={car.name}
                    width={292}
                    height={400}
                     // quality={70}
  placeholder="blur"
blurDataURL="/images/car-placeholder.jpg"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-sm text-white">{car?.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
