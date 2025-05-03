import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  /**
   * The font on the Figma design system is `Poppins`, so I'm using that.
   */
  variable: "--font-poppins",
  /**
   * Normal = 400.
   * Bold = 700.
   * Based on the Figma design system, most of the text is `400` (normal),  and the ones with bolds are `500` (medium), `600` (semi bold) and `700` (bold), so i'm loading only those three.
   */
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CycleMap – Discover Global Bike Networks",
  description:
    "Explore bike-sharing systems across the world with CycleMap. Find networks by city or country, view their locations on the map, and plan your next ride effortlessly.",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster position="top-left" />
      </body>
    </html>
  );
}
