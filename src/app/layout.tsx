import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/theme-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah Khadeli | AI/UI Engineer Team Lead & Fullstack Developer",
  description:
    "AI/UI Engineer Team Lead and Founding Engineer with expertise in Next.js, React, TypeScript, Python, and enterprise AI platforms. Leading teams to build scalable solutions with 4x performance improvements.",
  keywords: [
    "Abdullah Khadeli",
    "AI Engineer",
    "UI Engineer",
    "Team Lead",
    "Fullstack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "TENN.ai",
    "Gradekick",
    "University of Alberta",
  ],
  authors: [{ name: "Abdullah Khadeli", url: "https://akhadeli.com" }],
  creator: "Abdullah Khadeli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akhadeli.com",
    title: "Abdullah Khadeli | AI/UI Engineer Team Lead",
    description:
      "AI/UI Engineer Team Lead and Founding Engineer with expertise in building scalable AI-powered applications and leading high-performance engineering teams.",
    siteName: "Abdullah Khadeli Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Khadeli | AI/UI Engineer Team Lead",
    description:
      "AI/UI Engineer Team Lead and Founding Engineer with expertise in building scalable AI-powered applications.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <ModeToggle className="fixed top-4 right-4" />
        </ThemeProvider>
      </body>
    </html>
  );
}
