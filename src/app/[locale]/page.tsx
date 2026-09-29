import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/sections/hero';
import {SocialProof} from '@/components/sections/social-proof';
import {Clients} from '@/components/sections/clients';
import {TwoPaths} from '@/components/sections/two-paths';
import {HowWeWork} from '@/components/sections/how-we-work';
import {Pillars} from '@/components/sections/pillars';
import {CaseStudies} from '@/components/sections/case-studies';
import {FAQ} from '@/components/sections/faq';
import {CtaBand} from '@/components/sections/cta-band';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SocialProof />
      <Clients />
      <TwoPaths />
      <HowWeWork />
      <Pillars />
      <CaseStudies />
      <FAQ />
      <CtaBand />
    </>
  );
}
