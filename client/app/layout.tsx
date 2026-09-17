
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from '@/providers/StoreProvider'
import AuthInitializer from '@/components/AuthInitializer/AuthInitializer'

const roboto = Roboto({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s - DevHUB",
    default: "DevHUB", 
  },
  description: "DevHUB: A platform for developers to share their projects and collaborate with others.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <AuthInitializer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
