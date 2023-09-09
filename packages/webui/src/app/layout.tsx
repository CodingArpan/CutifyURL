import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CutifyURL - The Ultimate Url Shortner and Tracker",
  description:
    "CutifyURL - The Ultimate Url Shortner and Tracker Devloped by CodingArpan, Linkedin:- https://www.linkedin.com/in/codingarpan , email:- contact@codingarpan.tech, ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* <meta http-equiv="refresh" content="5"></meta> */}</head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
