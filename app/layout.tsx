"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [windowHeight, setWindowHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, []);
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TTVSHND3" />
      <GoogleAnalytics gaId="G-ZH9RXZMLJM" />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg" />
        <meta property="og:title" content="Felix's website" />
        <meta property="og:description" content="a website about life, reading and technology" />
        <meta property="og:url" content={`https://felix-one.vercel.app`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@felixzhang" />
        <meta name="twitter:title" content="Felix's website" />
        <meta name="twitter:description" content="a website about life, reading and technology" />
        <meta name="twitter:image" content="https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg" />
        <meta name="twitter:url" content={`https://felix-one.vercel.app`} />
      </Head>

      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: "fei" }}>
          <HeaderBar />
          {windowHeight && (
            <>
              <main
                style={{
                  minHeight: `${windowHeight}px`,
                  marginTop: pathname === '/' ? '6rem' : '4rem',
                }}
              >
                {children}
              </main>
              <Footer />
            </>

          )}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
