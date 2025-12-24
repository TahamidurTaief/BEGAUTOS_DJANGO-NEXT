// app/sell/page.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

interface FormDataType {
  name: string;
  phone: string;
  car_name: string;
  car_model: string;
  car_year: string;
  mileage: string;
  offered_price: string;
  images: File[]; // Changed from single image to array of images
}

export default function SellYourCar() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    phone: "",
    car_name: "",
    car_model: "",
    car_year: "",
    mileage: "",
    offered_price: "",
    images: [], // Initialize as empty array
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      setError("Please accept the Terms of Use");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("car_name", formData.car_name);
      data.append("car_model", formData.car_model);
      data.append("car_year", formData.car_year);
      data.append("mileage", formData.mileage);
      data.append("offered_price", formData.offered_price);

      // Append multiple images
      formData.images.forEach((image) => {
        data.append(`images`, image); // or use `images[${index}]` if your API expects indexed names
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/sell-car/`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess("Your car details have been submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        car_name: "",
        car_model: "",
        car_year: "",
        mileage: "",
        offered_price: "",
        images: [],
      });
      setIsChecked(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white ">
      <section className="relative h-[500px] md:h-screen bg-black">
        <div className="absolute inset-0 ">
          <Image
            src="/images/sell.png"
            alt="Luxury cars in showroom"
            fill
            className="object-cover md:object-contain object-center brightness-90"
          />
        </div>

        <div className="absolute left-[5%] top-20 md:top-40 p-4 md:p-10 z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Old Is Not needed?
          </h1>
          <h1 className="text-3xl md:text-6xl font-bold leading-tight">
            <span className="text-[#F9CA55]">BEG AUTOS</span> got you covered
          </h1>
        </div>
      </section>

      <div className="relative max-w-[1280px] mx-auto text-white flex flex-col md:flex-row ">
        {/* Left section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-start">
          <h1 className="md:text-5xl text-3xl font-bold mb-6">Got A Car</h1>
          <h2 className="md:text-5xl text-3xl font-bold mb-8">
            You Need To Sell?
          </h2>
          <p className="mb-6 text-justify">
            Selling off your vehicle has never been this effortless. From the
            moment you arrive, every step is handled with care—no stress, no
            pressure, just honest guidance and clarity. We take care of the
            paperwork and offer a fair value, ensuring everything feels
            effortless and secure. It’s a simple, safe way to pass your car into
            good hands, and walk away with confidence and peace of mind.
          </p>
        </div>

        {/* Right section */}
        <div className="w-full md:w-1/2  p-8  flex justify-center items-center">
          <div className="w-full max-w-md mx-auto bg-black rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Ready to sell your car?
            </h2>

            {success && (
              <div className="bg-green-800 text-white p-4 rounded-lg mb-6">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-800 text-white p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name:"
                  className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Your Phone Number:"
                  className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="text"
                  id="car_name"
                  placeholder="Car Name:"
                  className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                  required
                  value={formData.car_name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    id="car_model"
                    placeholder="Model"
                    className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                    required
                    value={formData.car_model}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="car_year"
                    placeholder="Reg. Year"
                    className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                    required
                    value={formData.car_year}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    id="mileage"
                    placeholder="Mileage"
                    className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                    required
                    value={formData.mileage}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  id="offered_price"
                  placeholder="Offered Price"
                  className="w-full p-3 bg-transparent border border-gray-700 rounded-lg text-white"
                  required
                  value={formData.offered_price}
                  onChange={handleChange}
                />
              </div>

              {/* Multiple Image Upload Section */}
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer">
                <input
                  type="file"
                  id="images"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer block w-full h-full"
                >
                  <span>Upload Car Images</span>
                </label>
              </div>

              {/* Display selected images */}
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Selected Images:</p>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800 p-2 rounded text-sm"
                      >
                        <span className="text-green-400 truncate flex-1">
                          {image.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="ml-2 text-red-400 hover:text-red-300 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    Total: {formData.images.length} image(s) selected
                  </p>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="terms">
                  I accept and agree to the{" "}
                  <a href="#" className="text-yellow-500 hover:underline">
                    Terms Of Use
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white border border-gray-700 rounded-lg font-medium hover:bg-gray-900 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Submit"}
              </button>

              <div className="mt-4">
                <button
                  onClick={() => {
                    window.open(
                      "https://wa.me/8801966900600",
                      "WhatsApp",
                      "width=700,height=800,top=100,left=200"
                    );
                  }}
                  className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition duration-300"
                >
                  Need More Details? Whatsapp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
