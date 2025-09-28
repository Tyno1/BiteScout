import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Provider from "@/providers/Provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "BiteScout - Follow the Flavor",
    template: "%s | BiteScout",
  },
  description:
    "Discover, share, and explore food through immersive visuals. BiteScout reimagines food discovery with TikTok-style feeds of real food from real people.",
  keywords: ["food discovery", "restaurant", "food photos", "food videos", "dining", "cuisine"],
  authors: [{ name: "BiteScout Team" }],
  creator: "BiteScout",
  publisher: "BiteScout",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "BiteScout - Follow the Flavor",
    description: "Discover, share, and explore food through immersive visuals.",
    siteName: "BiteScout",
  },
  twitter: {
    card: "summary_large_image",
    title: "BiteScout - Follow the Flavor",
    description: "Discover, share, and explore food through immersive visuals.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading  */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://s3.amazonaws.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://s3.amazonaws.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Prevent theme flash */}
        <script src="/theme-script.js" defer />
      </head>
      <body suppressHydrationWarning={true}>
        <Provider>
          <ToastContainer />
          <main className="">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
