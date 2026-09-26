import Layout from "@/components/layout";
import FrontsDetail from "@/components/sections/features/fronts-detail";
import FeaturesHero from "@/components/sections/features/hero";
import SEO from "@/components/seo";
import { SERVICOS_LEDE } from "@/content/servicos";
import { appConfig } from "@/utils/app-config";
import { lazy, Suspense } from "react";

// Abaixo da dobra: mesmo componente que a home usa (o passo a passo é o
// mesmo processo, não precisa de outro texto). `lazy` aqui e na home aponta
// pro mesmo arquivo, então o Vite mantém um chunk só.
const BusinessAccount = lazy(() => import("@/components/sections/home/business-account"));
// "O que eu não faço" + chamada final.
const OutOfScope = lazy(() => import("@/components/sections/features/out-of-scope"));

const Servicos = () => {
  const metaTitle = "Serviços — Identidade visual, landing page e sistema | NEW CORP";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Identidade visual, landing page e sistema de gestão",
    "description": SERVICOS_LEDE,
    "url": `${appConfig.url}/servicos`,
    "areaServed": "São Paulo, BR",
    "provider": {
      "@type": "ProfessionalService",
      "name": appConfig.name,
    },
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={SERVICOS_LEDE}
        canonicalUrl="/servicos"
        ogType="website"
        jsonLd={jsonLd}
      />

      <Layout>
        <FeaturesHero />
        <FrontsDetail />
        <Suspense fallback={null}>
          <BusinessAccount />
        </Suspense>
        <Suspense fallback={null}>
          <OutOfScope />
        </Suspense>
      </Layout>
    </>
  );
};

export default Servicos;
