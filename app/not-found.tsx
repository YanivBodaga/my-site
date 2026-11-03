import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <h1 className="text-3xl font-bold md:text-[40px]">הדף לא נמצא</h1>
      <p className="mt-4 text-muted">ייתכן שהדף עוד לא קיים או שהכתובת שגויה.</p>
      <Link
        href="/"
        className="mt-6 inline-block text-primary underline underline-offset-4 hover:text-primary-dark"
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
}
