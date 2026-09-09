import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ModalProviderOrg } from "@/components/providers/modal-provider-org";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAW — Project Assistant Web",
  description: "Manage projects with clarity and confidence. PAW brings your tasks, teammates, and tools together in one elegant workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
        >
          <main>{children}</main>
          <ModalProviderOrg />
          {/* <ModalProvider /> */}
          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
}

