import "./globals.css";
import { Inter, DM_Serif_Display } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./coreComponents/navbar";
import Footer from "./coreComponents/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const DMSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dmserif",
});

export const metadata: Metadata = {
  title: "MS Putra Abadi",
  description: "Untuk bumi yang lebih baik.",
  icons: {
    icon: "/mspa-logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body className={`${inter.variable} ${DMSerif.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// import "./globals.css";
// import { Inter, DM_Serif_Display } from "next/font/google";
// import type { Metadata } from "next";
// import Navbar from "./coreComponents/navbar";
// import Footer from "./coreComponents/footer";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const DMSerif = DM_Serif_Display({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-dmserif",
// });

// export const metadata: Metadata = {
//   title: "MS Putra Abadi",
//   description: "Untuk bumi yang lebih baik.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.variable} ${DMSerif.variable} antialiased`}>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }
