//write me layout that contains <Header />
// import Header from "@/components/landing/Header";
import { ReactNode } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased text-black`}>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}