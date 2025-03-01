import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth, signIn } from "../auth";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "System App",
  description: "APP",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  const user = session?.user;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-3xl mx-auto p-4">
          {user && <Navbar />}
          <div className="mt-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
