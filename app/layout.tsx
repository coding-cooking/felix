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
import ArticleContext, { ArticleInterface } from "./context/ArticleContext";
import LangContext from "./context/LangContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [windowHeight, setWindowHeight] = useState(0);
  const pathname = usePathname();
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [lang, setLang] = useState<"CH" | "EN">("EN");

  useEffect(() => {
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    const fetchArticles = async (page=1) => {
      try {
        const res = await fetch(`/api/articles`);
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    fetchArticles();
  }, [])

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TTVSHND3" />
      <GoogleAnalytics gaId="G-ZH9RXZMLJM" />
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: "fei" }}>
          <LangContext.Provider value={{lang, setLang}}>
            <ArticleContext.Provider value={articles}>
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
            </ArticleContext.Provider>
          </LangContext.Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
