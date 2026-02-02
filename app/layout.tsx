import "@/styles/global.css"
import { InterFont } from "@/fonts/fonts";
import type { Metadata } from "next";
import { ModalProvider } from "@/components/Modal/ModalContext";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "Client Dashboard",
  description: "Manage your website with Minweb Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <ModalProvider>
        <html lang="en">
          <body className={InterFont.className}>
            <Toaster richColors position="top-center" />
            {children}
          </body>
        </html>
      </ModalProvider>
    </SessionWrapper>
  );
}
