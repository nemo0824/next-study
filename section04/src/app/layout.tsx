import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body cz-shortcut-listen="true" className="min-h-screen">
        <MantineProvider forceColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}
