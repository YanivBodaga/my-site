import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.nameHe} - דף הבית`}
      dir="ltr"
      className={`font-mono text-base font-bold whitespace-nowrap md:text-lg ${onDark ? "text-white" : "text-navy"}`}
    >
      {SITE.logoText}
    </Link>
  );
}
