import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FlowerAnimation from "@/components/Flower/FlowerAnimation.jsx";

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
  title: "Cookie-Cutter-Werkstatt",
  description: "Konvertiere deine Plätzchen in 3D Modelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script src="https://kit.fontawesome.com/e499b9f739.js" crossOrigin="anonymous"></script>
        <meta httpEquiv="origin-trial" content="Asj8x1emDAMnYM/2D2y+KLSz/9q93MbD2d2fpb6QPsgwmu6BnItubVfq+suSBS0rONtAkj6DL1w15zzTXh+Sog4AAACFeyJvcmlnaW4iOiJodHRwczovL3BsYWV0emNoZW4tY29udmVydGVyLnZlcmNlbC5hcHA6NDQzIiwiZmVhdHVyZSI6IlByaXZhdGVOZXR3b3JrQWNjZXNzTm9uU2VjdXJlQ29udGV4dHNBbGxvd2VkIiwiZXhwaXJ5IjoxNzQyMjU2MDAwfQ=="/>
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#D9D9D9] w-screen h-screen overflow-hidden`}
      >

        <section className="mountains">
          <FlowerAnimation />



        </section>

        {children}
      </body>
    </html>
  );
}
