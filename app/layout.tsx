import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Template Library",
  description: "Premium Templates and UI Components library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            {children}
            <Footer />
            <Toaster richColors position="top-center" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
