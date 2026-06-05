import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/views/shared/SiteChrome";

export const metadata: Metadata = {
  title: "Mugnee Multiple Limited | Beauty & Wellness Commerce",
  description:
    "A responsive e-commerce storefront for Mugnee Multiple Limited beauty, skincare, and wellness products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
