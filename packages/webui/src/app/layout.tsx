import "@/styles/globals.css";
import type { Metadata } from "next";
import { Jost, Josefin_Sans } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
const josefin_sans = Josefin_Sans({ subsets: ["latin"] });

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
      <body className={josefin_sans.className}>{children}</body>
    </html>
  );
}
