export type NavItem = { label: string; href: `/#${string}` };
export type LegalLink = {
  label: string;
  href: "/privacy" | "/accessibility" | "/terms";
};

export const SITE = {
  nameHe: "יניב בודאגה",
  logoText: "{ Yaniv Bodaga }",
  contact: {
    phoneDisplay: "050-640-0751",
    phoneHref: "tel:+972506400751",
    whatsapp: "972506400751",
    email: "yaniv.bodaga99@gmail.com",
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "מה אני בונה", href: "/#services" },
  { label: "עבודות", href: "/#portfolio" },
  { label: "עליי", href: "/#about" },
  { label: "צור קשר", href: "/#contact" },
];

export const LEGAL_LINKS: LegalLink[] = [
  { label: "מדיניות פרטיות", href: "/privacy" },
  { label: "הצהרת נגישות", href: "/accessibility" },
  { label: "תנאי שימוש", href: "/terms" },
];
