import { cn } from "@/lib/utils";
import StoreProvider from "@/store/provider";
import { ClerkProvider, auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const karla = Inter({ subsets: ["latin"] });

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
  const { userId } = auth();

  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#f4ce14" },
      }}
    >
      <StoreProvider>
        <html lang="en">
          <body className={(cn(), karla.className)}>
            <Toaster />
            {children}
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
