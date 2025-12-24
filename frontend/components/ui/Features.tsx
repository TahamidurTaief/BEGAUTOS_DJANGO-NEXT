export default function Features() {
  const features = [
    {
      icon: "handshake",
      title: "Exclusive Brands",
      description:
        "A curated selection of exclusive brands from all over the globe.",
    },
    {
      icon: "checkmark",
      title: "Quality Assurance",
      description:
        "A strict quality inspection to meet the highest standards of performance & reliability.",
    },
    {
      icon: "trading",
      title: "Seamless Experience",
      description:
        "A smooth, hassle-free experience from browsing to post-purchase.",
    },
    {
      icon: "transparent",
      title: "Customer Relations",
      description:
        "Building lasting relationships with customers through responsive support and personalized service.",
    },
  ];

  return (
    <section className="py-4 mb-3 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" bg-black border border-gray-800 rounded-lg p-8 flex flex-col items-center text-center hover:border-gray-700 transition-colors"
            >
              {/* Icon */}
              <div className="mb-6">
                {feature.icon === "handshake" && (
                  <svg
                    className="w-10 h-10 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 10l2.5 2 3.5-6 4.5 6 3.5-2 1 10H3l1-10zM12 3l1.09 2.26L15.5 6l-2 1.94L14 11l-2-1.5L10 11l.5-3.06L9 6l2.41-.74L12 3z" />
                  </svg>
                )}

                {feature.icon === "checkmark" && (
                  <svg
                    className="w-10 h-10 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2l7 4v6c0 5.25-3.33 10-7 10s-7-4.75-7-10V6l7-4zm3.3 7.7l-4 4a1 1 0 01-1.4 0l-2-2a1 1 0 111.4-1.4l1.3 1.3 3.3-3.3a1 1 0 011.4 1.4z" />
                  </svg>
                )}

                {feature.icon === "trading" && (
                  <svg
                    className="w-10 h-10 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 .34-.03.67-.08 1H20c.05-.33.08-.66.08-1 0-4.42-3.58-8-8-8zm-6 6c0-.34.03-.67.08-1H4c-.05.33-.08.66-.08 1 0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z" />
                  </svg>
                )}

                {feature.icon === "transparent" && (
                  <svg
                    className="w-10 h-10 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2h-5l-4 4-4-4H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm2 5h12v2H6V9zm0-3h12v2H6V6z" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>

              {/* Divider */}
              <div className="w-16 h-px bg-gray-700 my-3"></div>

              {/* Description */}
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
