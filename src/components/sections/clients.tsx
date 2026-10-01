import {getLocale, getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

type Client = {
  key: 'veronesi' | 'enterogermina' | 'cuki' | 'virginActive';
  brand: string;
  reelUrl: string;
  // Basename of the MP4 + poster JPG in public/reels/clients/.
  media: string;
  // Snapshot from Instagram (views come from Insights, not public).
  views?: number;
  likes: number;
  comments: number;
};

const clients: Client[] = [
  {
    key: 'veronesi',
    brand: 'Fondazione Umberto Veronesi',
    reelUrl: 'https://www.instagram.com/reel/DbS_jOqRdGK/',
    media: 'veronesi',
    views: 250000,
    likes: 7630,
    comments: 218
  },
  {
    key: 'enterogermina',
    brand: 'Enterogermina',
    reelUrl: 'https://www.instagram.com/reel/DdBvaNHN2xU/',
    media: 'enterogermina',
    views: 240000,
    likes: 2287,
    comments: 34
  },
  {
    key: 'cuki',
    brand: 'Cuki',
    reelUrl: 'https://www.instagram.com/reel/Ddq9Cm1NwKK/',
    media: 'cuki',
    views: 80000,
    likes: 2812,
    comments: 40
  },
  {
    key: 'virginActive',
    brand: 'Virgin Active',
    reelUrl: 'https://www.instagram.com/reel/Dd30fq4OYWh/',
    media: 'virgin-active',
    views: 20000,
    likes: 374,
    comments: 5
  }
];

function compact(n: number, locale: string) {
  const fmt = (v: number) =>
    new Intl.NumberFormat(locale, {maximumFractionDigits: 1}).format(v);
  if (n >= 1_000_000) return `${fmt(n / 1_000_000)}M`;
  if (n >= 1_000) return `${fmt(n / 1_000)}K`;
  return fmt(n);
}

export async function Clients() {
  const t = await getTranslations('clients');
  const locale = await getLocale();

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 md:px-8 md:pt-28 md:pb-14">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-lime/80">
            {t('eyebrow')}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight uppercase">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl font-sans text-base text-ink/70 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
          {clients.map((client, i) => {
            const metrics = [
              client.views !== undefined && {value: client.views, label: t('metrics.views')},
              {value: client.likes, label: t('metrics.likes')},
              {value: client.comments, label: t('metrics.comments')}
            ].filter((m): m is {value: number; label: string} => Boolean(m));

            return (
              <Reveal key={client.key} delay={0.1 + i * 0.08} direction="scale">
                <a
                  href={client.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.03] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-lime/30"
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-paper-shade">
                    <video
                      src={`/reels/clients/${client.media}.mp4`}
                      poster={`/reels/clients/${client.media}.jpg`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`${t('collab')} × ${client.brand}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 bg-lime px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#020103]">
                      {t('collab')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 lg:p-5 xl:p-6">
                    <h3 className="font-display text-2xl leading-tight uppercase">
                      {client.brand}
                    </h3>
                    <span className="mt-1 mb-6 font-mono text-xs uppercase text-ink/50">
                      {t(`items.${client.key}.topic`)}
                    </span>

                    <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      {metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                            {m.label}
                          </dt>
                          <dd className="mt-1 font-display text-2xl leading-none text-lime">
                            {compact(m.value, locale)}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase text-lime">
                      {t('cta')} <span aria-hidden>↗</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
