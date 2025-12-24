// app/layout.tsx
import { GoogleTagManager } from "@/components/gtm";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import type { Metadata } from "next";
import "./globals.css";

// Add these imports at the top of the file

import { Poppins } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TransitionWrapper from "./TransitionWrapper";

// Initialize the font object
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Beg Autos ",
  description: "Finest Luxury Car Studio in Bangladesh",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins ">
        {/* GTM Script */}
        <GoogleTagManager />
        {/* GTM <noscript> fallback for non-JS users */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TMW4X8NP"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              </noscript>
            `,
          }}
        />
        <Header />
        <TransitionWrapper>
          <main>{children}</main>
        </TransitionWrapper>
        <Footer />
      </body>
    </html>
  );
}
