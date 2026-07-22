import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist text-navy">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
