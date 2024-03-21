import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/themeProvider/themeProvider";
import { Custom } from "@/utils/customLoader";
import { AuthProvider } from "@/context/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["shovon", "shovon mahamud", "developer", "web", "web developer", "react developer", "software developer", "frontend developer"],
  authors: [
    {
      name: "shovon mahamud",
      url: "",
    },
  ],
  creator: "shovon",
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  //   images: [
  //     {
  //       url: siteConfig.ogImage,
  //       width: 1200,
  //       height: 630,
  //       alt: siteConfig.name,
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [siteConfig.ogImage],
  //   creator: "@shadcn",
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        {/* <ReduxProviders> */}
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Custom>
              {children}
            </Custom>
          </ThemeProvider>
        </AuthProvider>
        {/* </ReduxProviders> */}
      </body>
    </html>
  );
}
