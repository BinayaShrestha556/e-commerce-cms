import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

import Footer from "@/components/footer";
import { headers } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OmniCMS",
  description: "Create your own store, backend for all your store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = headers().get("theme") || "light";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${theme} ${geistMono.variable} antialiased `}
      >
        <ToastProvider />
        <ModalProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
