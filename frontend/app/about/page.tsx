// app/about/page.tsx
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="text-white overflow-x-hidden">
      <section className="relative h-screen max-h-[400px] md:max-h-[600px] md:mb-12">
        <div className="absolute inset-0 ">
          <Image
            src="/images/about/hero.png"
            alt="Luxury cars in showroom"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="brightness-90"
          />
        </div>
        <div className="absolute left-0 top-25 p-10 md:p-25 z-10 ">
          <p className="text-xl font-light mb-1">Brought to you by</p>
          <h1 className="text-5xl md:text-[64px]  font-bold">BEG AUTOS</h1>
        </div>
      </section>
      {/* Second section - Our Story with car headlight */}
      <section className="relative grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 md:p-25 flex items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              How BEG AUTOS started... well this might inspire a lot of people.
              Being passionate and fascinated about cars has been passed down
              ationally in the BEG family and since our fathers were already
              involved in the automotive industry since 2007, our passion got a
              significant implementation as we all grew up with cars. And from
              our fascination & devotion towards cars, we decided to make our
              passion our profession. Thus, BEG AUTOS was born & we BEG brothers
              are the second generation continuing the business.
            </p>
          </div>
        </div>
        <div className="hidden md:block relative w-[90%] ml-auto h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-tl-3xl rounded-bl-3xl overflow-hidden">
          <Image
            src="/images/about/car-headlight.png"
            alt="Luxury car headlight"
            fill
            className="object-cover  absolute"
          />
        </div>
      </section>
      {/* Third section - Our Story with black car in garage */}
      <section className=" relative grid grid-cols-1 md:grid-cols-2  md:mt-[-50px]">
        <div className="relative w-full md:w-[90%] h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] rounded-tr-3xl rounded-br-3xl overflow-hidden">
          <Image
            src="/images/about/car-dark.png"
            alt="Black car in garage"
            fill
            className="object-cover absolute "
          />
        </div>

        <div className="p-10 md:p-25 flex items-center">
          <div>
            {/* <h2 className="text-4xl font-bold mb-6">Our Story</h2> */}
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              From 2007 to 2013/14, the business was operated traditionally but
              we were far from our dreams, the distance seemed long & the pace
              was slow. BEG needed to be revolutionized. Later on, in 2015/16
              the whole business strategy was overhauled, a wide range of
              products were introduced & BEG leveled up their marketing game as
              well as their online presence.
            </p>
          </div>
        </div>
      </section>
      {/* Fourth section - Our Story with speedometer */}
      <section className="relative  md:mt-[-50px] mb-12">
        <div className="relative  md:w-[45%] w-full ml-auto h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] rounded-tl-3xl rounded-bl-3xl overflow-hidden ">
          <Image
            src="/images/about/car-speedometer.png"
            alt="Luxury car headlight"
            fill
            className="object-cover  absolute "
          />
        </div>
      </section>
    </div>
  );
}
