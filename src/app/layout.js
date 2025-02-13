import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";
import SupabaseProvider from "@/store/SupabaseProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pkm Card commerce",
  description: "Compra le carte Pokemon che ti mancano!!",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <SupabaseProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
