"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Features from "@/components/ui/Features";
import CarsClient from "./CarsClient";

// Car type configurations
const CAR_TYPE_CONFIGS = {
  all: {
    title: "Choose per your preference",
    heading: "Looking for <br /> Reconditioned Unit?",
    linkurl: "/cars/brand-new",
    description:
      "Glance through the widest collection of reconditioned Japanese models & pre-owned European units and choose according to your budget & quality preferences.",
    bannerImage: "/images/banner.png",
    baseApiParams: {},
    seoTitle: "All Cars - Our Complete Inventory",
    seoDescription: "Browse our complete collection of available cars",
  },
  "brand-new": {
    title: "Choose per your preference",
    heading: "Looking for <br /> Pre-owned Unit?",
    linkurl: "/cars/pre-owned",
    description:
      "Glance through the widest collection of reconditioned Japanese models & pre-owned European units and choose according to your budget & quality preferences.",
    bannerImage: "/images/banner.png",
    baseApiParams: { car_type: "BRAND_NEW, RECONDITIONED" },
    seoTitle: "Brand New Cars - Latest Models",
    seoDescription:
      "Discover our collection of brand new vehicles with full warranty",
  },
  "pre-owned": {
    title: "Choose per your preference",
    heading: "Looking for <br /> Reconditioned Unit?",
    linkurl: "/cars/brand-new",
    description:
      "Glance through the widest collection of reconditioned Japanese models & pre-owned European units and choose according to your budget & quality preferences.",
    bannerImage: "/images/banner.png",
    baseApiParams: { car_type: "PRE_OWNED" },
    seoTitle: "Pre-Owned Cars - Quality Used Vehicles",
    seoDescription: "Browse our collection of quality pre-owned vehicles",
  },
};

// Types
export interface BrandType {
  id: number;
  name: string;
  image: string;
}

export interface ModelType {
  id: number;
  brand: string;
  model: string;
}

export interface BodyStyleType {
  id: number;
  body: string;
}

export interface FilterData {
  brands: BrandType[];
  models: ModelType[];
  bodyStyles: BodyStyleType[];
}

// Fetch filters from API
async function fetchFilters(): Promise<FilterData> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const [bodyStyleRes, brandsRes, generationsRes] = await Promise.all([
      fetch(`${base}/api/v1/inventory/body-style/`),
      fetch(`${base}/api/v1/inventory/brands/`),
      fetch(`${base}/api/v1/inventory/generations/`),
    ]);

    const [bodyStyles, brands, generations] = await Promise.all([
      bodyStyleRes.json(),
      brandsRes.json(),
      generationsRes.json(),
    ]);

    return {
      brands: brands?.data || [],
      models: generations?.data || [],
      bodyStyles: bodyStyles?.data || [],
    };
  } catch (error) {
    console.error("Filter fetch error →", error);
    return { brands: [], models: [], bodyStyles: [] };
  }
}

// Client-side Page
export default function ProductListing() {
  const params = useParams();
  const slug: string[] = params.slug
    ? Array.isArray(params.slug)
      ? params.slug
      : [params.slug]
    : [];
  const carType = slug[0] || "all";

  const [filterData, setFilterData] = useState<FilterData>({
    brands: [],
    models: [],
    bodyStyles: [],
  });

  useEffect(() => {
    fetchFilters().then(setFilterData);
  }, []);

  const config =
    CAR_TYPE_CONFIGS[carType as keyof typeof CAR_TYPE_CONFIGS] ||
    CAR_TYPE_CONFIGS.all;

  return (
    <div className="bg-black text-white min-h-screen container-responsive">
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-4xl font-bold pt-20 mb-5">{config.title}</h1>
        <p className="text-gray-200 sm:w-40 md:w-3xl lg:w-4xl mb-10 text-justify">
          {config.description}
        </p>

        <CarsClient config={config} filterdata={filterData} />
      </div>

      <Features />
    </div>
  );
}
