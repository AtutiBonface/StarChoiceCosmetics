import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "StarChoice Cosmetics | Your Beauty Destination",
    template: "%s | StarChoice Cosmetics"
  },
  description: "Discover authentic beauty and skincare products at StarChoice Cosmetics. Shop top brands, skincare essentials, and makeup collections with nationwide delivery in Kenya.",
  keywords: [
    "cosmetics",
    "beauty products",
    "skincare",
    "makeup",
    "Kenya beauty store",
    "authentic cosmetics",
    "beauty brands",
    "online cosmetics shop",
    "StarChoice"
  ],
  authors: [{ name: "StarChoice Cosmetics" }],
  creator: "StarChoice Cosmetics",
  publisher: "StarChoice Cosmetics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icons/starchoice-logo.svg",
    shortcut: "/icons/starchoice-logo.svg",
    apple: "/icons/starchoice-logo.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};