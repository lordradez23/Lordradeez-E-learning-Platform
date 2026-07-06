import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Alike_Angular } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import { getUserFromToken } from "@/lib/JWT";
import StoreProvider from "./StoreProvider";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const alike = Alike_Angular({
  variable: "--font-alike",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const defaultUrl =  process.env.FRONTEND_URL!

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  manifest: "/manifest.json",
  title: {
    default: "Lordradeez Academy | Online Learning Made Easy",
    template: "%s | Lordradeez Academy",
  },
  description: "Discover high-quality online courses across various categories. Learn at your own pace from industry-leading instructors.",
  keywords: ["online courses", "e-learning", "best instructors", "learn online", "programming courses", "design courses", "Lordradeez Academy"],
  openGraph: {
    title: "Lordradeez Academy | Online Learning Made Easy",
    description: "Join thousands of learners and access top-rated online courses from expert instructors.",
    url: "https://lordradeez-academy.vercel.app",
    siteName: "Lordradeez Academy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lordradeez Academy | Learn Anything, Anytime",
    description: "Access high-quality courses with expert instructors and flexible learning.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon512_rounded.png", sizes: "196x196", type: "image/png" }],
    apple: [{ url: "/icon512_rounded.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/icons/apple-splash-2048-2732.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2732-2048.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1668-2388.jpg",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2388-1668.jpg",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1536-2048.jpg",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2048-1536.jpg",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1488-2266.jpg",
        media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2266-1488.jpg",
        media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1640-2360.jpg",
        media: "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2360-1640.jpg",
        media: "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1668-2224.jpg",
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2224-1668.jpg",
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1620-2160.jpg",
        media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2160-1620.jpg",
        media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1290-2796.jpg",
        media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2796-1290.jpg",
        media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1179-2556.jpg",
        media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2556-1179.jpg",
        media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1284-2778.jpg",
        media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2778-1284.jpg",
        media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1170-2532.jpg",
        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2532-1170.jpg",
        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1125-2436.jpg",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2436-1125.jpg",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1242-2688.jpg",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2688-1242.jpg",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-828-1792.jpg",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1792-828.jpg",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-1242-2208.jpg",
        media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-2208-1242.jpg",
        media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-750-1334.jpg",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1334-750.jpg",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/icons/apple-splash-640-1136.jpg",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1136-640.jpg",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
    ],
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

export const viewport: Viewport = {
  themeColor: "#000000",
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromToken();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${alike.variable} ${manrope.variable}  antialiased`}>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Header user={user} />
            <main>{children}</main>
            <Footer />
            <ToastContainer position="bottom-left" autoClose={1000} />
            <ScrollToTop />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
