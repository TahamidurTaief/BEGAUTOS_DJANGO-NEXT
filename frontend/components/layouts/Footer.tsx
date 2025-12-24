"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/home/subscribers/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Successfully subscribed!");
        setEmail("");
      } else {
        setSubmitMessage(
          data.message || "Subscription failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className=" text-white pt-12 pb-4 ">
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Footer Main Content */}
        <div className="flex flex-col gap-10 md:flex-row md:flex-wrap lg:flex-nowrap mb-12">
          {/* Quick Links */}
          <div className="basis-[20%] min-w-[0px] ">
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="mr-2">-</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="mr-2">-</span> Inventory
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="mr-2">-</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="mr-2">-</span> Sell Your Car
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="mr-2">-</span> Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="basis-[25%] min-w-[180px]">
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span>+880 1966-900600</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span>contact@begautos.com</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span>
                  KA-61/6A Pragati Sarani
                  <br /> Baridhara, Dhaka-1212
                  <br />
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Keep In Touch */}
          <div className="basis-[29%] min-w-[200px] ">
            <h3 className="text-2xl font-bold mb-6">Keep In Touch</h3>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Your Mail"
                  className="bg-transparent border border-gray-600 text-white outline-none flex-grow
             w-full px-2 py-2 text-sm
             sm:px-3 sm:py-2 sm:text-base
             md:px-4 md:py-2.5 md:text-[16px]
             placeholder:text-gray-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex flex-col justify-center items-center gap-[10px] shrink-0 
             w-[48px] h-[46px] px-[10px] py-[12px] text-sm
             sm:w-[52px] sm:h-[50px] sm:px-[12px] sm:py-[13px] sm:text-base
             md:w-[56px] md:h-[52px] md:px-[13px] md:py-[14px]
             rounded-[5px] border border-white/50 bg-[#040404]
             shadow-[0_-3px_6px_rgba(0,0,0,0.25)] text-white 
             transition hover:bg-[#1a1a1a]"
                >
                  {isSubmitting ? "Subscribing..." : "Go"}
                </button>
              </div>
            </form>
            {submitMessage && (
              <p
                className={`mt-2 text-sm ${
                  submitMessage.includes("Successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {submitMessage}
              </p>
            )}
            <p className="mb-6 text-justify">
              For inquiries or to receive our showroom stock list, please submit
              your email.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/begautos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-3 text-white hover:bg-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="25"
                  viewBox="0 0 12 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11801)">
                    <path
                      d="M2.88644 24.2271C2.88644 20.4045 2.88644 16.577 2.88644 12.7445C2.88644 12.4482 2.83458 12.3371 2.51603 12.3519C1.8456 12.3815 1.17517 12.3519 0.504736 12.3519C0.297309 12.3778 0.21582 12.326 0.21582 12.1111C0.21582 10.9209 0.21582 9.7319 0.21582 8.54414C0.21582 8.29597 0.312125 8.25152 0.52696 8.25522C1.18628 8.25522 1.8456 8.25522 2.50492 8.25522C2.74939 8.25522 2.82347 8.18485 2.81976 7.93668C2.81976 6.89213 2.81976 5.84389 2.81976 4.79565C2.80865 2.52136 4.11988 1.03604 6.38305 0.717494C7.48417 0.623057 8.58988 0.593374 9.69447 0.628597C10.1427 0.628597 10.5871 0.628597 11.0353 0.628597C11.2502 0.628597 11.3205 0.684158 11.3168 0.9064C11.3168 2.08182 11.3168 3.25847 11.3168 4.43635C11.3168 4.6586 11.2391 4.71416 11.0316 4.71045C10.4205 4.71045 9.80929 4.71045 9.17961 4.71045C8.88527 4.69386 8.59109 4.74585 8.32027 4.86232C8.14963 4.93279 8.00294 5.05101 7.89782 5.20278C7.7927 5.35455 7.7336 5.53343 7.72762 5.71795C7.7054 6.4921 7.72762 7.26995 7.70169 8.04409C7.70169 8.30338 7.87949 8.24411 8.02024 8.24411C8.99811 8.24411 9.97227 8.24411 10.9501 8.24411C11.2502 8.24411 11.3205 8.31819 11.2909 8.61452C11.1946 9.75166 11.1205 10.8888 11.0576 12.0259C11.0576 12.2741 10.9427 12.3112 10.7353 12.3074C9.87597 12.3074 9.01663 12.3074 8.14247 12.3074C7.84615 12.3074 7.77207 12.3852 7.77207 12.6779C7.77207 16.3819 7.77207 20.1119 7.77207 23.8307C7.77207 24.1567 7.71651 24.2715 7.35722 24.2641C5.85338 24.2382 4.34583 24.2456 2.84199 24.2382L2.88644 24.2271Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11801">
                      <rect
                        width="11.101"
                        height="23.6207"
                        fill="white"
                        transform="translate(0.21582 0.628418)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://instagram.com/begautos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-3 text-white hover:bg-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11805)">
                    <path
                      d="M12.3639 0.628418C14.1678 0.628418 15.9718 0.628418 17.7757 0.628418C19.2431 0.637566 20.661 1.15957 21.784 2.10404C22.914 3.01983 23.7 4.2917 24.0137 5.7119C24.1139 6.14011 24.1659 6.57818 24.1688 7.01795C24.1688 10.6258 24.1688 14.2241 24.1688 17.8127C24.1726 19.2357 23.6916 20.6176 22.8051 21.7308C21.8612 22.9624 20.5045 23.8118 18.9843 24.1228C18.5452 24.2136 18.0979 24.2595 17.6494 24.2599H7.07839C5.6156 24.2584 4.19568 23.7658 3.04626 22.861C1.89683 21.9562 1.08446 20.6918 0.739371 19.2703C0.614152 18.7663 0.551146 18.249 0.551762 17.7297C0.551762 14.2012 0.551762 10.6739 0.551762 7.14783C0.551756 5.66354 1.05796 4.22363 1.98679 3.06588C2.91562 1.90813 4.21152 1.10176 5.6605 0.779949C6.10074 0.679084 6.55097 0.628252 7.00262 0.628418H12.3639ZM12.3639 2.7282C10.6213 2.7282 8.88232 2.7282 7.13972 2.7282C6.87868 2.72991 6.61815 2.75163 6.36042 2.79314C5.28565 2.9596 4.31374 3.52676 3.64009 4.3806C2.97787 5.19455 2.62738 6.21785 2.65154 7.26689C2.65154 10.7377 2.65154 14.2108 2.65154 17.6864C2.65049 17.9595 2.67221 18.2323 2.71648 18.5018C2.90093 19.5252 3.4392 20.4512 4.23719 21.1179C5.03518 21.7847 6.04212 22.1497 7.082 22.1493H17.653C17.8705 22.1488 18.0876 22.1319 18.3025 22.0988C19.3355 21.9438 20.2802 21.4279 20.969 20.6426C21.6579 19.8574 22.0463 18.8535 22.0655 17.8091C22.0655 14.2301 22.0655 10.6475 22.0655 7.06485C22.0644 6.78467 22.0342 6.50536 21.9753 6.23143C21.7608 5.23218 21.2077 4.3377 20.4095 3.69933C19.6114 3.06097 18.6173 2.71791 17.5953 2.7282C15.8527 2.74623 14.1065 2.7318 12.3639 2.7318V2.7282Z"
                      fill="white"
                    />
                    <path
                      d="M12.3608 18.5234C11.1547 18.5227 9.97606 18.1639 8.97419 17.4925C7.97231 16.8211 7.19234 15.8673 6.73314 14.7521C6.27394 13.637 6.15619 12.4105 6.39482 11.2283C6.63345 10.0462 7.21771 8.96143 8.07354 8.11168C8.92937 7.26193 10.0182 6.68542 11.2021 6.45523C12.386 6.22503 13.6115 6.35152 14.7234 6.81866C15.8353 7.2858 16.7834 8.07256 17.4477 9.07919C18.1119 10.0858 18.4623 11.267 18.4544 12.473C18.443 14.0817 17.796 15.6205 16.6544 16.7539C15.5129 17.8874 13.9694 18.5235 12.3608 18.5234ZM12.3608 16.42C13.1426 16.4171 13.9061 16.1833 14.5556 15.748C15.205 15.3127 15.7114 14.6953 16.0112 13.9732C16.311 13.2511 16.3908 12.4566 16.2407 11.6893C16.0906 10.922 15.7171 10.2162 15.1673 9.66036C14.6174 9.10454 13.9157 8.7235 13.1501 8.56508C12.3845 8.40666 11.5891 8.47791 10.8638 8.76988C10.1386 9.06185 9.51569 9.56154 9.07338 10.2062C8.63108 10.8509 8.38905 11.6119 8.37767 12.3937C8.37242 12.9208 8.47179 13.4438 8.67001 13.9323C8.86824 14.4208 9.16139 14.8652 9.53249 15.2396C9.9036 15.6141 10.3453 15.9112 10.832 16.1139C11.3187 16.3165 11.8408 16.4205 12.368 16.42H12.3608Z"
                      fill="white"
                    />
                    <path
                      d="M20.2394 6.18795C20.2245 6.49315 20.1192 6.78703 19.9369 7.03221C19.7545 7.2774 19.5033 7.46282 19.2153 7.56489C18.9273 7.66696 18.6155 7.68108 18.3194 7.60544C18.0233 7.52981 17.7565 7.36784 17.5527 7.14014C17.3489 6.91243 17.2175 6.62927 17.1751 6.32666C17.1327 6.02405 17.1812 5.71567 17.3145 5.44072C17.4478 5.16576 17.6599 4.93667 17.9237 4.78255C18.1876 4.62844 18.4913 4.55628 18.7963 4.57523C18.9973 4.58536 19.1943 4.63523 19.3759 4.72196C19.5575 4.8087 19.7201 4.93057 19.8543 5.08054C19.9885 5.23051 20.0916 5.4056 20.1577 5.59569C20.2238 5.78577 20.2516 5.98707 20.2394 6.18795Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11805">
                      <rect
                        width="23.6207"
                        height="23.6207"
                        fill="white"
                        transform="translate(0.551758 0.628418)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://youtube.com/@begautos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-4 text-white hover:bg-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="17"
                  viewBox="0 0 25 17"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11811)">
                    <path
                      d="M12.5874 16.9119C10.0511 16.8017 7.51338 16.7005 4.97714 16.5751C4.50022 16.5438 4.02704 16.47 3.56325 16.3545C2.23396 16.0524 1.31402 15.2382 1.17958 13.8636C0.971127 11.7428 0.859345 9.60988 0.79288 7.47998C0.774341 6.29895 0.846557 5.11825 1.00889 3.94828C1.30798 1.58727 2.31553 0.605405 4.68258 0.443775C9.92856 0.0812417 15.1933 0.0812417 20.4393 0.443775C22.897 0.615979 23.9695 1.67035 24.1673 4.1371C24.4241 7.32137 24.613 10.5147 24.0163 13.6884C23.7142 15.35 22.9423 16.2171 21.2384 16.4074C19.0178 16.6551 16.7777 16.7095 14.5435 16.8304C13.8925 16.8651 13.2369 16.8304 12.5798 16.8304L12.5874 16.9119ZM16.2278 8.49961L10.2611 5.02532V11.9739L16.2278 8.49961Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11811">
                      <rect
                        width="23.6207"
                        height="16.7401"
                        fill="white"
                        transform="translate(0.792969 0.171875)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://twitter.com/begautos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-3 text-white hover:bg-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11815)">
                    <path
                      d="M9.93386 15.0806L9.34468 15.7552L7.14164 18.3168L5.00692 20.8102C4.348 21.5787 3.68766 22.3472 3.0259 23.1157C2.73558 23.453 2.44312 23.7902 2.15707 24.1318C2.12825 24.1709 2.09009 24.2021 2.04608 24.2226C2.00208 24.2431 1.95363 24.2523 1.90517 24.2492C1.32453 24.2364 0.743884 24.2321 0.16324 24.2236C0.137623 24.2236 0.114141 24.2236 0.0586382 24.2236C0.218742 24.0357 0.363903 23.8607 0.513334 23.6899L2.83378 20.9703L5.15849 18.2805L7.48533 15.5716C7.96992 15.0059 8.45236 14.438 8.94335 13.8787C8.96031 13.8633 8.97387 13.8445 8.98314 13.8236C8.99242 13.8026 8.99721 13.78 8.99721 13.7571C8.99721 13.7341 8.99242 13.7115 8.98314 13.6905C8.97387 13.6696 8.96031 13.6508 8.94335 13.6354C8.11081 12.4243 7.27969 11.2146 6.44999 10.0064L0.0949284 0.726718L0.0351562 0.639195C0.0821201 0.628521 0.114141 0.628521 0.146162 0.628521C2.36058 0.628521 4.575 0.628521 6.78941 0.628521C6.82721 0.627302 6.86456 0.6369 6.89708 0.656186C6.92961 0.675473 6.95594 0.703646 6.973 0.737392L12.7666 9.16741C12.788 9.19943 12.8115 9.22931 12.8435 9.27414C12.8889 9.24045 12.9318 9.20334 12.9716 9.16314L14.8053 7.03909L16.6369 4.90437L18.9659 2.20821C19.3928 1.70229 19.8347 1.19422 20.2702 0.690428C20.301 0.655733 20.3436 0.63368 20.3897 0.628521C20.9704 0.628521 21.551 0.628521 22.1317 0.628521C22.1872 0.628521 22.2405 0.64133 22.3195 0.649869C19.4611 3.98217 16.6241 7.28885 13.7635 10.6212L23.0752 24.1958L23.0603 24.2407H22.2064C20.2624 24.2407 18.3169 24.2407 16.37 24.2407C16.3302 24.2438 16.2902 24.2356 16.2547 24.2171C16.2192 24.1987 16.1897 24.1706 16.1694 24.1361C14.1869 21.2528 12.2031 18.3681 10.2178 15.4819C10.1303 15.3581 10.0385 15.2279 9.93386 15.0806ZM20.3129 22.7656L20.2125 22.614C19.2163 21.1909 18.2201 19.7677 17.2239 18.3446C13.4839 12.9822 9.74671 7.62329 6.01238 2.26799C5.99388 2.23462 5.96606 2.20735 5.93232 2.18954C5.89858 2.17172 5.86038 2.16412 5.82239 2.16766H2.94051H2.80389C2.84445 2.22956 2.87434 2.27653 2.90636 2.32136L9.38523 11.5989C11.9384 15.2521 14.4908 18.906 17.0425 22.5606C17.0818 22.6291 17.1394 22.6852 17.2087 22.7229C17.278 22.7606 17.3565 22.7783 17.4353 22.7741C18.3639 22.7741 19.2903 22.7741 20.2104 22.7741L20.3129 22.7656Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11815">
                      <rect
                        width="23.04"
                        height="23.6207"
                        fill="white"
                        transform="translate(0.0351562 0.628418)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
          {/* Map Section */}
          <div className="basis-[25%] min-w-[150px]">
            <div className="relative w-full h-64 rounded overflow-hidden">
              <iframe
                className="w-full h-full absolute top-0 left-0"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=beg%20autos&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Logo and Copyright */}
        <div className="flex flex-col items-center border-t border-gray-800 pt-8">
          <div className="mb-4">
            <Image
              src="/images/logo.png"
              alt="BEG AUTOS"
              width={150}
              height={15}
              className="object-contain"
            />
          </div>
          <p className="text-gray-500 text-sm text-center">
            Copyright ©{new Date().getFullYear()} All rights reserved |
            @begautos
          </p>
        </div>
      </div>
    </footer>
  );
}
