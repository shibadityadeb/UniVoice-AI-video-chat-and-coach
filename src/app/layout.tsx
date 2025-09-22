import "./globals.css";
import React from "react";

export const metadata = {
  title: "UniVoice",
  description: "UniVoice app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
