import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://akhadeli.com";
const siteTitle = "Abdullah Khadeli | Product Engineer";
const siteDescription =
    "Product engineer and full-stack developer building AI products, developer tooling, and reliable web platforms with Next.js, React, TypeScript, Python, and cloud infrastructure.";
const socialImage = "/images/abdullah-khadeli-social-card.jpeg";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: "%s | Abdullah Khadeli",
    },
    description: siteDescription,
    alternates: {
        canonical: "/",
    },
    keywords: [
        "Abdullah Khadeli",
        "Product Engineer",
        "AI Engineer",
        "Full-Stack Developer",
        "Next.js",
        "React",
        "TypeScript",
        "Python",
        "AI",
        "Developer Tooling",
        "Cloud Infrastructure",
        "TENN.ai",
        "Gradekick",
        "Starise",
        "University of Alberta",
        "Azure",
        "AWS",
        "Docker",
        "Kubernetes",
    ],
    authors: [{ name: "Abdullah Khadeli", url: "https://akhadeli.com" }],
    creator: "Abdullah Khadeli",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        title: siteTitle,
        description: siteDescription,
        siteName: "Abdullah Khadeli",
        images: [
            {
                url: socialImage,
                width: 1200,
                height: 630,
                alt: "Abdullah Khadeli - Product Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
        images: [
            {
                url: socialImage,
                alt: "Abdullah Khadeli - Product Engineer",
            },
        ],
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

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: "Abdullah Khadeli",
            url: siteUrl,
            image: `${siteUrl}/images/abdullah-khadeli-profile.jpeg`,
            jobTitle: "Product Engineer",
            email: "mailto:khadeli@threeark.com",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Edmonton",
                addressRegion: "AB",
                addressCountry: "CA",
            },
            alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Alberta",
            },
            worksFor: {
                "@type": "Organization",
                name: "Starise",
            },
            knowsAbout: [
                "Product Engineering",
                "AI Systems",
                "Full-Stack Development",
                "Next.js",
                "React",
                "TypeScript",
                "Python",
                "Cloud Infrastructure",
            ],
            sameAs: [
                "https://linkedin.com/in/akhadeli",
                "https://github.com/akhadeli",
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: "Abdullah Khadeli",
            description: siteDescription,
            publisher: {
                "@id": `${siteUrl}/#person`,
            },
            inLanguage: "en-US",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} dark`}
        >
            <body className="antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                    }}
                />
                {children}
            </body>
        </html>
    );
}
