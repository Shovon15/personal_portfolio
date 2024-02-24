"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/themeProvider/themeProvider";
import { ReduxProviders } from "./provider";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import BounceLoader from "react-spinners/BounceLoader";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: ["school management", "school"],
//   authors: [
//     {
//       name: "shovon mahamud",
//       url: "",
//     },
//   ],
//   creator: "shadcn",
//   // themeColor: [
//   //   { media: "(prefers-color-scheme: light)", color: "white" },
//   //   { media: "(prefers-color-scheme: dark)", color: "black" },
//   // ],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.name,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [siteConfig.ogImage],
//     creator: "@shadcn",
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: `${siteConfig.url}/site.webmanifest`,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ReduxProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Custom>
              {children}
            </Custom>
          </ThemeProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}


type CustomPros = {
  children: React.ReactNode
}

const Custom = ({ children }: CustomPros) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoading } = useLoadUserQuery();

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  // console.log(isLoading);

  return (
    <>
      {
        loading ?
          <div className="flex justify-center items-center min-h-screen">
            <BounceLoader
              color="blue"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          :
          <>{children}</>

      }
    </>
  )

}
