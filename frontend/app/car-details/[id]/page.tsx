// app/cars/[id]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronUp, Phone } from "lucide-react";
import FormOverlay from "@/app/FormOverlay";
import RelatedCarsCarousel from "@/app/RelatedCarsCarousel";

interface CarImage {
  id: number;
  image: string;
  caption?: string;
}

interface Car {
  id: number;
  slightly_negotiable: 'YES' | 'NO';
  name: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  engine_capacity: string;
  transmission: string;
  fuel_type: string;
  drive_type: string;
  wheel_base: string;
  color: string;
  body_style: string;
  condition: string;
  price: number | string | null;
  description: string;
  youtube: string;
  registered: string;
  feature_image: string;
  inventory_images: CarImage[];
}


export interface ContactInfoRoot {
  success: boolean;
  message: string;
  data: ContactInfoData[];
}

export interface ContactInfoData {
  phone_number: string;
}


function formatBDT(amount: number) {
  const takaSymbol = "BDT";
  const numStr = amount.toString();
  const [integer] = numStr.split(".");

  // Format the integer part using Indian number system
  const lastThree = integer.slice(-3);
  const otherNumbers = integer.slice(0, -3);
  const formattedInteger = otherNumbers
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;

  return `${takaSymbol} ${formattedInteger}`;
}

