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
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:px-10 sm:py-[min(3rem,4vh)]">
        <Image
          src="/logo.webp"
          alt="Hanga Macrame — a hand-drawn macramé wall hanging above the wordmark"
          width={700}
          height={922}
          priority
          className="rise w-[132px] sm:w-[min(190px,20vh)]"
          style={{ animationDelay: "0.1s" }}
        />

        <p
          className="rise mt-8 font-mono text-[12px] sm:mt-[min(4rem,6vh)] sm:text-[13px] uppercase tracking-[0.28em] text-brass"
          style={{ animationDelay: "0.42s" }}
        >
          {t.eyebrow}
        </p>

        <h1
          className="rise mt-5 font-display text-[2.05rem] leading-[1.06] tracking-[-0.02em] text-balance sm:mt-[min(2rem,3vh)] sm:text-[min(3.8rem,7vh)]"
          style={{ animationDelay: "0.54s" }}
        >
          {t.headline[0]}
          <br />
          {t.headline[1]}
        </h1>

        <div className="rise mt-10 w-full sm:mt-[min(4.5rem,6vh)]" style={{ animationDelay: "0.66s" }}>
          <KnotRule delay={0.78} />
        </div>

        {/* Icons carry themselves; the names live in aria-label for screen
            readers. Padding takes each hitbox to 36px — the glyph stays 20px. */}
        <nav
          aria-label="Elsewhere"
          className="rise mt-10 flex items-center justify-center gap-6 sm:mt-[min(4.5rem,6vh)]"
          style={{ animationDelay: "1.03s" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              className="p-2 text-cord transition-colors duration-200 hover:text-brass"
            >
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </nav>
      </section>

      <footer className="mx-auto w-full max-w-2xl px-6 pb-6 text-center sm:pb-8">
        {/* The switcher lives down here so the logo owns the top of the page. */}
        <nav
          aria-label="Language"
          className="flex items-center justify-center"
        >
          {LOCALES.map((code, i) => {
            const current = code === lang;
            return (
              <span key={code} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="font-mono text-cord-dim/40">
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

        <p className="mt-4 font-mono text-[10px] sm:mt-5 uppercase tracking-[0.22em] text-cord-dim">
          © Hanga Macrame · {t.footer}
        </p>
      </footer>
    </main>
  );
}
