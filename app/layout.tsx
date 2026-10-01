import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Wenasa Driving School - වෙනස රියැදුරු පාසල',
  description: 'Government-approved driving school in Kirindiwela, Sri Lanka. Learn driving with confidence with certified instructors, dual-control vehicles, and DMT test prep.',
  openGraph: {
    title: 'Wenasa Driving School - වෙනස රියැදුරු පාසල',
    description: 'Government-approved driving school in Kirindiwela, Sri Lanka. Learn driving with confidence with certified instructors, dual-control vehicles, and DMT test prep.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wenasa Driving School - වෙනස රියැදුරු පාසල',
    description: 'Government-approved driving school in Kirindiwela, Sri Lanka. Learn driving with confidence with certified instructors, dual-control vehicles, and DMT test prep.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="si" className="scroll-smooth">
      <body suppressHydrationWarning className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
