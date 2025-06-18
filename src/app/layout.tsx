import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/common/SessionProvider";
import { Navbar } from "@/components/common/Navbar";
import { AuthProvider } from "@/components/common/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevate NITC",
  description: "Bringing you experiences and oppurtunities that not only inform, but elevates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased bg-zinc-900 text-gray-50`}
      >
        <SessionProvider>
          <AuthProvider>
            <Navbar variant="white" />
            {children}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