function getEmbedUrl(url: string) {
  if (!url) return "";
  const videoId = url.includes("watch?v=")
    ? url.split("watch?v=")[1]
    : url.split("/").pop();
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function CarDetail() {
  const params = useParams();
  const id =
    typeof params.id === "string" ? parseInt(params.id, 10) : undefined;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [get_a_call, set_get_a_call]=useState(false)
  const [contactInfo, setContactInfro] = useState<ContactInfoData[]>();
  const [showVideo, setShowVideo] = useState(false);

  const openImagePopup = (index: number) => {
    setCurrentImageIndex(index);
    setShowImagePopup(true);
  };
  const closePopup = () => {
    console.log("closePopup called");
    setShowImagePopup(false);
  };
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    (async function(){
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/sales-representative/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }

      const result = await response.json();
      if (result?.success) {
        setContactInfro(result.data);
      } 
    })()
  },[])

  useEffect(() => {
    if (!id) return;

    const fetchCarDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inventory/detail/${id}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }

        const data = await response.json();

        if (data.success) {
          setCar(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch car details");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching car details:", err);
        } else {
          setError("An unknown error occurred");
          console.error("Unknown error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!car) {
    return null;
  }

  // Prepare images array
  const images = car.inventory_images;

  const formattedPrice =
    car?.price === "Sold"
      ? "Sold"
      : car?.price
      ? formatBDT(car?.price as number)
      : "Contact for price";

let slightly_negotiable = <></>;
if (car?.slightly_negotiable?.toString().trim().toUpperCase() === "YES") {
  slightly_negotiable = (
    <p className="text-gray-400 text-sm mb-6">
      *Price may be slightly negotiable
    </p>
  );
}

  return (
    <div className="bg-black text-white min-h-screen container-responsive  mx-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex text-sm text-gray-400 mb-6 mt-20">
          <Link href="/" className="hover:text-gray-300">
            Home &nbsp;
          </Link>{" "}
          {" / "}
          <Link href="/cars" className="hover:text-gray-300">
            &nbsp; Cars&nbsp;
          </Link>{" "}
          {" / "}
          <span className="text-white "> &nbsp;{car.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mb-12  rounded-[10px] overflow-hidden">
          <div className="relative overflow-hidden cursor-pointer aspect-[4/3]">
            {images[0] && (
              <Image
                src={images[0]?.image ?? "/images/car-placeholder.jpg"} // This will now be first inventory image
                alt={car.name}
                fill
                className="object-cover"
                // quality={70}
                placeholder="blur"
                blurDataURL="/images/car-placeholder.jpg"
                onClick={() => openImagePopup(0)}
                priority
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-1 cursor-pointer ">
            {images.slice(1, 5).map(
              (
                img,
                index // Show inventory images 1-4
              ) => (
                <div
                  key={img.id}
                  className="relative overflow-hidden cursor-pointer aspect-[4/3]"
                  onClick={() => openImagePopup(index + 1)} // Adjust index
                >
                  <Image
                    src={img?.image ?? "/images/car-placeholder.jpg"}
                    alt={img.caption ?? car.name}
                    fill
                    // quality={70}
                    placeholder="blur"
                    blurDataURL="/images/car-placeholder.jpg"
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-10 mt-4">
          <h1 className="text-4xl font-bold text-white">{car.name}</h1>
        </div>
        {/* Sidebar Only show in mobile */}
        <div className="lg:col-span-1 block md:hidden mb-6">
          <div className="sticky top-4 space-y-6">
            <div className="p-6 rounded-lg border border-[rgba(72,72,72,1)]">
              <h2 className="text-3xl font-bold text-white mb-2">
                {formattedPrice}
              </h2>
              {slightly_negotiable}
              <div className="mb-6">
                <h3 className="text-white mb-2 font-medium">
                  Need help making a choice?
                </h3>
                <p className="text-gray-400 text-sm">
                  Our expert sales team is here to assist you to choose your
                  vehicle according to your necessity, choice & preference.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <button
                    onClick={() => {
                      if (contactInfo && contactInfo?.length > 0) {
                        set_get_a_call(true);
                      }
                    }}
                    className={`w-full bg-[rgba(255,221,187,1)] text-black font-bold rounded-lg hover:bg-[rgba(139,100,61,1)] transition-opacity cursor-pointer ${
                      get_a_call
                        ? "opacity-0 pointer-events-none scale-90 py-0 px-0"
                        : "opacity-100 scale-100 py-3 px-4"
                    }`}
                    style={{ transition: "0.5s" }}
                  >
                    Call Us
                  </button>

                  <div
                    className={`bg-[rgba(255,221,237,0.12)] text-white rounded-xl w-full ${
                      get_a_call
                        ? "opacity-100 scale-100 max-h-[500px] p-4 pb-8 space-y-3 -mt-5"
                        : "opacity-0 scale-95 max-h-0 overflow-hidden"
                    }`}
                    style={{ transition: "0.5s" }}
                  >
                    <h2
                      onClick={() => {
                        set_get_a_call(false);
                      }}
                      className="text-sm font-medium text-gray-300 mb-4 flex justify-between items-center cursor-pointer
                        "
                    >
                      Senior Sales Representative
                      <ChevronUp className="text-gray-300 mr-2 w-5 h-5 inline-block" />
                    </h2>

                    {contactInfo?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-500 px-3 py-2 transition"
                      >
                        <span className="text-sm tracking-wide">
                          {item?.phone_number}
                        </span>
                        <a
                          href={`tel:${item?.phone_number}`}
                          className="text-gray-400 hover:text-white"
                        >
                          <Phone size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    window.open(
                      "https://wa.me/8801966900600",
                      "WhatsApp",
                      "width=700,height=800,top=100,left=200"
                    );
                  }}
                  className="bg-amber-100 hover:bg-amber-200 w-full transition-colors duration-300 text-gray-900 font-medium py-3 px-4 rounded-lg cursor-pointer"
                >
                  Text Us on Whatsapp
                </button>
                <FormOverlay />
              </div>
            </div>

            {/* Contact */}
            <button
              onClick={() => {
                window.open(
                  "https://calendly.com/begautos-sales/",
                  "calendlyPopup",
                  "width=700,height=800,top=100,left=200"
                );
              }}
              className="p-2 rounded-lg bg-[rgba(255,221,237,0.12)] hover:bg-gray-800 transition cursor-pointer w-full"
            >
              <div className="w-full text-center rounded-[5px] font-bold py-3 px-4">
                Book an Appointment
              </div>
            </button>
          </div>
        </div>
        {/* Car Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 ">
            {/* Specs grid moved up */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-8 bg-[rgba(255,255,255,0.05)] rounded-[21px] px-4 py-6">
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Brand</p>
                <p className="text-white font-medium">{car.brand}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Model</p>
                <p className="text-white font-medium">{car.model}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Reg. Year</p>
                <p className="text-white font-medium">{car.year}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Mileage</p>
                <p className="text-white font-medium">{car.mileage}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Engine (CC)</p>
                <p className="text-white font-medium">{car.engine_capacity}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Transmission</p>
                <p className="text-white font-medium">{car.transmission}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Fuel Type</p>
                <p className="text-white font-medium">{car.fuel_type}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Drive Type</p>
                <p className="text-white font-medium">{car.drive_type}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Wheel</p>
                <p className="text-white font-medium">{car.wheel_base}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Exterior</p>
                <p className="text-white font-medium">{car.color}</p>
              </div>
              <div className=" p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Body Style</p>
                <p className="text-white font-medium">{car.body_style}</p>
              </div>
            </div>
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Description
              </h2>
              <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: car.description }}
              />
            </div>

            {/* Highlights section */}
            <div>
              {images[20] && (
                <h2 className="text-2xl font-bold text-white mb-4">
                  Highlights
                </h2>
              )}

              <div className="space-y-4">
                {/* First Row - One large square */}
                {images[20] && (
                  <div className="aspect-[4/3]">
                    <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
                      <Image
                        src={images[20]?.image}
                        alt={images[20]?.caption || car?.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-sm text-white">
                          {images[20]?.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Second Row - 1/3 + 2/3, both squares */}
                {(images[21] || images[22]) && (
                  <div className="grid grid-cols-3 gap-4">
                    {images[21] && (
                      <div className="col-span-1 aspect-[1/2.05]">
                        <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
                          <Image
                            src={images[21]?.image}
                            alt={images[21]?.caption || car?.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-sm text-white">
                              {images[21]?.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {images[22] && (
                      <div
                        className={`${
                          images[22] ? "col-span-2" : "col-span-3"
                        } aspect-[1/1]`}
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
                          <Image
                            src={images[22]?.image}
                            alt={images[22]?.caption || car?.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-sm text-white">
                              {images[22]?.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Third Row - 2/3 + 1/3, both squares */}
                {(images[23] || images[24]) && (
                  <div className="grid grid-cols-3 gap-4">
                    {images[23] && (
                      <div
                        className={`${
                          images[23] ? "col-span-2" : "col-span-3"
                        } aspect-[1/1]`}
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
                          <Image
                            src={images[23]?.image}
                            alt={images[23]?.caption || car?.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-sm text-white">
                              {images[23]?.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {images[24] && (
                      <div className="col-span-1 aspect-[1/2.05]">
                        <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
                          <Image
                            src={images[24]?.image}
                            alt={images[24]?.caption || car?.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-sm text-white">
                              {images[24]?.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Show message if no images available */}
                {images?.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">
                      No images available for this vehicle.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Video section */}
            {car?.youtube && (
              <div className="my-8">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  {showVideo ? (
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(car?.youtube)}
                      title="Car Video"
                      frameBorder="1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <button
                        onClick={() => setShowVideo(true)}
                        className="rounded-full bg-red bg-opacity-10 p-4 hover:bg-opacity-20 transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 23a8 8 0 100-21 8 8 0 000 21zM9.555 7.223A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar for desktop */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="sticky top-4 space-y-6">
              <div className="p-6 rounded-lg border border-[rgba(72,72,72,1)]">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {formattedPrice}
                </h2>
                {slightly_negotiable}

                <div className="mb-6">
                  <h3 className="text-white mb-2 font-medium">
                    Need help making a choice?
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Our expert sales team is here to assist you to choose your
                    vehicle according to your necessity, choice & preference.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <button
                      onClick={() => {
                        if (contactInfo && contactInfo?.length > 0) {
                          set_get_a_call(true);
                        }
                      }}
                      className={`w-full bg-[rgba(255,221,187,1)] text-black font-bold rounded-lg hover:bg-[rgba(139,100,61,1)] transition-opacity cursor-pointer ${
                        get_a_call
                          ? "opacity-0 pointer-events-none scale-90 py-0 px-0"
                          : "opacity-100 scale-100 py-3 px-4"
                      }`}
                      style={{ transition: "0.5s" }}
                    >
                     Call Us
                    </button>

                    <div
                      className={`bg-[rgba(255,221,237,0.12)] text-white rounded-xl w-full ${
                        get_a_call
                          ? "opacity-100 scale-100 max-h-[500px] p-4 pb-8 space-y-3 -mt-5"
                          : "opacity-0 scale-95 max-h-0 overflow-hidden"
                      }`}
                      style={{ transition: "0.5s" }}
                    >
                      <h2
                        onClick={() => {
                          set_get_a_call(false);
                        }}
                        className="text-sm font-medium text-gray-300 mb-4 flex justify-between items-center cursor-pointer
                        "
                      >
                        Senior Sales Representative
                        <ChevronUp className="text-gray-300 mr-2 w-5 h-5 inline-block" />
                      </h2>

                      {contactInfo?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b border-gray-500 px-3 py-2 transition"
                        >
                          <span className="text-sm tracking-wide">
                            {item?.phone_number}
                          </span>
                          <a
                            href={`tel:${item?.phone_number}`}
                            className="text-gray-400 hover:text-white"
                          >
                            <Phone size={16} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      window.open(
                        "https://wa.me/8801966900600",
                        "WhatsApp",
                        "width=700,height=800,top=100,left=200"
                      );
                    }}
                    className="bg-amber-100 hover:bg-amber-200 w-full transition-colors duration-300 text-gray-900 font-medium py-3 px-4 rounded-lg cursor-pointer"
                  >
                    Text Us on WhatsApp
                  </button>
                  <FormOverlay />
                </div>
              </div>

              {/* Contact */}
              <button
                onClick={() => {
                  window.open(
                    "https://calendly.com/begautos-sales/",
                    "calendlyPopup",
                    "width=700,height=800,top=100,left=200"
                  );
                }}
                className="p-2 rounded-lg bg-[rgba(255,221,237,0.12)] hover:bg-gray-800 transition cursor-pointer w-full"
              >
                <div className="w-full text-center rounded-[5px] font-bold py-3 px-4">
                  Book an Appointment
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        <div className="mt-21">
          <h2 className="text-3xl font-bold text-white mb-6">
            Suggested for you
          </h2>
          {typeof id === "number" && !isNaN(id) && (
            <RelatedCarsCarousel carId={id} />
          )}
        </div>
        {showImagePopup && (
          <div
            className="fixed w-full inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fadeIn"
            style={{
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            <div
              className="relative lg:max-w-7xl max-w-4xl w-full h-full p-4 animate-slideUp"
              style={{
                animation: "slideUp 0.4s ease-out 0.1s both",
              }}
            >
              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-30 right-4 text-white text-2xl hover:text-gray-400 transition-all duration-200 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transform hover:scale-110 hover:rotate-90 opacity-0 animate-fadeIn"
                style={{
                  animation: "fadeIn 0.3s ease-in-out 0.3s both",
                }}
              >
                &times;
              </button>

              {/* Main image container */}
              <div className="relative h-full flex items-center justify-center">
                {/* Previous button */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-400 transition-all duration-200 z-10 sm:bg-black bg-opacity-50 rounded-full md:w-12 md:h-12 flex items-center justify-center hover:scale-110 hover:bg-opacity-70 opacity-0 animate-slideInLeft"
                  style={{
                    animation: "slideInLeft 0.4s ease-out 0.2s both",
                  }}
                >
                  &lt;
                </button>

                {/* Image */}
                <div
                  className="relative w-full  h-full opacity-0 animate-zoomIn"
                  style={{
                    animation: "zoomIn 0.5s ease-out 0.2s both",
                  }}
                >
                  <Image
                    src={images[currentImageIndex].image}
                    alt={images[currentImageIndex].caption || car.name}
                    fill
                    className="object-contain sm:w-full w-[350px] transition-opacity duration-300 ease-in-out"
                    key={currentImageIndex}
                  />
                </div>

                {/* Next button */}
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-400 transition-all duration-200 z-10 sm:bg-black bg-opacity-50 rounded-full md:w-12 md:h-12 flex items-center justify-center hover:scale-110 hover:bg-opacity-70 opacity-0 animate-slideInRight"
                  style={{
                    animation: "slideInRight 0.4s ease-out 0.2s both",
                  }}
                >
                  &gt;
                </button>
              </div>

              {/* Image counter */}
              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded opacity-0 animate-slideUp"
                style={{
                  animation: "slideUp 0.4s ease-out 0.4s both",
                }}
              >
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
