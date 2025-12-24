// app/cars/[[...slug]]/CarsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PriceRangeFilter from "./PriceRangeFilter";
import { BodyStyleType, BrandType, ModelType } from "./page";
import SearchBar from "@/components/ui/searchbar";

/* -----------------------
   Types
   ----------------------- */
interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  engine_capacity: string;
  fuel_type: string;
  mileage: string;
  price: string | number;
  feature_image: string | null;
  body_style?: number;
  car_type?: string;
  registered: string;
  availability?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    total_page: number;
    current_page: number;
    pagesize: number;
    total_rows: number;
    next: string | null;
    previous: string | null;
    results: Car[];
  };
}

interface Config {
  title: string;
  heading: string;
  linkurl: string;
  description: string;
  bannerImage: string;
  baseApiParams: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
}

interface CarsClientProps {
  config: Config;
  filterdata: {
    brands: Array<BrandType> | undefined;
    models: Array<ModelType> | undefined;
    bodyStyles: Array<BodyStyleType> | undefined;
  };
}

/* -----------------------
   Utility helpers
   ----------------------- */
function formatBDT(amount: number) {
  if (!Number.isFinite(amount)) return "BDT —";
  const takaSymbol = "BDT";
  const numStr = Math.round(amount).toString();
  const lastThree = numStr.slice(-3);
  const otherNumbers = numStr.slice(0, -3);
  const formattedInteger = otherNumbers
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;
  return `${takaSymbol} ${formattedInteger}`;
}


/* -----------------------
   Component start
   ----------------------- */
