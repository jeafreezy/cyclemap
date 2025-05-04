import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteTourWrapper } from "@/components/wrappers/site-tour-wrapper";

const poppins = Poppins({
  /**
   * The font on the Figma design system is `Poppins`, so I'm using that.
   */
  variable: "--font-poppins",
  /**
   * Normal = 400.
   * Bold = 700.
   * Based on the Figma design system, most of the text is `400` (normal),  and the others are `500` (medium), `600` (semi bold) and `700` (bold), so I'm loading only those four.
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
        <SiteTourWrapper>{children}</SiteTourWrapper>
        <Toaster position="top-left" />
      </body>
    </html>
  );
}
