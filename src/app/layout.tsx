import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { GoogleTagManager } from '@next/third-parties/google'
import { ThemeToggle } from "@/components/ThemeToggle";

// Applied before paint so the saved theme doesn't flash light mode first
const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
   "https://links.vividcats.org"
  ),
  title: "Links",
  description: "A curated collection of useful links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <GoogleTagManager gtmId="GTM-NXMKBMJN" />
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950 min-h-screen`}
      >
        <header className="bg-blue-300 dark:bg-gray-800 shadow-sm">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex place-content-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              MomoLink
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/links" className="font-bold text-white">
              Links
            </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
