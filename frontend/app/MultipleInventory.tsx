import Image from "next/image";
import Link from "next/link";

export default function MultipleInventory() {
  return (
    <div>
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto mb-5">
          {/* Title and See All link */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[32px] sm:text-2xl md:text-3xl font-medium text-white">
              Choose per your preference
            </h2>
          </div>
          {/* <p className="text-[14px] max-w-5xl leading-relaxed text-justify text-white">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using.
          </p> */}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* First Image */}
            <div className="relative w-full md:w-1/2 aspect-[16/9] rounded-lg overflow-hidden group">
              <Link href="/cars/brand-new">
                <Image
                  src="/images/car-image-left.jpg"
                  alt="Reconditioned Unit"
                  fill
                  className="object-cover border-2 rounded-3xl"
                />

                {/* Overlay content */}
                <div className="absolute inset-0 bg-black/10 flex items-end p-6">
                  <div className="flex items-center justify-between w-full text-white">
                    <div className="group">
                      <h2 className="text-xl md:text-3xl font-semibold mb-2 transition-all duration-300  group-hover:translate-x-1">
                        Reconditioned Unit
                      </h2>
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
              </Link>
            </div>

            <div className="relative w-full md:w-1/2 aspect-[16/9] rounded-lg overflow-hidden group">
              <Link href="cars/pre-owned">
                <Image
                  src="/images/car-image-right.jpg"
                  alt="Luxury Car"
                  fill
                  className="object-cover border-2 rounded-3xl"
                />

                {/* Overlay content */}
                <div className="absolute inset-0 bg-black/10 flex items-end p-6">
                  <div className="flex items-center justify-between w-full text-white">
                    <div className="group">
                      <h2 className="text-xl md:text-3xl font-semibold mb-2 transition-all duration-300 group-hover:translate-x-1">
                        Pre-owned Unit
                      </h2>
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
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
