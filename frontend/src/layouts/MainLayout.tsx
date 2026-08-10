import type { ReactNode } from "react";
import Header from "@/components/shared/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
