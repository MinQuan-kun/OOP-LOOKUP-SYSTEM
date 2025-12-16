import { Providers } from "@/components/Providers";
import "./globals.css";
import CuteBot from "@/components/CuteBot"; // 1. Import CuteBot

export const metadata = {
  title: "OOP Lookup System",
  description: "Hệ thống tra cứu kiến thức OOP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          {children}
          
          <CuteBot /> 
          
        </Providers>
      </body>
    </html>
  );
}