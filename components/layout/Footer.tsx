import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { LEGAL_LINKS, SITE } from "@/lib/site";
import Logo from "./Logo";

// Cached because Cache Components rejects new Date() in a prerendered shell.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass =
  "inline-flex items-center gap-2 underline underline-offset-4 hover:text-accent focus-visible:outline-accent";

export default function Footer() {
  const { phoneDisplay, phoneHref, whatsapp, email } = SITE.contact;

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <Logo onDark />
        </div>
        <div>
          <h2 className="mb-3 text-base font-bold">יצירת קשר</h2>
          <ul className="space-y-2 text-base">
            <li>
              <a href={phoneHref} className={linkClass}>
                <Phone aria-hidden="true" className="size-4" />
                טלפון: <span dir="ltr">{phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                וואטסאפ
                <span className="sr-only">(נפתח בחלון חדש)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className={linkClass}>
                <Mail aria-hidden="true" className="size-4" />
                אימייל: <span dir="ltr">{email}</span>
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="מידע משפטי">
          <h2 className="mb-3 text-base font-bold">מידע משפטי</h2>
          <ul className="space-y-2 text-base">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/20 py-4 text-center text-sm">
        © <CopyrightYear /> {SITE.nameHe}. כל הזכויות שמורות.
      </p>
    </footer>
  );
}
