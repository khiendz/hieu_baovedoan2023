import "./global.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootStyleRegistry } from "../modules/shared/components/Root-style-registry";
import {AppProvider} from 'contexts';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Đặt sách trực tuyến",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vn">
      <head>
      </head>
      <body className={inter.className}>
        <AppProvider initialValues={{}}>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
