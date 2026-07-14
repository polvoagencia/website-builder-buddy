import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";

export function SubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist text-navy">
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
