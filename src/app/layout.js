import "./globals.css";
import GrammarEnhancer from "@/components/GrammarEnhancer";
import ProgressSync from "@/components/ProgressSync";

export const metadata = {
  title: "Học Tiếng Trung",
  description: "Nền tảng học tiếng Trung HSK1 đến HSK5",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
    >
      <body>
        {children}

        <GrammarEnhancer />

        <ProgressSync />
      </body>
    </html>
  );
}