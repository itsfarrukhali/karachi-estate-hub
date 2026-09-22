import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { SavedDrawer } from "@/components/SavedDrawer";
import { ComparisonModal } from "@/components/ComparisonModal";
import { CompareFloatingBar } from "@/components/CompareFloatingBar";

export const metadata: Metadata = {
  title: "Karachi Estate | Property with a point of view",
  description: "Find considered homes, apartments and investment opportunities in Karachi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PreferencesProvider>
          {children}
          <SavedDrawer />
          <ComparisonModal />
          <CompareFloatingBar />
        </PreferencesProvider>
      </body>
    </html>
  );
}
