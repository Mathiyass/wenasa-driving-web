import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-en",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wenasadrivingschool.com"),
  title: {
    default: "Wenasa Driving School | වෙනස රියැදුරු පාසල - Kirindiwela",
    template: "%s | Wenasa Driving School",
  },
  description:
    "Government-approved premier driving school in Kirindiwela, Sri Lanka (Reg. DMT/WP/G/1174). Certified instructors, modern dual-control training fleet, and guaranteed DMT test guidance for cars, motorcycles & heavy vehicles.",
  keywords: [
    "Wenasa Driving School",
    "Driving School Kirindiwela",
    "වෙනස රියැදුරු පාසල",
    "Driving Lessons Gampaha",
    "DMT Sri Lanka Driving Licence",
    "Dual control car lessons Sri Lanka",
    "Car Driving classes Kirindiwela",
    "Motorcycle license Sri Lanka",
    "Heavy vehicle driving license",
    "Urapola driving school",
    "Wathurugama driving lessons",
  ],
  authors: [{ name: "Wenasa Driving School", url: "https://wenasadrivingschool.com" }],
  creator: "Wenasa Driving School",
  publisher: "Wenasa Driving School",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_LK",
    alternateLocale: ["si_LK", "ta_LK"],
    url: "https://wenasadrivingschool.com",
    siteName: "Wenasa Driving School - වෙනස රියැදුරු පාසල",
    title: "Wenasa Driving School | වෙනස රියැදුරු පාසල - Kirindiwela",
    description:
      "Government-approved premier driving school in Kirindiwela, Sri Lanka (Reg. DMT/WP/G/1174). Dual-control Suzuki fleet, certified instructors, and 94% first-time practical trial pass rate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenasa Driving School | වෙනස රියැදුරු පාසල - Kirindiwela",
    description:
      "Government-approved premier driving school in Kirindiwela, Sri Lanka (Reg. DMT/WP/G/1174). Professional driver training with guaranteed DMT pass support.",
  },
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#0d0c0a] text-[#f5f5f3] antialiased font-sans selection:bg-[#fcc438] selection:text-[#0d0c0a]">
        {children}
      </body>
    </html>
  );
}
