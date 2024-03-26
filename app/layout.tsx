import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import ModalProvider from "../providers/ModalProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flexxi Jobs",
  description: "Platform for finding casual jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <AuthProvider>
          <ModalProvider />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
