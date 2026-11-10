import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/logo.jpg"
            alt={`${SITE.nameZh} Logo`}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
            priority
          />
          <span className="truncate font-serif text-base font-bold text-brand">
            {SITE.nameZh}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="主選單">
          <Link href="/menu" className="hover:text-brand">完整菜單</Link>
          <Link href="/meeting-bento" className="hover:text-brand">會議餐盒</Link>
          <Link href="/#quick" className="hover:text-brand">外帶外送</Link>
          <Link href="/#store" className="hover:text-brand">門市交通</Link>
        </nav>
        <a
          href={SITE.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded bg-accent px-3 py-2 text-sm font-bold text-white hover:bg-accent-dark"
        >
          LINE 點餐 / 會議團訂
        </a>
      </div>
    </header>
  );
}
