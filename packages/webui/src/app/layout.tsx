import "@/styles/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
