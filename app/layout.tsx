import type { Metadata } from "next";
import { Fira_Code, Heebo } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "700"],
});

export const metadata: Metadata = {
  title: "יניב בודאגה",
  description:
    "יניב בודאגה בונה עם AI אתרים אישיים, אתרים לעסקים, דשבורדים וסוכני AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-base leading-[1.7] text-navy md:text-lg">
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
