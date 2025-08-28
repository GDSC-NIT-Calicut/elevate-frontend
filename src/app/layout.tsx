import type { Metadata } from "next";
import { Roboto, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/common/Navbar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
        className={`${roboto.variable} ${nunito.variable} antialiased bg-zinc-400`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
