import type { Metadata } from "next";
import { ubuntu } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi-step Form",
  description: "A multi-step form application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ubuntu.className}>
      <body>
        <div className="min-h-screen bg-magnolia md:p-4">
          <div className="md:flex md:items-center md:justify-center md:min-h-screen">
            <div className="bg-white md:p-4 md:rounded-lg md:shadow-lg md:flex w-full max-w-4xl">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
