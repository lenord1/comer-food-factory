import { SITE } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand/10 bg-oat px-4 py-6 text-center text-xs text-ink-soft">
      © {new Date().getFullYear()} {SITE.fullName}
    </footer>
  );
}