export default function CarsClient({ config, filterdata }: CarsClientProps) {
  const { brands = [], models = [], bodyStyles = [] } = filterdata || {};

  // constants
  const availabilities = useMemo(() => ["Available", "Sold", "Booked"], []);

  // pagination constants
  const carsPerPage = 12;

  /* -----------------------
     Component State
     - combine related data into grouped states where sensible
     ----------------------- */
  const [carsData, setCarsData] = useState<{ cars: Car[]; totalPages: number }>(
    {
      cars: [],
      totalPages: 1,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // filter/search/pagination states
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // applied search
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEngineCapacity, setSelectedEngineCapacity] =
    useState<string>("");
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] =
    useState<string>("Available");

  const [currentPage, setCurrentPage] = useState<number>(1);

  // refs
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  /* -----------------------
     Debounce search input (600ms)
     - sets debouncedSearch which triggers main fetch effect
     ----------------------- */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 600);
    return () => clearTimeout(t);
  }, [search]);

  /* -----------------------
     Handlers (memoized)
     ----------------------- */
  const resetFilters = useCallback(() => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngineCapacity("");
    setSelectedBodyStyle("");
    setSelectedPriceRange("");
    setSelectedAvailability("");
    setSearch("");
    setDebouncedSearch("");
    setCurrentPage(1);
  }, []);

  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    setShowMobileFilters(false);
    // debouncedSearch already used, so no extra action needed
  }, []);

  /* -----------------------
     buildApiUrl memoized
     - memoize based on deps so we don't rebuild unnecessarily
     ----------------------- */
  const buildApiUrl = useCallback(
    (page = 1) => {
      const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inventory/`;
      const params = new URLSearchParams();

      // pagination
      params.append("limit", String(carsPerPage));
      params.append("offset", String((page - 1) * carsPerPage));

      // base params for car type
      Object.entries(config.baseApiParams || {}).forEach(([k, v]) => {
        if (v != null && v !== "") params.append(k, v);
      });

      if (debouncedSearch) params.append("q", debouncedSearch);
      if (selectedBrand) params.append("brand", selectedBrand);
      if (selectedModel) params.append("model", selectedModel);
      if (selectedYear) params.append("year", selectedYear);
      if (selectedEngineCapacity)
        params.append("engine_capacity", selectedEngineCapacity);
      if (selectedBodyStyle) params.append("body_style", selectedBodyStyle);

      // price range logic
      if (selectedPriceRange) {
        if (selectedPriceRange === "under-1000000") {
          params.append("price_max", "1000000");
        } else if (selectedPriceRange === "3000000-plus") {
          params.append("price_min", "3000000");
        } else if (selectedPriceRange.includes("-")) {
          const [min, max] = selectedPriceRange.split("-");
          if (min && min !== "0") params.append("price_min", min);
          if (max && max !== "5000000") params.append("price_max", max);
        } else if (selectedPriceRange === "1000000-2000000") {
          params.append("price_min", "1000000");
          params.append("price_max", "2000000");
        } else if (selectedPriceRange === "2000000-3000000") {
          params.append("price_min", "2000000");
          params.append("price_max", "3000000");
        }
      }

      if (selectedAvailability)
        params.append("registered", selectedAvailability);

      return `${baseUrl}?${params.toString()}`;
    },
    [
      carsPerPage,
      config.baseApiParams,
      debouncedSearch,
      selectedBrand,
      selectedModel,
      selectedYear,
      selectedEngineCapacity,
      selectedBodyStyle,
      selectedPriceRange,
      selectedAvailability,
    ]
  );

  /* -----------------------
     Single effect to fetch data when any filter/pagination changes.
     - cancels stale requests using AbortController
     - groups state updates to reduce re-renders
     ----------------------- */
  useEffect(() => {
    // Build URL for current page
    const apiUrl = buildApiUrl(currentPage);

    // Cancel previous
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(apiUrl, { signal: controller.signal });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `${res.status} ${res.statusText}`);
        }
        const data: ApiResponse = await res.json();

        if (!mountedRef.current) return; // component unmounted

        if (data?.success && data.data) {
          setCarsData({
            cars: data.data.results || [],
            totalPages: Math.max(1, data.data.total_page || 1),
          });
        } else {
          setCarsData({ cars: [], totalPages: 1 });
          setError(data?.message || "Failed to fetch cars data");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching cars:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error fetching cars:", err);
          setError("An error occurred while fetching cars");
        }
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();

    // cleanup on deps change
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    buildApiUrl,
    currentPage,
    // buildApiUrl already includes all other deps (debouncedSearch, filters)
  ]);

  /* -----------------------
     Pagination helper
     ----------------------- */
  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    // scroll to top of list on page change
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  /* -----------------------
     Memoized option lists to avoid re-creating arrays/JSX repeatedly
     ----------------------- */
  const brandOptions = useMemo(
    () => brands.map((b) => ({ key: b.id, label: b.name, value: b.name })),
    [brands]
  );
  const modelOptions = useMemo(
    () => models.map((m) => ({ key: m.id, label: m.model, value: m.model })),
    [models]
  );
  const bodyStyleOptions = useMemo(
    () =>
      bodyStyles.map((s) => ({
        key: s.id,
        label: s.body,
        value: String(s.id),
      })),
    [bodyStyles]
  );

  /* -----------------------
     Render
     ----------------------- */
  const { cars, totalPages } = carsData;
  return (
    <div className="flex flex-col md:flex-row gap-8 relative min-h-screen">
      {/* Left column (filters) */}
      <div className="w-full md:w-[21.2%]">
        <>
          {/* Mobile top controls */}
          <div className="md:hidden grid grid-cols-1 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDebouncedSearch(search.trim());
              }}
            >
              <SearchBar query={search} setQuery={setSearch} />
            </form>
            <div className="flex justify-center mb-4 mt-5">
              <button
                className="w-full bg-black border border-gray-700 text-white py-2 rounded hover:bg-gray-800 transition flex items-center justify-center gap-2"
                onClick={() => setShowMobileFilters((s) => !s)}
                aria-expanded={showMobileFilters}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {showMobileFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>

          <div className={`${showMobileFilters ? "block" : "hidden md:block"}`}>
            <div className="md:sticky md:top-24 md:mb-15 relative z-50 bg-black sm:p-4 rounded-lg">
              {/* Desktop search */}
              <form
                className="max-md:hidden sm:mb-7"
                onSubmit={(e) => e.preventDefault()}
              >
                <SearchBar query={search} setQuery={setSearch} />
              </form>

              <h2 className="text-xl font-bold mb-4">Filter</h2>

              <div className="relative z-50">
                <PriceRangeFilter
                  selectedPriceRange={selectedPriceRange}
                  onPriceRangeChange={setSelectedPriceRange}
                />
              </div>

              {/* Brand */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="brand">
                  Brand
                </label>
                {brandOptions?.length > 0 ? <div className="relative">
                  <select
                    id="brand"
                    className="w-full p-2 bg-black border border-gray-700 rounded appearance-none"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {brandOptions.map((b) => (
                      <option key={b.key} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div> : <p className="text-gray-500 text-sm">Loading...</p>}
              </div>

              {/* Model */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="modelGeneration"
                >
                  Model Generation
                </label>
                {modelOptions?.length > 0 ? <div className="relative">
                  <select
                    id="modelGeneration"
                    className="w-full p-2 bg-black border border-gray-700 rounded appearance-none"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="">All Model</option>
                    {modelOptions.map((m) => (
                      <option key={m.key} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div> : <p className="text-gray-500 text-sm">Loading...</p>}
              </div>

              {/* Body Style */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="body_style"
                >
                  Body Style
                </label>
                {bodyStyleOptions?.length > 0 ? <div className="relative">
                  <select
                    id="body_style"
                    className="w-full p-2 bg-black border border-gray-700 rounded appearance-none"
                    value={selectedBodyStyle}
                    onChange={(e) => setSelectedBodyStyle(e.target.value)}
                  >
                    <option value="">All Body style</option>
                    {bodyStyleOptions.map((s) => (
                      <option key={s.key} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div> : <p className="text-gray-500 text-sm">Loading...</p>}
              </div>

              {/* Availability */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="availability"
                >
                  Availability
                </label>
                <div className="relative">
                  <select
                    id="availability"
                    className="w-full p-2 bg-black border border-gray-700 rounded appearance-none"
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                  >
                    <option value="">All Available</option>
                    {availabilities.map((av) => (
                      <option key={av} value={av}>
                        {av}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="md:hidden flex gap-2">
                <button
                  className="flex-1 bg-gray-700 border border-gray-600 text-white py-2 rounded hover:bg-gray-600 transition"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>

              <button
                className="w-full bg-black border border-gray-700 text-white py-2 rounded hover:bg-gray-800 transition mt-4"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </>
      </div>

      {/* Right column (listings) */}
      <div className="w-full md:w-4/5">
        {/* Banner */}
        <div className="container mx-auto mb-8">
          <Link href={config.linkurl}>
            <div
              className="relative bg-cover bg-no-repeat bg-center h-20 md:h-28 lg:h-35 w-full cursor-pointer rounded-[5px]"
              style={{ backgroundImage: `url('${config.bannerImage}')` }}
            >
              <div className="absolute inset-0 bg-black/10 flex items-end p-3 md:p-5">
                <div className="flex items-center justify-between w-full text-white">
                  <div className="group">
                    <h2
                      className="text-xl md:text-3xl font-semibold mb-2 transition-all duration-300 group-hover:translate-x-1"
                      dangerouslySetInnerHTML={{ __html: config.heading }}
                    />
                  </div>
                  <svg
                    className="w-8 h-8 text-gray-600 rounded-[4px] bg-white p-1 ml-4 group-hover:translate-x-1 transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Loading / Error / Empty */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Loading cars...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p className="text-xl">{error}</p>
            <button
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => {
                setCurrentPage(1); /* triggers effect */
              }}
            >
              Try Again
            </button>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No cars found matching your filters.
            </p>
            <button
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  href={`/car-details/${car.id}`}
                  className="block bg-[#0D0D0D] text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <div className="relative z-10">
                    {car.feature_image ? (
                      <Image
                        src={car.feature_image}
                        alt={car.name || "Car image"}
                        width={292}
                        height={243}
                        placeholder="blur"
                        blurDataURL="/images/car-placeholder.jpg"
                        className="w-full h-[243px] object-cover"
                        // not setting priority to avoid multiple LCP hits; let Next decide
                      />
                    ) : (
                      <div className="w-full h-[243px] bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-semibold leading-tight">
                      {car.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{car.model}</p>

                    <div className="flex justify-between text-xs text-gray-400 border-b border-gray-700 pb-2 mt-2">
                      <span className="capitalize">
                        {car.fuel_type?.toLowerCase()}
                      </span>
                      <span className="capitalize">
                        {car.car_type?.toLowerCase()?.replace(/_/g, " ")}
                      </span>
                      <span>{car.mileage}</span>
                    </div>

                    <p className="font-bold text-base mt-3">
                      {String(car.price) === "Sold"
                        ? "Sold"
                        : Number(car.price) === 0
                        ? "Contact for price"
                        : formatBDT(Number(car.price))}
                    </p>

                    <div className="w-full mt-3 bg-white text-black text-center py-2 rounded-md hover:bg-gray-200 transition text-sm font-medium">
                      Show Details
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 mb-8 flex justify-between items-center">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 text-gray-100 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    if (pageNum < 1 || pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded ${
                          currentPage === pageNum
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-1 text-gray-400">...</span>
                      <button
                        onClick={() => paginate(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-white"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <span>Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
