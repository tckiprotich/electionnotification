import { Metadata } from "next/types";
import { Inter } from "next/font";
import "./globals.css";
import NavBar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMS NOTIFICATION",
  description: "app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
