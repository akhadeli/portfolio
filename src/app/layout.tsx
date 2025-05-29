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
  title: "Abdullah Khadeli | Fullstack Developer",
  description:
    "Founder and Full-Stack Developer with expertise in Next.js, React, TypeScript, Python, and enterprise AI platforms. Leading teams to build scalable solutions.",
  keywords: [
    "Abdullah Khadeli",
    "AI Engineer",
    "UI Engineer",
    "Team Lead",
    "Fullstack Developer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "AI",
    "TENN.ai",
    "Gradekick",
    "University of Alberta",
    "Azure",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "DevOps",
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Jira",
    "Confluence",
    "Slack",
    "Zoom",
  ],
  authors: [{ name: "Abdullah Khadeli", url: "https://akhadeli.com" }],
  creator: "Abdullah Khadeli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akhadeli.com",
    title: "Abdullah Khadeli | Full-Stack Developer",
    description:
      "Founder and Full-Stack Developer with expertise in Next.js, React, TypeScript, Python, and enterprise AI platforms. Leading teams to build scalable solutions.",
    siteName: "Abdullah Khadeli Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Khadeli | Full-Stack Developer",
    description:
      "Founder and Full-Stack Developer with expertise in Next.js, React, TypeScript, Python, and enterprise AI platforms. Leading teams to build scalable solutions.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
