import Image from "next/image";
import { KnotRule } from "../knot-net";
import { DICTIONARIES, LINKS, LOCALES, type Locale } from "../dictionaries";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = DICTIONARIES[lang];

  return (
    <main className="flex-1 flex flex-col">
      <header className="px-6 pt-7 sm:px-10">
        <nav aria-label="Language" className="flex items-baseline gap-3">
          {LOCALES.map((code) => {
            const current = code === lang;
            return (
              <a
                key={code}
                href={`/${code}/`}
                hrefLang={code}
                aria-current={current ? "true" : undefined}
                className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  current
                    ? "text-cord underline decoration-brass decoration-2 underline-offset-4"
                    : "text-cord-dim hover:text-cord"
                }`}
              >
                {code}
              </a>
            );
          })}
        </nav>
      </header>

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6 pb-16 pt-16 text-center sm:pt-20">
        <Image
          src="/logo.webp"
          alt="Hanga Macrame"
          width={700}
          height={922}
          priority
          className="rise w-[168px] sm:w-[196px]"
          style={{ animationDelay: "0.1s" }}
        />

        <p
          className="rise mt-14 font-mono text-[11px] uppercase tracking-[0.28em] text-brass"
          style={{ animationDelay: "0.42s" }}
        >
          {t.eyebrow}
        </p>

        <h1
          className="rise mt-6 font-display text-[2.4rem] leading-[1.06] tracking-[-0.02em] text-balance sm:text-[3.4rem]"
          style={{ animationDelay: "0.54s" }}
        >
          {t.headline[0]}
          <br />
          {t.headline[1]}
        </h1>

        <div className="rise mt-16 w-full" style={{ animationDelay: "0.66s" }}>
          <KnotRule delay={0.78} />
        </div>

        <h2
          className="rise mt-12 font-mono text-[11px] uppercase tracking-[0.28em] text-cord-dim"
          style={{ animationDelay: "0.93s" }}
        >
          {t.linksLabel}
        </h2>

        <ul
          className="rise mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: "1.03s" }}
        >
          {LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 font-display text-xl text-cord transition-colors hover:text-brass"
              >
                {link.name}
                <span
                  aria-hidden="true"
                  className="text-cord-dim transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brass"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mx-auto w-full max-w-2xl px-6 pb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cord-dim/70">
          © {new Date().getFullYear()} Hanga Macrame · {t.footer}
        </p>
      </footer>
    </main>
  );
}
