import { ChevronLeft, ChevronRight, Loader, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const StockPopupOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // For smooth transition
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-slide timer
  useEffect(() => {
    if (!isOpen || cars.length <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / 30; // 3 seconds = 30 steps of 100ms
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, cars.length, currentIndex]);

  // Reset progress when manually changing slides
  const resetProgress = () => {
    setProgress(0);
  };

  // Fetch cars data from API
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inventory/stocks/`
      );
      const data = await response.json();
      if (data.success && data.data) {
        setCars(data.data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
    setLoading(false);
  };

  // Open popup with smooth transition
  const openPopup = () => {
    setIsOpen(true);
    setCurrentIndex(0);
    setProgress(0);
    fetchCars();

    // Add smooth transition
    setTimeout(() => {
      setIsVisible(true);
    }, 10); // Small delay to ensure DOM is ready
  };

  // Close popup with smooth transition
  const closePopup = () => {
    setIsVisible(false);

    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setIsOpen(false);
      setCurrentIndex(0);
      setProgress(0);
    }, 300); // Match transition duration
  };

  // Navigate carousel
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
    resetProgress();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
    resetProgress();
  };

  // Jump to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetProgress();
  };

  const currentCar = cars[currentIndex];

  return (
    <div>
      {/* Stock Button */}
      <button
        onClick={openPopup}
        className="flex items-center justify-center bg-white/10 transition hover:bg-white/20 rounded cursor-pointer border-blue-300 border-1"
      >
        <div className="relative w-6 h-6  m-auto  overflow-hidden">
          <Image
            src="/images/shining.png"
            alt="Car"
            fill
            className="object-cover"
          />
        </div>
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-all duration-300 ease-in-out ${
            isVisible ? "bg-opacity-75 backdrop-blur-sm" : "bg-opacity-0"
          }`}
          onClick={closePopup}
        >
          <div
            className={`relative w-full  h-full md:h-[95%] max-w-md mx-auto transform transition-all duration-300 ease-in-out ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="flex justify-center items-center h-full bg-white rounded-lg">
                <div className="text-gray-600 text-lg">
                  <Loader />
                </div>
              </div>
            ) : cars.length > 0 ? (
              <div className="relative w-full h-full bg-black overflow-hidden rounded-lg shadow-2xl ">
                {/* Close Button - Fixed position like Facebook Stories */}
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Multiple Progress Bars */}
                <div className="absolute top-4 left-4 right-16 z-20 flex gap-1">
                  {cars.map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                      <div
                        className={`h-full transition-all duration-100 ease-linear rounded-full ${
                          index === currentIndex
                            ? "bg-white"
                            : index < currentIndex
                            ? "bg-white"
                            : "bg-white/30"
                        }`}
                        style={{
                          width:
                            index === currentIndex
                              ? `${progress}%`
                              : index < currentIndex
                              ? "100%"
                              : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                {cars.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Car Image - Full Screen like Facebook Stories */}
                <div className="relative w-full h-full">
                  <img
                    key={currentCar.id}
                    src={currentCar.image}
                    alt={currentCar.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/300/400";
                    }}
                  />

                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full bg-white rounded-lg">
                <div className="text-gray-600 text-lg">No cars available</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPopupOverlay;
