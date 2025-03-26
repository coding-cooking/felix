"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { cache } from 'react';
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import ArticleContext, { ArticleInterface } from "../context/ArticleContext";
import LangContext from "../context/LangContext";
import ThemeContext from "@/context/ThemeContext";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    const fetchArticles = cache(async () => {
      try {
        const res = await fetch(`/api/articles`, { cache: 'force-cache' });
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    })
    fetchArticles();
  }, [])

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TTVSHND3" />
      <GoogleAnalytics gaId="G-ZH9RXZMLJM" />
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: "fei" }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <LangContext.Provider value={{ lang, setLang }}>
              <ArticleContext.Provider value={articles}>
                <HeaderBar />
                {windowHeight && (
                  <>
                    <main
                      style={{
                        minHeight: `${windowHeight}px`,
                        // marginTop: '1rem',
                        // ...(window.innerWidth < 768 && { marginTop: pathname === '/' ? '6rem' : '4rem' })
                      }}
                    >
                      {children}
                    </main>
                    <Footer />
                  </>
                )}
              </ArticleContext.Provider>
            </LangContext.Provider>
          </ThemeContext.Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
