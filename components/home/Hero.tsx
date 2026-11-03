import { MessageCircle, Phone } from "lucide-react";
import { SITE, WHATSAPP_URL } from "@/lib/site";

const buttonBase =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-lg font-bold sm:w-auto";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      <p className="text-base font-medium text-primary">שלום, אני יניב</p>
      <h1
        id="hero-title"
        className="mt-4 max-w-3xl text-4xl leading-tight font-extrabold md:text-[56px]"
      >
        אני בונה אתרים, דשבורדים וסוכני AI לעסקים קטנים ולאנשים פרטיים
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        פרויקטים מקצועיים, מהר ובלי הסרבול של סוכנות. מדברים ישירות איתי, מהרעיון ועד שהאתר
        באוויר.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href={SITE.contact.phoneHref}
          className={`${buttonBase} bg-primary text-white hover:border-primary-dark hover:bg-primary-dark`}
        >
          <Phone aria-hidden="true" className="size-5" />
          התקשרו עכשיו
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} text-primary hover:bg-primary-soft`}
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          שלחו הודעה בוואטסאפ
          <span className="sr-only">(נפתח בחלון חדש)</span>
        </a>
      </div>
    </section>
  );
}
