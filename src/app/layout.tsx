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
        {/* Google AdSense Auto ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2367606842074628"
          crossOrigin="anonymous"
        />
      </head>
      {/* Page background/foreground come from --background/--foreground in globals.css */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="bg-blue-300 dark:bg-gray-800 shadow-sm dark:border-b dark:border-white/10">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex place-content-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white transition-colors hover:text-blue-50 dark:text-gray-100 dark:hover:text-white"
            >
              MomoLink
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/links"
                className="font-bold text-white px-3 py-2 rounded-full transition-colors hover:bg-white/20 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white"
              >
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
