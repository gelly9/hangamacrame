import Image from "next/image";
import { KnotRule } from "../knot-net";
import { SocialIcon } from "../social-icons";
import { DICTIONARIES, LINKS, LOCALES, type Locale } from "../dictionaries";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = DICTIONARIES[lang];

  return (
    <main className="flex-1 flex flex-col">
      <header className="px-6 pt-5 sm:px-10">
        {/* Padded to a 24px+ tap target — bare 11px text is far under the
            minimum, and this is the most-used control on a trilingual site. */}
        <nav
          aria-label="Language"
          className="-ml-2 flex items-center"
        >
          {LOCALES.map((code, i) => {
            const current = code === lang;
            return (
              <span key={code} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="text-cord-dim/40">
                    ·
                  </span>
                )}
                <a
                  href={`/${code}/`}
                  hrefLang={code}
                  aria-current={current ? "page" : undefined}
                  className={`px-2 py-2 font-mono text-[12px] uppercase tracking-[0.22em] transition-colors ${
                    current
                      ? "text-cord underline decoration-brass decoration-2 underline-offset-[6px]"
                      : "text-cord-dim hover:text-cord"
                  }`}
                >
                  {code}
                </a>
              </span>
            );
          })}
        </nav>
      </header>

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-12 pt-10 text-center sm:px-10">
        <Image
          src="/logo.webp"
          alt="Hanga Macrame"
          width={700}
          height={922}
          priority
          className="rise w-[168px] sm:w-[190px]"
          style={{ animationDelay: "0.1s" }}
        />

        <p
          className="rise mt-16 font-mono text-[10px] uppercase tracking-[0.28em] text-brass"
          style={{ animationDelay: "0.42s" }}
        >
          {t.eyebrow}
        </p>

        <h1
          className="rise mt-8 font-display text-[2.6rem] leading-[1.06] tracking-[-0.02em] text-balance sm:text-[3.8rem]"
          style={{ animationDelay: "0.54s" }}
        >
          {t.headline[0]}
          <br />
          {t.headline[1]}
        </h1>

        <div className="rise mt-18 w-full" style={{ animationDelay: "0.66s" }}>
          <KnotRule delay={0.78} />
        </div>

        {/* Icons carry themselves; the names live in aria-label for screen readers. */}
        <nav
          aria-label="Elsewhere"
          className="rise mt-20 flex items-center justify-center gap-10"
          style={{ animationDelay: "1.03s" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              className="text-cord transition-colors duration-200 hover:text-brass"
            >
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </nav>
      </section>

      <footer className="mx-auto w-full max-w-2xl px-6 pb-10 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-cord-dim/50">
          © {new Date().getFullYear()} Hanga Macrame · {t.footer}
        </p>
      </footer>
    </main>
  );
}
