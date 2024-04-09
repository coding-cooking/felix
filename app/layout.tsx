"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, []);
  return (
    <html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TTVSHND3');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TTVSHND3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AppRouterCacheProvider options={{ key: "fei" }}>
          <HeaderBar />
          {windowHeight && (
            <>
              <main
                style={{ minHeight: `${windowHeight}px`, marginTop: "6rem" }}
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
