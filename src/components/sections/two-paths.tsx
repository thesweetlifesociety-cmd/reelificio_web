import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/reveal';

export async function TwoPaths() {
  const t = await getTranslations('twoPaths');

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight uppercase">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl font-sans text-base text-ink/70 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal delay={0.15} direction="left">
            <Link
              href="/partnership"
              className="group flex h-full flex-col bg-paper-shade p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-lime/70">
                {t('partnership.label')}
              </span>
              <h3 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl uppercase">
                {t('partnership.title')}
              </h3>
              <p className="mt-4 font-sans text-base text-ink/70">
                {t('partnership.body')}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase text-lime">
                {t('partnership.cta')} <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.25} direction="right">
            <Link
              href="/produzione"
              className="group flex h-full flex-col bg-lime p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#020103]/60">
                {t('produzione.label')}
              </span>
              <h3 className="mt-4 font-display text-3xl leading-tight text-[#020103] md:text-4xl uppercase">
                {t('produzione.title')}
              </h3>
              <p className="mt-4 font-sans text-base text-[#020103]/80">
                {t('produzione.body')}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase text-[#020103]">
                {t('produzione.cta')} <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
