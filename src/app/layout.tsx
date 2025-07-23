import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/configs/appConfig";

const inter = Inter({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.APP_NAME}`,
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
