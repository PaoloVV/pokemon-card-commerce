import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <div className="sticky top-0 left-0 w-full h-[10vh] bg-white border-b-2 border-red-600">
          <Navbar isLogged={!!data.user} user={data.user} />
        </div>
        <div className="min-h-[80vh] p-3">{children}</div>
        <div className="h-[20vh]">
          <Footer />
        </div>
      </body>
    </html>
  );
}
