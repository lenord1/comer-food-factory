import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBar from "@/components/MobileBar";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mobile-bar-space">
      <SiteHeader />
      {children}
      <SiteFooter />
      <MobileBar />
    </div>
  );
}
