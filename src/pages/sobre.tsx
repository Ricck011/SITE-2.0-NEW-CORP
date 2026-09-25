import Layout from "@/components/layout";
import CEOProfile from "@/components/sections/company/ceo-profile";
import GlobalLocations from "@/components/sections/company/global-locations";
import CompanyHero from "@/components/sections/company/hero";
import HeroImage from "@/components/sections/company/hero-image";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { lazy, Suspense } from "react";
const Values = lazy(() => import("@/components/sections/company/values"));

const Sobre = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `Sobre | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/sobre`,
  };

  return (
    <>
      <SEO
        title={`Sobre | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/sobre"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <CompanyHero />
        <HeroImage />
        <Suspense fallback={null}>
          <Values />
        </Suspense>
        <Suspense fallback={null}>
          <CEOProfile />
        </Suspense>
        <Suspense fallback={null}>
          <GlobalLocations />
        </Suspense>
      </Layout>
    </>
  );
};

export default Sobre;
