import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "WRI-Weihnachts-Werkstatt",
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
        <meta http-equiv="origin-trial" content="Asj8x1emDAMnYM/2D2y+KLSz/9q93MbD2d2fpb6QPsgwmu6BnItubVfq+suSBS0rONtAkj6DL1w15zzTXh+Sog4AAACFeyJvcmlnaW4iOiJodHRwczovL3BsYWV0emNoZW4tY29udmVydGVyLnZlcmNlbC5hcHA6NDQzIiwiZmVhdHVyZSI6IlByaXZhdGVOZXR3b3JrQWNjZXNzTm9uU2VjdXJlQ29udGV4dHNBbGxvd2VkIiwiZXhwaXJ5IjoxNzQyMjU2MDAwfQ=="/>
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#a1b8ce] w-screen h-screen overflow-hidden`}
      >
        <section className="snow">
          <div className="snowflake"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake1"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake2"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake3"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake4"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake5"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake6"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake7"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake8"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake9"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake10"><i className="fa-solid fa-snowflake"></i></div>
          <div className="snowflake11"><i className="fa-solid fa-snowflake"></i></div>
          <div className="snowflake12"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake13"><i className="fa-regular fa-snowflake"></i></div>
          <div className="snowflake14"><i className="fa-regular fa-snowflake"></i></div>
        </section>

        <section className="mountains">
          <div className='mt1'>
            <div className="mtsnow1"></div>
            <div className="snow-peak-1a"></div>
            <div className="snow-peak-1b"></div>
          </div>
          <div className="mt2">
            <div className="snow2"></div>
            <div className="snow-peak-2a"></div>
            <div className="snow-peak-2b"></div>
            <div className="snow-peak-2c"></div>
          </div>
          <div className="mt3">
            <div className="snow3"></div>
            <div className="snow-peak-3a"></div>
            <div className="snow-peak-3b"></div>
            <div className="snow-peak-3c"></div>
            <div className="snow-peak-3d"></div>
          </div>
          <div className='mt4'>
            <div className="snow4"></div>
            <div className="snow-peak-4a"></div>
            <div className="snow-peak-4b"></div>
          </div>
          <div className="mt5">
            <div className="snow5"></div>
            <div className="snow-peak-5a"></div>
            <div className="snow-peak-5b"></div>
            <div className="snow-peak-5c"></div>
          </div>
          <div className="mt6">
            <div className="snow6"></div>
            <div className="snow-peak-6a"></div>
            <div className="snow-peak-6b"></div>
            <div className="snow-peak-6c"></div>
            <div className="snow-peak-6d"></div>
          </div>
        </section>
        {children}
      </body>
    </html>
  );
}
