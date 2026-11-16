import "./globals.css";
import { Poppins, Noto_Nastaliq_Urdu } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-main" });
const urdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-urdu" });

export const metadata = {
  title: "Naeem Medical & General Store | Sasti aur Miyari Adwiyat",
  description: "Naeem Medical & General Store – genuine medicines at affordable prices. Owner: Malik Naeem. Call 0321-4137823.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${urdu.variable}`}>{children}</body>
    </html>
  );
}
