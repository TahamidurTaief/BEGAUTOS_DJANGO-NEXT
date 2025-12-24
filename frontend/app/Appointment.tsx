export default function Appointment() {
  return (
    <section>
      <div className="max-w-7xl mx-auto bg-[url('/images/bg.png')]  bg-center bg-no-repeat">
        {/* Dark space background would be set by your own image */}
        <div className="relative py-6 mb-6">
          <div className="max-w-7xl mx-auto ">
            <div className="flex flex-col items-start px-2 md:px-12 lg:px-20 py-2 md:py-12 lg-py-20">
              {/* Main headline */}
              <div className="text-[30px] md:text-[40px]  font-bold text-white ">
                Connect to Consult
              </div>
              <p className="text-[14px] max-w-5xl leading-relaxed text-justify text-white mb-4">
                Our expert sales team is here to assist you to choose your
                vehicle according to your necessity, choice & preference.
              </p>
              {/* Call to action button */}
              {/* <Link href="/appointment">
                <div className="bg-amber-100 hover:bg-amber-200 transition-colors duration-300 text-gray-900 font-medium py-3 px-4 rounded-lg">
                  Book A Appointment
                </div>
              </Link> */}
              <button
                onClick={() => {
                  window.open(
                    "https://calendly.com/begautos-sales/",
                    "calendlyPopup",
                    "width=700,height=800,top=100,left=200"
                  );
                }}
                className="bg-amber-100 hover:bg-amber-200 transition-colors duration-300 text-gray-900 font-medium py-3 px-4 rounded-lg cursor-pointer"
              >
                Book An Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
