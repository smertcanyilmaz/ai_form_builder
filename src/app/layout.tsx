import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

//TODO: add dynamic title

export const metadata: Metadata = {
  title: {
    default: "AI Form Builder",
    template: "%s | Dashboard",
  },
  description: "Form builder for AI powered forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
