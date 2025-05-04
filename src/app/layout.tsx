import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-be-vietnam",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
