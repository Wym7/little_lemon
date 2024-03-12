import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Karla, Markazi_Text } from "next/font/google";
import "./globals.css";

const markazi = Markazi_Text({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Little Lemon | Authentic Mediterranean restaurant",
  description: ` We are a family owned Mediterranean restaurant, 
  focused on traditional recipes served with a modern twist.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#f4ce14" },
      }}
    >
      <html lang="en">
        <body className={(cn(), karla.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
