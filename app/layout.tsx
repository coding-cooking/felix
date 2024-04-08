"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

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
      <body className={inter.className}>
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
