import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AweTales | Magical Storytelling, In Your Own Voice",
  description: "Create personalized bedtime stories that bring you and your child closer—no matter where you are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 60px - 200px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
