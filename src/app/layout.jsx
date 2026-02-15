import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

import NextAuthProvider from "@/provider/NextAuthProvider";
import LenisProvider from "@/provider/LenisProvider";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const metadata = {
  metadataBase: new URL("https://care-xyz.vercel.app"),

  title: {
    default: "Care-xyz | Care Giving Motivation",
    template: "%s | Care-xyz",
  },

  description:
    "Care-xyz is dedicated to providing motivation, resources, and support for caregivers and those seeking care solutions. Empowering care, compassion, and community.",

  applicationName: "Care-xyz",

  keywords: [
    "caregiving",
    "care motivation",
    "care resources",
    "care support",
    "elder care",
    "child care",
    "community care",
    "care solutions",
    "caregiver help",
    "compassionate care",
  ],

  authors: [{ name: "Care-xyz Team" }],
  creator: "Care-xyz",
  publisher: "Care-xyz",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "https://w7.pngwing.com/pngs/634/413/png-transparent-family-caregivers-disability-symbol-love-miscellaneous-heart-thumbnail.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.care-xyz.com",
    siteName: "Care-xyz",
    title: "Care-xyz | Care Giving Motivation & Support",
    description:
      "Discover resources, motivation, and a supportive community for caregivers and those seeking care solutions. Empowering care and compassion.",
    images: [
      {
        url: "https://i.ibb.co.com/WN7WK6w5/image.png",
        width: 1200,
        height: 630,
        alt: "Care-xyz Homepage Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Care-xyz | Care Giving Motivation & Support",
    description:
      "Motivation, resources, and support for caregivers and care seekers.",
    images: ["https://i.ibb.co.com/WN7WK6w5/image.png"],
  },

  category: "caregiving",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <LenisProvider>
            <header className="py-2 md:w-11/12 mx-auto">
              <Navbar />
            </header>
            <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </LenisProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
