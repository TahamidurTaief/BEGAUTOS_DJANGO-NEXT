import { useEffect, useRef, useState } from "react";

interface PriceRangeFilterProps {
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
}

export default function PriceRangeFilter({
  selectedPriceRange,
  onPriceRangeChange,
}: PriceRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000); // 50 lakh max
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const MIN_RANGE = 0;
  const MAX_RANGE = 50000000;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize temp values when opening
  useEffect(() => {
    if (isOpen) {
      setTempMinPrice(minPrice);
      setTempMaxPrice(maxPrice);
    }
  }, [isOpen, minPrice, maxPrice]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `BDT ${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `BDT ${(price / 100000).toFixed(0)}L`;
    } else if (price >= 1000) {
      return `BDT ${(price / 1000).toFixed(0)}K`;
    }
    return `BDT ${price}`;
  };

  const getDisplayText = () => {
    if (selectedPriceRange) {
      // Convert the selected range back to display format
      if (selectedPriceRange === "under-1000000") {
        return "Under BDT 10,00,000";
      } else if (selectedPriceRange === "1000000-2000000") {
        return "BDT 10,00,000 - 20,00,000";
      } else if (selectedPriceRange === "2000000-3000000") {
        return "BDT 20,00,000 - 30,00,000";
      } else if (selectedPriceRange === "3000000-plus") {
        return "Above BDT 30,00,000";
      }
    }

    if (minPrice === MIN_RANGE && maxPrice === MAX_RANGE) {
      return "All Price Range";
    }
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, tempMaxPrice - 100000); // Ensure minimum gap
    setTempMinPrice(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, tempMinPrice + 100000); // Ensure minimum gap
    setTempMaxPrice(newMax);
  };

  const handleApply = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);

    // Convert to the format expected by the parent component
    if (tempMinPrice === MIN_RANGE && tempMaxPrice === MAX_RANGE) {
      onPriceRangeChange("");
    } else {
      // You can customize this logic based on your needs
      const rangeString = `${tempMinPrice}-${tempMaxPrice}`;
      onPriceRangeChange(rangeString);
    }

    setIsOpen(false);
  };

  const handleClear = () => {
    setTempMinPrice(MIN_RANGE);
    setTempMaxPrice(MAX_RANGE);
    setMinPrice(MIN_RANGE);
    setMaxPrice(MAX_RANGE);
    onPriceRangeChange("");
    setIsOpen(false);
  };

  const calculatePosition = (value: number) => {
    return ((value - MIN_RANGE) / (MAX_RANGE - MIN_RANGE)) * 100;
  };

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-2">Price Range</label>

      {/* Trigger Button */}
      <div className="relative">
        <button
          type="button"
          className="w-full p-2 bg-black border border-gray-700 rounded text-left flex justify-between items-center hover:border-gray-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-white text-sm">{getDisplayText()}</span>
          <svg
            className={`fill-current h-4 w-4 text-white transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-80 bg-black rounded-lg shadow-xl border border-gray-200 z-[99999] p-6">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Price Range
                </h3>
                <p className="text-sm text-gray-500">
                  {formatPrice(tempMinPrice)} - {formatPrice(tempMaxPrice)}
                </p>
              </div>

              {/* Price Input Fields */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded mb-1 inline-block">
                    {formatPrice(tempMinPrice)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white text-black text-xs px-2 py-1 rounded mb-1 inline-block float-right">
                    {formatPrice(tempMaxPrice)}
                  </div>
                </div>
              </div>

              {/* Dual Range Slider */}
              <div className="relative h-6 flex items-center">
                {/* Track */}
                <div className="w-full h-2 bg-gray-200 rounded-full relative">
                  {/* Active Range */}
                  <div
                    className="absolute h-2 bg-gradient-to-r from-gray-500 to-white rounded-full"
                    style={{
                      left: `${calculatePosition(tempMinPrice)}%`,
                      width: `${
                        calculatePosition(tempMaxPrice) -
                        calculatePosition(tempMinPrice)
                      }%`,
                    }}
                  />

                  {/* Min Handle */}
                  <div
                    className="absolute w-5 h-5 bg-white border-4 border-gray-500 rounded-full cursor-pointer transform -translate-y-1.5 -translate-x-2.5 shadow-md hover:scale-110 transition"
                    style={{ left: `${calculatePosition(tempMinPrice)}%` }}
                  />

                  {/* Max Handle */}
                  <div
                    className="absolute w-5 h-5 bg-gray-400 border-4 border-white rounded-full cursor-pointer transform -translate-y-1.5 -translate-x-2.5 shadow-md hover:scale-110 transition"
                    style={{ left: `${calculatePosition(tempMaxPrice)}%` }}
                  />
                </div>

                {/* Hidden Range Inputs */}
                <input
                  type="range"
                  min={MIN_RANGE}
                  max={MAX_RANGE}
                  step={50000}
                  value={tempMinPrice}
                  onChange={(e) => handleMinChange(parseInt(e.target.value))}
                  className="absolute w-full opacity-0 cursor-pointer"
                />
                <input
                  type="range"
                  min={MIN_RANGE}
                  max={MAX_RANGE}
                  step={50000}
                  value={tempMaxPrice}
                  onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                  className="absolute w-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-gray-500 border border-gray-500 rounded hover:bg-gray-50 transition text-sm font-medium"
                >
                  CLEAR
                </button>
                <button
                  onClick={handleApply}
                  className="px-6 py-2 bg-white text-black rounded hover:bg-gray-400 transition text-sm font-medium"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
