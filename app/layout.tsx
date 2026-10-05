import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-en",
});

export const metadata: Metadata = {
  title: "Wenasa Driving School | වෙනස රියැදුරු පාසල - Kirindiwela",
  description: "Government-approved driving school in Kirindiwela, Sri Lanka (DMT/WP/G/1174). Certified instructors, dual-control Suzuki fleet, and guaranteed DMT test guidance.",
  openGraph: {
    title: "Wenasa Driving School | වෙනස රියැදුරු පාසල - Kirindiwela",
    description: "Government-approved driving school in Kirindiwela, Sri Lanka (DMT/WP/G/1174). Certified instructors, dual-control Suzuki fleet, and guaranteed DMT test guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenasa Driving School | වෙනස රියැදුරු පාසල - Kirindiwela",
    description: "Government-approved driving school in Kirindiwela, Sri Lanka (DMT/WP/G/1174). Certified instructors, dual-control Suzuki fleet, and guaranteed DMT test guidance.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="si" className={`dark scroll-smooth ${plusJakarta.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#0d0c0a] text-[#f5f5f3] antialiased font-sans selection:bg-[#fcc438] selection:text-[#0d0c0a]">
        {children}
      </body>
    </html>
  );
}
